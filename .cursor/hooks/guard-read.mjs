#!/usr/bin/env node
import { decideFileRead } from "./policy.mjs";

async function readStdin() {
  const chunks = [];
  for await (const chunk of process.stdin) chunks.push(chunk);
  return Buffer.concat(chunks).toString("utf8");
}

try {
  const raw = await readStdin();
  const input = raw.trim() ? JSON.parse(raw) : {};
  const filePath = input.file_path ?? input.filePath ?? input.path ?? "";
  const decision = decideFileRead(filePath);
  process.stdout.write(`${JSON.stringify(decision)}\n`);
} catch {
  process.stdout.write(`${JSON.stringify({ permission: "allow" })}\n`);
}
