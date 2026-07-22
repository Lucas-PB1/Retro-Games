/**
 * Shared AI — security policy for Cursor hooks (portable ESM, no deps).
 */

/**
 * @typedef {{ permission: "allow" | "deny" | "ask", user_message?: string, agent_message?: string }} HookDecision
 */

/** @type {{ re: RegExp, reason: string }[]} */
const DENY_SHELL = [
  {
    re: /\bgit\s+push\b[^\n]*\s(--force|-f)\b/i,
    reason: "force push bloqueado pelo hook de segurança",
  },
  {
    re: /\bgit\s+reset\s+--hard\b/i,
    reason: "git reset --hard bloqueado — operação destrutiva",
  },
  {
    re: /\bgit\s+clean\s+[^\n]*-f/i,
    reason: "git clean -f bloqueado — apaga arquivos não rastreados",
  },
  {
    re: /\b(drop\s+database|drop\s+schema)\b/i,
    reason: "DROP DATABASE/SCHEMA bloqueado pelo hook",
  },
  {
    re: /\btruncate\s+table\b/i,
    reason: "TRUNCATE TABLE bloqueado — peça confirmação explícita ao usuário",
  },
  {
    re: /\bkubectl\s+delete\b[^\n]*\b(prod|production)\b/i,
    reason: "kubectl delete em produção bloqueado",
  },
];

/** @type {{ re: RegExp, reason: string }[]} */
const ASK_SHELL = [
  {
    re: /\bgit\s+push\b/i,
    reason: "git push requer confirmação",
  },
  {
    re: /\bdrop\s+table\b/i,
    reason: "DROP TABLE requer confirmação",
  },
  {
    re: /\bdocker\s+(system\s+prune|volume\s+rm)\b/i,
    reason: "limpeza Docker destrutiva — confirme",
  },
];

/**
 * @param {string} filePath
 * @returns {boolean}
 */
export function isSecretFilePath(filePath) {
  const normalized = String(filePath || "").replace(/\\/g, "/");
  const base = normalized.split("/").pop() || normalized;

  if ((base === ".env" || base.startsWith(".env.")) && !/\.example$/i.test(base)) return true;
  if (/\.pem$/i.test(base) || /\.p12$/i.test(base)) return true;
  if (base === "id_rsa" || base === "id_ed25519") return true;
  if (base.endsWith("_rsa") || base.endsWith("_ed25519")) return true;
  if (base === "credentials.json" || base === "service-account.json") return true;
  if (base === "secrets.json") return true;
  if (/^(?!.*example).*secrets?\.(json|ya?ml|toml)$/i.test(base)) return true;
  if (base === "google-services.json" || base === "GoogleService-Info.plist") return true;

  return false;
}

/**
 * @param {string} command
 * @returns {HookDecision}
 */
export function decideShellCommand(command) {
  const cmd = String(command || "").trim();
  if (!cmd) return { permission: "allow" };

  for (const rule of DENY_SHELL) {
    if (rule.re.test(cmd)) {
      return {
        permission: "deny",
        user_message: rule.reason,
        agent_message: `${rule.reason}. Não execute este comando sem confirmação explícita do usuário.`,
      };
    }
  }

  for (const rule of ASK_SHELL) {
    if (rule.re.test(cmd)) {
      return {
        permission: "ask",
        user_message: rule.reason,
        agent_message: `${rule.reason}. Aguarde aprovação do usuário.`,
      };
    }
  }

  return { permission: "allow" };
}

/**
 * @param {string} filePath
 * @returns {HookDecision}
 */
export function decideFileRead(filePath) {
  if (!filePath) return { permission: "allow" };
  if (isSecretFilePath(filePath)) {
    return {
      permission: "deny",
      user_message: `Leitura bloqueada de arquivo sensível: ${filePath}`,
      agent_message:
        "Não leia arquivos de secrets (.env, chaves, credentials). Peça ao usuário o que for necessário sem gravar segredos no repo.",
    };
  }
  return { permission: "allow" };
}
