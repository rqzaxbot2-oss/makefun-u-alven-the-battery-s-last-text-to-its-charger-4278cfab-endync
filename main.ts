import { mkdirSync, realpathSync, statSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

export const MAX_MESSAGE_LENGTH = 200;
export const OUTPUT_FILENAME = "output.txt";
export const DEFAULT_OUTPUT_DIRNAME = "output";

export const BATTERY_LAST_TEXT =
  "I survived all day on Low Power Mode and pure spite to make it home to you, burned my final 1% as a flashlight to rescue you from under the bed, and you aren't even plugged into the wall.";

interface ErrnoLikeError extends Error {
  code?: string;
}

export interface WriteResult {
  outputPath: string;
  payload: string;
}

export interface RunResult extends WriteResult {
  message: string;
  outputDir: string;
}

function isErrnoError(error: unknown): error is ErrnoLikeError {
  return error instanceof Error && "code" in error;
}

export function validateLine(line: string): string {
  if (typeof line !== "string") {
    throw new TypeError("Message must be a string.");
  }

  const normalized = line.trim();

  if (normalized.length === 0) {
    throw new Error("Message must not be empty.");
  }

  if (/[\r\n\u2028\u2029]/.test(normalized)) {
    throw new Error("Message must be a single line of plain text.");
  }

  if (normalized.length > MAX_MESSAGE_LENGTH) {
    throw new Error(
      `Message exceeds ${MAX_MESSAGE_LENGTH} characters (got ${normalized.length}).`,
    );
  }

  if (!/^[\x20-\x7E]+$/.test(normalized)) {
    throw new Error(
      "Message must contain only printable plain text ASCII characters.",
    );
  }

  return normalized;
}

export function resolveOutputDirectory(
  env: Record<string, string | undefined> = process.env,
  cwd: string = process.cwd(),
): string {
  const rawEnvDir = env.MAKEFUN_OUTPUT_DIR;
  const envDir = typeof rawEnvDir === "string" ? rawEnvDir.trim() : "";

  if (envDir.includes("\0") || cwd.includes("\0")) {
    throw new Error("Output directory path must not contain null bytes.");
  }

  if (envDir.length > 0) {
    return resolve(cwd, envDir);
  }

  return resolve(cwd, DEFAULT_OUTPUT_DIRNAME);
}

function ensureOutputDirectory(outputDir: string): void {
  if (outputDir.includes("\0")) {
    throw new Error("Output directory path must not contain null bytes.");
  }

  try {
    const existing = statSync(outputDir);
    if (!existing.isDirectory()) {
      throw new Error(
        `Output path exists and is not a directory: ${outputDir}`,
      );
    }
    return;
  } catch (error: unknown) {
    if (isErrnoError(error) && error.code === "ENOENT") {
      mkdirSync(outputDir, { recursive: true });
      return;
    }
    throw error;
  }
}

export function writeMessageFile(
  outputDir: string,
  message: string,
): WriteResult {
  const validated = validateLine(message);
  ensureOutputDirectory(outputDir);

  const outputPath = join(outputDir, OUTPUT_FILENAME);
  try {
    if (statSync(outputPath).isDirectory()) {
      throw new Error(`Output file path is a directory: ${outputPath}`);
    }
  } catch (error: unknown) {
    if (!isErrnoError(error) || error.code !== "ENOENT") {
      throw error;
    }
  }

  const payload = `${validated}\n`;
  writeFileSync(outputPath, payload, { encoding: "utf8", flag: "w" });

  return { outputPath, payload };
}

export function run(
  env: Record<string, string | undefined> = process.env,
  cwd: string = process.cwd(),
): RunResult {
  const message = validateLine(BATTERY_LAST_TEXT);
  const outputDir = resolveOutputDirectory(env, cwd);
  const { outputPath, payload } = writeMessageFile(outputDir, message);

  return { message, outputDir, outputPath, payload };
}

export function main(): void {
  try {
    const { payload } = run();
    process.stdout.write(payload);
  } catch (error: unknown) {
    const detail = error instanceof Error ? error.message : String(error);
    process.stderr.write(`Error: ${detail}\n`);
    process.exitCode = 1;
  }
}

function isDirectExecution(): boolean {
  const entryArg = process.argv[1];
  if (!entryArg) {
    return false;
  }

  try {
    const currentFile = realpathSync(fileURLToPath(import.meta.url));
    const entryFile = realpathSync(resolve(entryArg));
    return currentFile === entryFile;
  } catch {
    return false;
  }
}

if (isDirectExecution()) {
  main();
}