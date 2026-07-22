export type HookDecision = {
  permission: "allow" | "deny" | "ask";
  user_message?: string;
  agent_message?: string;
};

export function isSecretFilePath(filePath: string): boolean;
export function decideShellCommand(command: string): HookDecision;
export function decideFileRead(filePath: string): HookDecision;
