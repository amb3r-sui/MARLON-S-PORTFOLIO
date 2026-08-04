import type {
  WorkflowExplorerDefinition,
  WorkflowExplorerEdge,
  WorkflowExplorerNote,
  WorkflowNoteColor,
} from "@/types";

type Point = readonly [number, number];
type EdgeSpec = readonly [string, string, string?];
type NoteSpec = readonly [
  id: string,
  title: string,
  body: string,
  color: WorkflowNoteColor,
  x: number,
  y: number,
  width: number,
  height: number,
];

interface RanaLayout {
  zoom: number;
  nodes: Record<string, Point>;
  edges: EdgeSpec[];
  notes: NoteSpec[];
  disabled?: string[];
}

const layouts: Record<string, RanaLayout> = {
  "rana-00": {
    zoom: 0.20,
    nodes: {
      receive: [-2272, 0], secret: [-1856, 0], verify: [-1456, 0], allow: [-1072, 0],
      rejectsig: [-784, 224], validate: [-464, -160], identity: [-192, -160], inspect: [112, -160],
      score: [448, -160], decide: [784, -160], budget: [1200, -720], budgetnotify: [1584, -1008],
      route: [912, 288], recordallow: [1200, -528], restore: [1584, -528], callintake: [1936, -528],
      customer: [2304, -528], recordcache: [1216, -176], cached: [1584, -176], captcha: [1216, 80],
      human: [1216, 368], logreject: [1632, 608], safe: [1984, 608], cleanup: [-2288, 592],
      cleanupdb: [-1840, 592],
    },
    edges: [
      ["receive", "secret"], ["secret", "verify"], ["verify", "allow"],
      ["allow", "validate", "true"], ["allow", "rejectsig", "false"],
      ["validate", "identity"], ["identity", "inspect"], ["inspect", "score"], ["score", "decide"],
      ["decide", "route"], ["decide", "budget"], ["budget", "budgetnotify", "true"],
      ["route", "recordallow", "allow"], ["route", "recordcache", "cache"],
      ["route", "captcha", "CAPTCHA"], ["route", "human", "human"],
      ["route", "logreject", "fallback"], ["recordallow", "restore"], ["restore", "callintake"],
      ["callintake", "customer"], ["recordcache", "cached"], ["captcha", "logreject"],
      ["human", "logreject"], ["logreject", "safe"], ["cleanup", "cleanupdb"],
    ],
    notes: [
      ["overview", "Mandatory pre-AI gateway", "This is the only public customer webhook. It fingerprints identity without relying on IP alone, checks duplicates, cache, rates, and budgets, and calls Intake only after authorization.", "blue", -2368, -352, 766, 732],
      ["auth", "1. Authenticate the request", "Receive accepts the website POST. Load Secret reads the server-side signing key. Verify validates the signed request and five-minute timestamp. Invalid requests stop safely.", "green", -1600, -352, 1068, 722],
      ["controls", "2. Validate, identify, and inspect limits", "Validate required fields, build privacy-safe identity fingerprints, and inspect duplicate, cache, rate-limit, conversation-budget, customer-budget, and daily-cost state before any AI call.", "purple", -528, -352, 860, 728],
      ["routing", "3. Score and route safely", "Deterministic rules score abuse and choose one result: allow, return cache, require CAPTCHA, human review, throttle, or temporary block.", "red", 336, -352, 2248, 1186],
      ["outcomes", "4. Understand the outcome branches", "Allow records counters and calls private Intake. Cache reuses an approved response. CAPTCHA creates a challenge. Human review escalates. Throttle and block return a safe message.", "blue", 336, -1216, 2232, 858],
      ["cleanup", "5. Background maintenance", "This separate hourly path removes expired deduplication, cache, rate-window, CAPTCHA, and temporary-block records.", "slate", -2368, 384, 762, 482],
      ["test", "Manual test checklist", "Test a normal signed inquiry, an unsigned request, and a repeated signed message. Never include signing secrets in screenshots.", "amber", -3072, -352, 700, 250],
    ],
  },
  "rana-01": {
    zoom: 0.32,
    nodes: {
      receive: [-416, 0], validate: [-176, 0], normalize: [64, 0], checkdup: [304, 0],
      route: [544, 0], duplicate: [800, -160], upsert: [800, 80], restore: [1056, 80],
      brain: [1312, 80], safe: [1664, 80],
    },
    edges: [
      ["receive", "validate"], ["validate", "normalize"], ["normalize", "checkdup"], ["checkdup", "route"],
      ["route", "duplicate", "true"], ["route", "upsert", "false"], ["upsert", "restore"],
      ["restore", "brain"], ["brain", "safe"],
    ],
    notes: [
      ["overview", "Gateway-approved intake only", "This private workflow validates customer data, prevents duplicate persistence, saves the incoming message, and calls Rana AI only after Workflow 00 authorizes the request.", "blue", -1248, -240, 640, 260],
      ["intake", "1. Validate and normalize", "Accept only approved fields, validate contact or session identity, minimize personal data, and create stable request and conversation identifiers.", "green", -560, -240, 744, 480],
      ["dedup", "2. Stop duplicate requests", "Check the idempotency key before any write. Existing requests return safely without another AI call or booking attempt.", "purple", 192, -240, 552, 480],
      ["persist", "3. Return duplicate or persist and continue", "New requests save the customer and incoming message, restore authorized context, call the AI brain, and return a safe structured response.", "red", 752, -368, 1128, 736],
      ["test", "Manual test checklist", "Send a signed website inquiry through Workflow 00, confirm one write and one AI execution, then repeat it and confirm duplicate protection.", "amber", -1248, 32, 640, 204],
    ],
  },
  "rana-02": {
    zoom: 0.20,
    nodes: {
      receive: [-1632, -720], auth: [-1248, -720], settings: [-864, -720], profile: [-1632, -400],
      history: [-1248, -400], context: [-864, -400], agent: [-144, -16], model: [-320, 384],
      rag: [-80, -368], parser: [208, 416], validate: [416, -16], bookroute: [912, -64],
      escalateroute: [1040, 672], callescalate: [1648, 656], preparebooking: [1296, -32],
      calendar: [1568, -32], bookingresponse: [1808, -32], cache: [2080, -32], save: [2384, -32],
      usage: [2736, -32], return: [3072, -32],
    },
    edges: [
      ["receive", "auth"], ["auth", "settings"], ["settings", "profile"], ["profile", "history"],
      ["history", "context"], ["context", "agent"], ["model", "agent", "Model"],
      ["rag", "agent", "Tool"], ["parser", "agent", "Parser"], ["agent", "validate"],
      ["validate", "bookroute"], ["bookroute", "preparebooking", "0"],
      ["bookroute", "preparebooking", "1"], ["bookroute", "preparebooking", "2"],
      ["bookroute", "preparebooking", "3"],
      ["bookroute", "escalateroute", "fallback"], ["preparebooking", "calendar"],
      ["calendar", "bookingresponse"], ["bookingresponse", "cache"], ["escalateroute", "callescalate", "0"],
      ["escalateroute", "cache", "fallback"], ["callescalate", "cache"], ["cache", "save"],
      ["save", "usage"], ["usage", "return"],
    ],
    notes: [
      ["overview", "Controlled Gemini conversation layer", "Gemini receives compact history plus approved service and branch catalogs. It cannot write to the database or calendar. Booking mutations remain deterministic.", "blue", -2224, -896, 430, 220],
      ["auth", "1. Gateway authorization and business rules", "Accept only inquiries authorized by Workflow 00 and load approved business settings before reading customer data or calling Gemini.", "blue", -1744, -896, 1152, 332],
      ["context", "2. Customer and conversation context", "Load the customer profile and compact conversation history, then prepare a minimal agent context.", "green", -1744, -560, 1152, 300],
      ["ai", "3. Controlled AI reasoning", "Gemini proposes a structured decision. The parser enforces the output shape, while the RAG tool retrieves approved knowledge.", "purple", -592, -560, 1232, 1152],
      ["routing", "4. Deterministic action and escalation routing", "Validate the model decision before acting. Booking actions go through Workflow 03; sensitive or unsupported cases go through Workflow 05.", "red", 640, -560, 1312, 1470],
      ["persist", "5. Persist, audit, and return", "Cache only approved static responses, save the conversation result, record sanitized AI usage, and return one structured decision.", "slate", 1952, -560, 1312, 720],
      ["test", "Workflow 02 test checklist", "Test approved service questions, missing booking details, unsupported branches, and a payment dispute. Confirm no AI node directly changes an appointment.", "amber", -2224, -624, 430, 368],
    ],
  },
  "rana-03": {
    zoom: 0.24,
    nodes: {
      receive: [-1216, 0], prepare: [-800, 0], route: [-336, -64], catalog: [160, -368],
      rules: [160, -80], dbconflicts: [400, -80], calavailability: [640, -80], evaluate: [880, -80],
      outcome: [1120, -96], create: [1472, -112], commit: [1744, -112], queue: [2032, -112],
      loadexisting: [160, 608], mutation: [608, 592], reschedule: [1488, 320], cancel: [672, 304],
      commitreschedule: [1776, 320], commitcancel: [912, 304], invalid: [912, 544], result: [2144, 496],
    },
    edges: [
      ["receive", "prepare"], ["prepare", "route"], ["route", "catalog", "0"],
      ["route", "rules", "1"], ["route", "rules", "2"], ["route", "loadexisting", "3"],
      ["route", "loadexisting", "4"], ["route", "invalid", "fallback"],
      ["catalog", "result"], ["rules", "dbconflicts"], ["dbconflicts", "calavailability"],
      ["calavailability", "evaluate"], ["evaluate", "outcome"], ["outcome", "create", "0"],
      ["outcome", "reschedule", "1"], ["outcome", "result", "fallback"], ["create", "commit"],
      ["commit", "queue"], ["queue", "result"], ["loadexisting", "mutation"],
      ["mutation", "rules", "0"], ["mutation", "cancel", "1"], ["mutation", "invalid", "fallback"],
      ["reschedule", "commitreschedule"], ["cancel", "commitcancel"], ["commitreschedule", "result"],
      ["commitcancel", "result"], ["invalid", "result"],
    ],
    notes: [
      ["overview", "Deterministic booking boundary", "This workflow owns service lookup, availability, booking, rescheduling, and cancellation. Database and Google Calendar checks complete before any appointment write.", "blue", -2048, -32, 680, 280],
      ["input", "1. Validate and route the action", "Normalize the request and route exactly one action: service lookup, availability, create, reschedule, cancel, or a safe invalid result.", "green", -1328, -240, 1232, 480],
      ["availability", "2. Resolve service and availability", "Load approved service and branch rules, check database conflicts, check Google Calendar, and combine both results before deciding.", "purple", -96, -560, 1368, 700],
      ["create", "3. Commit successful actions and return", "Confirmed creation creates the calendar event, commits the appointment, and queues CRM reminders. Successful mutations return a structured result.", "blue", 1296, -272, 1168, 1228],
      ["mutations", "4. Existing appointments, cancellation, and invalid results", "Load the existing appointment and route reschedule or cancellation. Invalid or missing requests produce a safe result.", "red", -96, 144, 1376, 824],
      ["test", "Manual test checklist", "Check an open time and alternatives for a conflict. Create only after confirmation. Cancel by reference and verify the slot becomes available again.", "amber", -2048, -416, 680, 340],
    ],
  },
  "rana-04": {
    zoom: 0.27,
    nodes: {
      receive: [-528, -80], normalize: [-304, -80], route: [-80, -80], schedule: [-576, 576],
      scheduledctx: [-272, 576], customer: [192, -64], restorecustomer: [416, -64],
      counters: [640, -64], restoreappt: [992, -64], queue: [1264, -64], due: [32, 576],
      consent: [320, 576], delivery: [528, 560], smtp: [976, 544], mock: [992, 704],
      suppress: [992, 896], sent: [1232, 544], review: [1344, 368], result: [1712, 304],
      log: [2048, 304], return: [2352, 304],
    },
    edges: [
      ["receive", "normalize"], ["normalize", "route"], ["route", "due", "0"],
      ["route", "customer", "fallback"], ["customer", "restorecustomer"], ["restorecustomer", "counters"],
      ["counters", "restoreappt"], ["restoreappt", "queue"], ["queue", "result"],
      ["schedule", "scheduledctx"], ["scheduledctx", "due"], ["due", "consent"], ["consent", "delivery"],
      ["delivery", "smtp", "0"], ["delivery", "mock", "1"], ["delivery", "suppress", "fallback"],
      ["smtp", "sent"], ["mock", "sent"], ["sent", "review"], ["review", "result"],
      ["suppress", "result"], ["result", "log"], ["log", "return"],
    ],
    disabled: ["schedule"],
    notes: [
      ["overview", "CRM and consent-aware messaging", "Successful bookings update customer history and queue idempotent reminders. Delivery is separated from queueing so consent and channel policy are enforced first.", "blue", -1328, -320, 650, 280],
      ["queue", "1. Update CRM and queue reminders", "Normalize the booking result, update customer and appointment counters, then queue confirmation and reminder jobs once.", "green", -640, -320, 2144, 448],
      ["dispatch", "2. Load due jobs and enforce policy", "The dispatcher loads due reminders, checks consent and message policy, and routes each job to approved delivery, mock QA, or suppression.", "purple", -640, 128, 1288, 648],
      ["delivery", "3. Deliver or suppress safely", "Approved email uses SMTP. QA can record a mock delivery. Disallowed reminders are suppressed.", "red", 656, 128, 852, 984],
      ["results", "4. Normalize, audit, and return", "Merge every branch into one result, write the CRM and reminder audit record, and return a structured queue outcome.", "slate", 1504, 128, 1088, 988],
      ["test", "Manual test checklist", "Complete a test booking, confirm reminder rows are queued once, run a mock delivery, and verify disallowed promotional reminders are suppressed.", "amber", -1328, 432, 650, 340],
    ],
  },
  "rana-05": {
    zoom: 0.38,
    nodes: {
      human: [-464, -256], error: [-448, 16], daily: [-416, 336], normalize: [-176, -112],
      escalation: [112, -96], log: [352, -96], telegram: [384, -96], smtp: [592, -96],
      return: [832, -96], aggregate: [-144, 336], summarytelegram: [112, 336],
    },
    edges: [
      ["human", "normalize"], ["error", "normalize"], ["normalize", "escalation"],
      ["escalation", "log"], ["log", "smtp"], ["smtp", "return"],
      ["daily", "aggregate"], ["aggregate", "summarytelegram"],
    ],
    disabled: ["telegram", "summarytelegram"],
    notes: [
      ["overview", "Centralized escalation and operations", "Human-review requests and workflow errors enter one sanitization boundary. Staff notifications contain only the minimum context needed to investigate.", "blue", -1264, -480, 650, 184],
      ["intake", "1. Accept escalation or error events", "Both triggers converge on Normalize and Sanitize Event. Secrets are redacted, risky requests are prioritized, and recursive self-errors are ignored.", "green", -592, -480, 592, 680],
      ["persist", "2. Store before notifying staff", "Persist the escalation and sanitized workflow log first. SMTP is active; gray Telegram nodes are disabled legacy placeholders.", "purple", 0, -304, 1084, 512],
      ["summary", "3. Aggregate operations safely", "The scheduled branch produces aggregate operational counts only. It never includes secrets or full customer conversations.", "slate", -592, 208, 900, 440],
      ["test", "Manual test checklist", "Ask for a manager or report a dispute. Confirm one escalation row, one sanitized log row, and one minimal staff alert.", "amber", -1344, -272, 732, 424],
    ],
  },
  "rana-06": {
    zoom: 0.30,
    nodes: {
      searchtrigger: [192, 80], ingesttrigger: [-768, 560], sanitize: [512, 80], retrieve: [848, 80],
      policy: [1424, 80], loadcontent: [-368, 560], clean: [-16, 560], checksum: [336, 560],
      duplicate: [640, 560], register: [976, 560], restore: [1344, 560], document: [1856, 784],
      split: [1856, 1024], embed: [1648, 784], store: [1744, 560], deactivate: [2112, 560],
      audit: [2448, 560],
    },
    edges: [
      ["searchtrigger", "sanitize"], ["sanitize", "retrieve"], ["retrieve", "policy"],
      ["ingesttrigger", "loadcontent"], ["loadcontent", "clean"], ["clean", "checksum"],
      ["checksum", "duplicate"], ["duplicate", "register"], ["register", "restore"],
      ["restore", "store"], ["split", "document", "Text Splitter"], ["embed", "retrieve", "Embedding"],
      ["embed", "store", "Embeddings"], ["document", "store", "Document"],
      ["store", "deactivate"], ["deactivate", "audit"],
    ],
    notes: [
      ["overview", "Approved knowledge only", "Two independent paths support controlled retrieval and approved document ingestion. Customer conversations never become official knowledge.", "blue", -832, -192, 876, 280],
      ["retrieval", "1. Retrieve approved knowledge", "Sanitize the query, retrieve candidate chunks, and keep only active, effective sources that meet the similarity threshold.", "green", 48, -48, 1560, 496],
      ["ingestion", "2. Validate and normalize ingestion", "Accept an approved document, reject customer conversations, normalize text, and create a deterministic checksum.", "purple", -832, 448, 1384, 500],
      ["versioning", "3. Deduplicate, register, and restore", "Stop checksum duplicates, register the new document version, replace older versions, and restore authorized context.", "red", 560, 448, 1052, 500],
      ["lifecycle", "4. Chunk, embed, enforce lifecycle, and audit", "Load registered content, split controlled chunks, generate embeddings, store approved knowledge, deactivate expired documents, and return statistics.", "slate", 1616, 416, 1084, 900],
      ["test", "Manual test checklist", "Ingest one approved policy document, repeat it to confirm duplicate handling, then search a known phrase and verify an active approved source.", "amber", -832, 96, 876, 340],
    ],
  },
};

const NOTE_PADDING = 48;
const NODE_WIDTH = 112;
const NODE_HEIGHT = 92;

export function applyRanaLayout(workflow: WorkflowExplorerDefinition): WorkflowExplorerDefinition {
  const layout = layouts[workflow.id];
  if (!layout) return workflow;

  const allBounds = [
    ...Object.values(layout.nodes).map(([x, y]) => ({ x, y, width: NODE_WIDTH, height: NODE_HEIGHT })),
    ...layout.notes.map(([, , , , x, y, width, height]) => ({ x, y, width, height })),
  ];
  const minX = Math.min(...allBounds.map((item) => item.x));
  const minY = Math.min(...allBounds.map((item) => item.y));
  const maxX = Math.max(...allBounds.map((item) => item.x + item.width));
  const maxY = Math.max(...allBounds.map((item) => item.y + item.height));
  const disabled = new Set(layout.disabled ?? []);
  const translate = ([x, y]: Point): Point => [x - minX + NOTE_PADDING, y - minY + NOTE_PADDING];

  const notes: WorkflowExplorerNote[] = layout.notes.map(
    ([id, title, body, color, x, y, width, height]) => {
      const [translatedX, translatedY] = translate([x, y]);
      return { id, title, body, color, x: translatedX, y: translatedY, width, height };
    },
  );

  const edges: WorkflowExplorerEdge[] = layout.edges.map(([from, to, label]) => ({
    from,
    to,
    ...(label ? { label } : {}),
  }));

  return {
    ...workflow,
    width: maxX - minX + NOTE_PADDING * 2,
    height: maxY - minY + NOTE_PADDING * 2,
    initialZoom: layout.zoom,
    notes,
    nodes: workflow.nodes.map((item) => {
      const position = layout.nodes[item.id];
      if (!position) return item;
      const [x, y] = translate(position);
      return { ...item, x, y, ...(disabled.has(item.id) ? { disabled: true } : {}) };
    }),
    edges,
  };
}
