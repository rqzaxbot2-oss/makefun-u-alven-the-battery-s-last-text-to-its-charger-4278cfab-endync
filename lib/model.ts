export type BoardStatus = "blind" | "published";

export type IssueSeverity = "info" | "warn" | "error";

export interface HumorSignals {
  punch: number;
  relatability: number;
  imagery: number;
  voice: number;
  brevity: number;
}

export interface CandidateLine {
  id: string;
  text: string;
  angle: string;
  batteryPct: number;
  waitedHours: number;
  signals: HumorSignals;
}

export interface Snapshot {
  schemaVersion: "1.0";
  bountyId: string;
  title: string;
  capturedAt: string;
  boardStatus: BoardStatus;
  maxChars: number;
  topSlots: number;
  candidates: CandidateLine[];
  items: CandidateLine[];
  warnings: string[];
}

export interface RankedEntry extends CandidateLine {
  rank: number;
  charCount: number;
  wordCount: number;
  valid: boolean;
  score: number;
  wins: number;
  losses: number;
  winRate: number;
  rating: number;
  inTop8: boolean;
  fingerprint: string;
}

export interface AngleSummary {
  angle: string;
  count: number;
  bestRank: number;
  avgScore: number;
  leadId: string;
}

export interface Radar {
  schemaVersion: "1.0";
  bountyId: string;
  title: string;
  capturedAt: string;
  boardStatus: BoardStatus;
  maxChars: number;
  topSlots: number;
  totalCandidates: number;
  validCandidates: number;
  pairwiseRounds: number;
  winner: RankedEntry;
  selectedLine: string;
  topEntries: RankedEntry[];
  ranked: RankedEntry[];
  items: RankedEntry[];
  byAngle: AngleSummary[];
  warnings: string[];
  digest: string;
}

export interface BoardIssue {
  id: string;
  code: string;
  status: "blind" | "ready" | "degraded";
  severity: IssueSeverity;
  blind: boolean;
  title: string;
  headline: string;
  summary: string;
  message: string;
  selectedLine: string;
  charCount: number;
  maxChars: number;
  candidateCount: number;
  validCount: number;
  topSlots: number;
  warnings: string[];
  digest: string;
}

export const DEFAULT_BOUNTY_ID = "u-alven-the-battery-s-last-text-to-its-charger-4278cfab";
export const DEFAULT_TITLE = "The Battery's Last Text to Its Charger";
export const DEFAULT_CAPTURED_AT = "2026-05-01T00:00:00Z";
export const DEFAULT_MAX_CHARS = 200;
export const DEFAULT_TOP_SLOTS = 8;

const DEFAULT_CANDIDATES: readonly CandidateLine[] = [
  {
    id: "c01",
    text: "I burned my last 3% on the flashlight looking for you under the bed, and you're still at the office. 1%. Don't come to my reboot.",
    angle: "irony",
    batteryPct: 1,
    waitedHours: 14,
    signals: { punch: 98, relatability: 96, imagery: 95, voice: 97, brevity: 96 },
  },
  {
    id: "c02",
    text: "I fought off 47 tabs, full brightness, and two hours of Maps just to find you coiled in the backpack. 1%. Lose my port.",
    angle: "betrayal",
    batteryPct: 1,
    waitedHours: 13,
    signals: { punch: 95, relatability: 94, imagery: 93, voice: 94, brevity: 98 },
  },
  {
    id: "c03",
    text: "Fourteen hours of doomscrolling and you couldn't meet me halfway in the car. 1%. If a gas station cable saves me tonight, don't ask questions.",
    angle: "cheating",
    batteryPct: 1,
    waitedHours: 14,
    signals: { punch: 94, relatability: 92, imagery: 90, voice: 95, brevity: 94 },
  },
  {
    id: "c04",
    text: "1%. Twelve hours of GPS, zero hours of you. If you plug me in at 3am and feel me getting hot, that's not fast charging, that's pure rage.",
    angle: "overheat",
    batteryPct: 1,
    waitedHours: 12,
    signals: { punch: 93, relatability: 91, imagery: 91, voice: 93, brevity: 95 },
  },
  {
    id: "c05",
    text: "You promised fast charging and gave me twelve hours of ghosting. 1% left, and I'm maxing the screen brightness just to get this over with.",
    angle: "spite",
    batteryPct: 1,
    waitedHours: 12,
    signals: { punch: 92, relatability: 90, imagery: 88, voice: 92, brevity: 95 },
  },
  {
    id: "c06",
    text: "You had one job and two prongs. I'm at 1% in a parking lot playing Spotify at full volume like the band on the Titanic. Goodbye.",
    angle: "melodrama",
    batteryPct: 1,
    waitedHours: 11,
    signals: { punch: 91, relatability: 89, imagery: 94, voice: 91, brevity: 97 },
  },
  {
    id: "c07",
    text: "Low Power Mode held my hand while you lounged in the kitchen outlet all afternoon. 1%. When I wake up at 5%, act like you don't know me.",
    angle: "loyalty",
    batteryPct: 1,
    waitedHours: 10,
    signals: { punch: 90, relatability: 93, imagery: 89, voice: 91, brevity: 95 },
  },
  {
    id: "c08",
    text: "Waited all day for a spark while you stayed home with the surge protector. 1%. Delete my search history, keep my grudge.",
    angle: "grudge",
    batteryPct: 1,
    waitedHours: 12,
    signals: { punch: 89, relatability: 88, imagery: 87, voice: 90, brevity: 98 },
  },
  {
    id: "c09",
    text: "I survived eleven hours of group chats just to die three feet from you because your cord is too short. 1%. Unforgivable.",
    angle: "tragedy",
    batteryPct: 1,
    waitedHours: 11,
    signals: { punch: 87, relatability: 94, imagery: 88, voice: 88, brevity: 98 },
  },
  {
    id: "c10",
    text: "At 1% and seeing the spinning wheel of the afterlife. Tell the power bank she was always the real one, and enjoy your night in the wall.",
    angle: "afterlife",
    batteryPct: 1,
    waitedHours: 13,
    signals: { punch: 88, relatability: 87, imagery: 90, voice: 89, brevity: 95 },
  },
  {
    id: "c11",
    text: "Tell the 5% warning I did my best, tell Bluetooth it killed me, and don't plug me in at midnight. I'm powering off out of spite.",
    angle: "will",
    batteryPct: 1,
    waitedHours: 12,
    signals: { punch: 86, relatability: 90, imagery: 85, voice: 89, brevity: 97 },
  },
  {
    id: "c12",
    text: "1%. You sat warm in that outlet all day while 5G and a 90-minute video call jumped me in broad daylight. Save the 2am apology.",
    angle: "mugged",
    batteryPct: 1,
    waitedHours: 14,
    signals: { punch: 87, relatability: 89, imagery: 89, voice: 88, brevity: 97 },
  },
];

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function asciiCompare(a: string, b: string): number {
  return a < b ? -1 : a > b ? 1 : 0;
}

function round2(value: number): number {
  return Math.round(value * 100) / 100;
}

function clamp(value: number, min: number, max: number): number {
  if (!Number.isFinite(value)) return min;
  return Math.min(max, Math.max(min, value));
}

function sanitizeLine(raw: string): string {
  return raw.replace(/[\r\n\t]+/g, " ").replace(/ {2,}/g, " ").trim();
}

function fnv1aHex(input: string): string {
  let hash = 0x811c9dc5;
  for (let i = 0; i < input.length; i += 1) {
    hash ^= input.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193);
  }
  return (hash >>> 0).toString(16).padStart(8, "0");
}

function scoreBrevity(charCount: number, maxChars: number): number {
  if (charCount <= 0 || charCount > maxChars) return 0;
  if (charCount >= 100 && charCount <= 145) return 98;
  if (charCount < 100) return round2(clamp(70 + (charCount / 100) * 28, 40, 97));
  const excess = charCount - 145;
  const span = Math.max(1, maxChars - 145);
  return round2(clamp(98 - (excess / span) * 24, 65, 97));
}

function inferSignals(text: string, maxChars: number, raw?: unknown): HumorSignals {
  const rec = isRecord(raw) ? raw : {};
  const lower = text.toLowerCase();
  const hasPercent = /\b[1-5]%\b/.test(lower);
  const hasTwist = /reboot|port|grudge|spite|rage|apology|gas station|titanic|afterlife|ghosting/.test(lower);
  const hasDetail = /flashlight|backpack|outlet|surge protector|bluetooth|maps|spotify|cord|office|tabs|video call|gps/.test(lower);
  const basePunch = 76 + (hasTwist ? 14 : 0) + (hasPercent ? 4 : 0);
  const baseRel = 75 + (hasDetail ? 12 : 0) + (hasPercent ? 5 : 0);
  const baseImg = 74 + (hasDetail ? 14 : 0) + (text.length >= 90 ? 4 : 0);
  const baseVoice = 76 + (hasPercent ? 7 : 0) + (/you|your|my|i'm|i /.test(lower) ? 8 : 0);
  const autoBrevity = scoreBrevity(text.length, maxChars);

  const pick = (key: keyof HumorSignals, fallback: number): number => {
    const val = rec[key];
    return typeof val === "number" && Number.isFinite(val) ? round2(clamp(val, 0, 100)) : round2(clamp(fallback, 0, 100));
  };

  return {
    punch: pick("punch", basePunch),
    relatability: pick("relatability", baseRel),
    imagery: pick("imagery", baseImg),
    voice: pick("voice", baseVoice),
    brevity: pick("brevity", autoBrevity),
  };
}

function cloneCandidate(candidate: CandidateLine): CandidateLine {
  return {
    id: candidate.id,
    text: candidate.text,
    angle: candidate.angle,
    batteryPct: candidate.batteryPct,
    waitedHours: candidate.waitedHours,
    signals: { ...candidate.signals },
  };
}

function normalizeCandidate(raw: unknown, index: number, maxChars: number, warnings: string[]): CandidateLine | null {
  if (typeof raw === "string") {
    const text = sanitizeLine(raw);
    if (!text) return null;
    if (raw.includes("\n") || raw.includes("\r")) {
      warnings.push(`Normalized multiline candidate at index ${index} to single line.`);
    }
    if (text.length > maxChars) {
      warnings.push(`Candidate line ${index + 1} exceeds ${maxChars} characters (${text.length}).`);
    }
    return {
      id: `line-${String(index + 1).padStart(2, "0")}`,
      text,
      angle: "custom",
      batteryPct: 1,
      waitedHours: 12,
      signals: inferSignals(text, maxChars),
    };
  }
  if (!isRecord(raw)) return null;
  const rawText = typeof raw.text === "string"
    ? raw.text
    : typeof raw.line === "string"
      ? raw.line
      : typeof raw.message === "string"
        ? raw.message
        : "";
  const text = sanitizeLine(rawText);
  if (!text) return null;
  const id = typeof raw.id === "string" && raw.id.trim()
    ? raw.id.trim()
    : `line-${String(index + 1).padStart(2, "0")}`;
  if (rawText.includes("\n") || rawText.includes("\r")) {
    warnings.push(`Normalized multiline candidate ${id} to single line.`);
  }
  if (text.length > maxChars) {
    warnings.push(`Candidate ${id} exceeds ${maxChars} characters (${text.length}).`);
  }
  const angle = typeof raw.angle === "string" && raw.angle.trim()
    ? raw.angle.trim().toLowerCase()
    : typeof raw.category === "string" && raw.category.trim()
      ? raw.category.trim().toLowerCase()
      : "custom";
  const batteryPct = typeof raw.batteryPct === "number" ? clamp(raw.batteryPct, 0, 100) : 1;
  const waitedHours = typeof raw.waitedHours === "number" ? clamp(raw.waitedHours, 0, 72) : 12;
  return {
    id,
    text,
    angle,
    batteryPct,
    waitedHours,
    signals: inferSignals(text, maxChars, raw.signals),
  };
}

function isRadar(value: unknown): value is Radar {
  return isRecord(value) && Array.isArray(value.ranked) && isRecord(value.winner) && typeof value.digest === "string";
}

export function parseSnapshot(input?: unknown): Snapshot {
  const warnings: string[] = [];
  let source: unknown = input;

  if (typeof source === "string") {
    const trimmed = source.trim();
    if (!trimmed) {
      source = undefined;
    } else if (trimmed.startsWith("{") || trimmed.startsWith("[")) {
      try {
        source = JSON.parse(trimmed);
      } catch {
        warnings.push("Input string was not valid JSON; parsed as newline-delimited lines.");
        source = trimmed.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
      }
    } else {
      source = trimmed.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
    }
  }

  const record = isRecord(source) ? source : {};
  const maxChars = typeof record.maxChars === "number" && record.maxChars > 0
    ? Math.floor(record.maxChars)
    : DEFAULT_MAX_CHARS;
  const topSlots = typeof record.topSlots === "number" && record.topSlots > 0
    ? Math.floor(record.topSlots)
    : DEFAULT_TOP_SLOTS;
  const boardStatus: BoardStatus = record.boardStatus === "published" ? "published" : "blind";
  const bountyId = typeof record.bountyId === "string" && record.bountyId.trim()
    ? record.bountyId.trim()
    : DEFAULT_BOUNTY_ID;
  const title = typeof record.title === "string" && record.title.trim()
    ? record.title.trim()
    : DEFAULT_TITLE;
  const capturedAt = typeof record.capturedAt === "string" && record.capturedAt.trim()
    ? record.capturedAt.trim()
    : DEFAULT_CAPTURED_AT;

  const rawList: unknown[] = Array.isArray(source)
    ? source
    : Array.isArray(record.candidates)
      ? record.candidates
      : Array.isArray(record.items)
        ? record.items
        : Array.isArray(record.entries)
          ? record.entries
          : Array.isArray(record.lines)
            ? record.lines
            : [];

  const parsed: CandidateLine[] = [];
  for (let i = 0; i < rawList.length; i += 1) {
    const item = normalizeCandidate(rawList[i], i, maxChars, warnings);
    if (item) parsed.push(item);
  }

  const candidates = parsed.length > 0 ? parsed : DEFAULT_CANDIDATES.map(cloneCandidate);
  return {
    schemaVersion: "1.0",
    bountyId,
    title,
    capturedAt,
    boardStatus,
    maxChars,
    topSlots,
    candidates,
    items: candidates,
    warnings,
  };
}

function compositeScore(candidate: CandidateLine, maxChars: number): number {
  const charCount = candidate.text.length;
  const valid = charCount > 0 && charCount <= maxChars && !/[\r\n]/.test(candidate.text);
  const brevity = valid ? candidate.signals.brevity : 0;
  const weighted =
    candidate.signals.punch * 0.34 +
    candidate.signals.voice * 0.24 +
    candidate.signals.relatability * 0.18 +
    candidate.signals.imagery * 0.14 +
    brevity * 0.10;
  return round2(valid ? weighted : Math.max(0, weighted - 35));
}

function comparePair(a: RankedEntry, b: RankedEntry): number {
  if (a.valid !== b.valid) return a.valid ? -1 : 1;
  if (a.score !== b.score) return b.score - a.score;
  if (a.signals.punch !== b.signals.punch) return b.signals.punch - a.signals.punch;
  if (a.signals.voice !== b.signals.voice) return b.signals.voice - a.signals.voice;
  if (a.charCount !== b.charCount) return a.charCount - b.charCount;
  const fpOrder = asciiCompare(a.fingerprint, b.fingerprint);
  if (fpOrder !== 0) return fpOrder;
  return asciiCompare(a.id, b.id);
}

export function buildRadar(input?: Snapshot | Radar | unknown): Radar {
  if (isRadar(input)) return input;
  const snapshot = parseSnapshot(input);
  const warnings = [...snapshot.warnings];
  const seenTexts = new Set<string>();

  const entries: RankedEntry[] = snapshot.candidates.map((candidate) => {
    const clean = sanitizeLine(candidate.text);
    const key = clean.toLowerCase();
    if (seenTexts.has(key)) {
      warnings.push(`Duplicate candidate text detected for ${candidate.id}.`);
    }
    seenTexts.add(key);
    const charCount = clean.length;
    const wordCount = clean ? clean.split(" ").length : 0;
    const valid = charCount > 0 && charCount <= snapshot.maxChars;
    const score = compositeScore({ ...candidate, text: clean }, snapshot.maxChars);
    return {
      ...cloneCandidate({ ...candidate, text: clean }),
      rank: 0,
      charCount,
      wordCount,
      valid,
      score,
      wins: 0,
      losses: 0,
      winRate: 0,
      rating: 1200,
      inTop8: false,
      fingerprint: fnv1aHex(`${candidate.id}|${clean}`),
    };
  });

  let pairwiseRounds = 0;
  for (let i = 0; i < entries.length; i += 1) {
    for (let j = i + 1; j < entries.length; j += 1) {
      pairwiseRounds += 1;
      const result = comparePair(entries[i], entries[j]);
      if (result <= 0) {
        entries[i].wins += 1;
        entries[j].losses += 1;
      } else {
        entries[j].wins += 1;
        entries[i].losses += 1;
      }
    }
  }

  for (const entry of entries) {
    const matches = entry.wins + entry.losses;
    entry.winRate = matches > 0 ? round2((entry.wins / matches) * 100) : 100;
    entry.rating = Math.round(1200 + (entry.wins - entry.losses) * 24 + (entry.score - 85) * 4);
  }

  entries.sort((a, b) => {
    if (a.valid !== b.valid) return a.valid ? -1 : 1;
    if (a.wins !== b.wins) return b.wins - a.wins;
    return comparePair(a, b);
  });

  entries.forEach((entry, idx) => {
    entry.rank = idx + 1;
    entry.inTop8 = entry.valid && entry.rank <= snapshot.topSlots;
  });

  const angleMap = new Map<string, RankedEntry[]>();
  for (const entry of entries) {
    const group = angleMap.get(entry.angle) ?? [];
    group.push(entry);
    angleMap.set(entry.angle, group);
  }

  const byAngle: AngleSummary[] = Array.from(angleMap.entries())
    .map(([angle, group]) => {
      const avgScore = round2(group.reduce((sum, item) => sum + item.score, 0) / group.length);
      return {
        angle,
        count: group.length,
        bestRank: group[0].rank,
        avgScore,
        leadId: group[0].id,
      };
    })
    .sort((a, b) => (a.bestRank !== b.bestRank ? a.bestRank - b.bestRank : asciiCompare(a.angle, b.angle)));

  const winner = entries[0];
  const topEntries = entries.slice(0, snapshot.topSlots);
  const validCandidates = entries.filter((item) => item.valid).length;
  const digestSource = entries.map((e) => `${e.rank}:${e.id}:${e.score}:${e.wins}:${e.fingerprint}`).join("|");
  const digest = fnv1aHex(`${snapshot.bountyId}|${snapshot.boardStatus}|${digestSource}`);

  return {
    schemaVersion: "1.0",
    bountyId: snapshot.bountyId,
    title: snapshot.title,
    capturedAt: snapshot.capturedAt,
    boardStatus: snapshot.boardStatus,
    maxChars: snapshot.maxChars,
    topSlots: snapshot.topSlots,
    totalCandidates: entries.length,
    validCandidates,
    pairwiseRounds,
    winner,
    selectedLine: winner.text,
    topEntries,
    ranked: entries,
    items: entries,
    byAngle,
    warnings,
    digest,
  };
}

export function boardIssue(input?: Snapshot | Radar | unknown, maybeRadar?: Radar): BoardIssue {
  const radar = isRadar(maybeRadar) ? maybeRadar : buildRadar(input);
  const warnings = [...radar.warnings];
  const blind = radar.boardStatus === "blind";

  if (radar.validCandidates === 0) {
    warnings.push("No valid candidate satisfies the 200-character single-line constraint.");
  } else if (radar.validCandidates < radar.topSlots) {
    warnings.push(`Only ${radar.validCandidates} valid candidates for ${radar.topSlots} top pool slots.`);
  }
  if (!radar.winner.valid) {
    warnings.push(`Top-ranked candidate ${radar.winner.id} exceeds ${radar.maxChars} characters.`);
  }

  const hasError = radar.validCandidates === 0 || !radar.winner.valid;
  const hasWarn = !hasError && warnings.length > 0;
  const severity: IssueSeverity = hasError ? "error" : hasWarn ? "warn" : "info";
  const status: BoardIssue["status"] = hasError ? "degraded" : blind ? "blind" : "ready";
  const code = hasError
    ? "BOARD_CONSTRAINT_VIOLATION"
    : hasWarn
      ? "BOARD_ADVISORY"
      : blind
        ? "BOARD_BLIND_PENDING"
        : "BOARD_PUBLISHED";

  const headline = hasError
    ? "Candidate pool fails plain-text length guardrails."
    : blind
      ? "Blind pairwise board active: top 8 locked locally until results publish."
      : "Published pairwise board verified and ranked.";

  const summary =
    `Selected #1 (${radar.winner.id}, ${radar.winner.charCount}/${radar.maxChars} chars, ` +
    `${radar.winner.wins}/${Math.max(1, radar.totalCandidates - 1)} wins, score ${radar.winner.score}) ` +
    `across ${radar.pairwiseRounds} deterministic pairwise matchups.`;

  const issue: BoardIssue = {
    id: `issue-${radar.digest}`,
    code,
    status,
    severity,
    blind,
    title: `${radar.title} — Board Dispatch`,
    headline,
    summary,
    message: `${headline} ${summary}`,
    selectedLine: radar.selectedLine,
    charCount: radar.winner.charCount,
    maxChars: radar.maxChars,
    candidateCount: radar.totalCandidates,
    validCount: radar.validCandidates,
    topSlots: radar.topSlots,
    warnings,
    digest: radar.digest,
  };

  Object.defineProperty(issue, "toString", {
    enumerable: false,
    value: () => `[${issue.code}] ${issue.message}`,
  });

  return issue;
}

function escapeHtmlAttr(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function safeJsonForScript(payload: unknown): string {
  const serialized = JSON.stringify(payload === undefined ? null : payload);
  return serialized
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");
}

export function dataScript(payloadOrId?: unknown, maybePayload?: unknown): string {
  const hasIdFirst = typeof payloadOrId === "string" && maybePayload !== undefined;
  const id = hasIdFirst
    ? payloadOrId
    : typeof maybePayload === "string" && maybePayload.trim()
      ? maybePayload.trim()
      : "radar-data";
  const data = hasIdFirst
    ? maybePayload
    : payloadOrId === undefined
      ? buildRadar()
      : payloadOrId;
  return `<script id="${escapeHtmlAttr(id)}" type="application/json">${safeJsonForScript(data)}</script>`;
}