#!/usr/bin/env node
import { decideShellCommand } from "./policy.mjs";

async function readStdin() {
  const chunks = [];
  for await (const chunk of process.stdin) chunks.push(chunk);
  return Buffer.concat(chunks).toString("utf8");
}

try {
  const raw = await readStdin();
  const input = raw.trim() ? JSON.parse(raw) : {};
  const decision = decideShellCommand(input.command ?? "");
  process.stdout.write(`${JSON.stringify(decision)}\n`);
} catch {
  process.stdout.write(`${JSON.stringify({ permission: "allow" })}\n`);
}
