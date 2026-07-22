import { truncate } from "./ids";
import { FIELD_MAX } from "./limits";

export type HackInput = { nome: string; movimentos: string; desc: string };
export type ConsequenceInput = { nome: string; desc: string };

function requireString(value: unknown, field: string, item: unknown): string {
  if (typeof value !== "string" || value.length === 0) {
    throw new Error(`Contém item com campo '${field}' inválido ou ausente: ${JSON.stringify(item)}`);
  }
  return value;
}

function asRecord(item: unknown): Record<string, unknown> {
  if (typeof item !== "object" || item === null || Array.isArray(item)) {
    throw new Error(`Cada item do array precisa ser um objeto: ${JSON.stringify(item)}`);
  }
  return item as Record<string, unknown>;
}

export function parseHackInputs(parsed: unknown[]): HackInput[] {
  return parsed.map((item) => {
    const row = asRecord(item);
    return {
      nome: truncate(requireString(row.nome, "nome", item), FIELD_MAX.nome),
      movimentos: truncate(requireString(row.movimentos, "movimentos", item), FIELD_MAX.movimentos),
      desc: truncate(requireString(row.desc, "desc", item), FIELD_MAX.desc),
    };
  });
}

export function parseConsequenceInputs(parsed: unknown[]): ConsequenceInput[] {
  return parsed.map((item) => {
    const row = asRecord(item);
    return {
      nome: truncate(requireString(row.nome, "nome", item), FIELD_MAX.nome),
      desc: truncate(requireString(row.desc, "desc", item), FIELD_MAX.desc),
    };
  });
}

export function parseJsonArray(text: string): unknown[] {
  const parsed: unknown = JSON.parse(text);
  if (!Array.isArray(parsed)) {
    throw new Error("O JSON precisa ser obrigatoriamente um ARRAY de objetos.");
  }
  return parsed;
}
