export type ParsedRate = {
  origin: string;
  destination: string;
  service: string;
  minWeightKg: string;
  maxWeightKg: string | null;
  amount: string;
  currency: string;
  notes: string;
};

function parseRows(source: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = "";
  let quoted = false;
  for (let i = 0; i < source.length; i += 1) {
    const char = source[i];
    if (char === '"') {
      if (quoted && source[i + 1] === '"') { cell += '"'; i += 1; }
      else quoted = !quoted;
    } else if (char === "," && !quoted) {
      row.push(cell.trim()); cell = "";
    } else if ((char === "\n" || char === "\r") && !quoted) {
      if (char === "\r" && source[i + 1] === "\n") i += 1;
      row.push(cell.trim()); cell = "";
      if (row.some((value) => value !== "")) rows.push(row);
      row = [];
    } else cell += char;
  }
  if (quoted) throw new Error("CSV contains an unclosed quoted field.");
  row.push(cell.trim());
  if (row.some((value) => value !== "")) rows.push(row);
  return rows;
}

export function parseRateCsv(source: string): ParsedRate[] {
  const rows = parseRows(source.replace(/^\uFEFF/, ""));
  if (rows.length < 2) throw new Error("Add a header row and at least one rate row.");
  const headers = rows[0].map((value) => value.toLowerCase().replaceAll(" ", "_").replaceAll("-", "_"));
  const required = ["origin", "destination", "service", "min_weight_kg", "max_weight_kg", "rate", "currency", "notes"];
  const indexes = Object.fromEntries(required.map((name) => [name, headers.indexOf(name)]));
  const missing = required.filter((name) => indexes[name] < 0);
  if (missing.length) throw new Error(`Missing CSV columns: ${missing.join(", ")}.`);
  if (rows.length > 10001) throw new Error("CSV is limited to 10,000 rate rows.");

  return rows.slice(1).map((values, index) => {
    const line = index + 2;
    const get = (name: string) => values[indexes[name]]?.trim() ?? "";
    const origin = get("origin"), destination = get("destination"), service = get("service");
    const min = Number(get("min_weight_kg")), maxValue = get("max_weight_kg"), amount = Number(get("rate"));
    const currency = get("currency").toUpperCase();
    if (!origin || !destination || !service || !currency) throw new Error(`Row ${line}: origin, destination, service, and currency are required.`);
    if (!Number.isFinite(min) || min < 0 || !Number.isFinite(amount) || amount <= 0) throw new Error(`Row ${line}: enter a valid minimum weight and positive rate.`);
    const max = maxValue ? Number(maxValue) : null;
    if (max !== null && (!Number.isFinite(max) || max <= min)) throw new Error(`Row ${line}: max_weight_kg must be greater than min_weight_kg.`);
    if (!/^[A-Z]{3}$/.test(currency)) throw new Error(`Row ${line}: currency must be a 3-letter code such as USD or BDT.`);
    return { origin, destination, service, minWeightKg: String(min), maxWeightKg: max === null ? null : String(max), amount: String(amount), currency, notes: get("notes") };
  });
}
