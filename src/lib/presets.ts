import type { ConsequenceInput, HackInput } from "./parseJsonCatalog";

export type { ConsequenceInput, HackInput };

export const PRESET_HACKS: HackInput[] = [
  {
    nome: "Konami Code (Vidas Extra)",
    movimentos: "A, B, CIMA, BAIXO, ESQUERDA, DIREITA, ESQUERDA, DIREITA, SELECT, START",
    desc: "Fornece 30 vidas adicionais para sobreviver a qualquer desafio extremo nos clássicos.",
  },
  {
    nome: "God Mode (Invencibilidade)",
    movimentos: "DIREITA, L1, L2, CIMA, ESQUERDA, BAIXO, B, A, START",
    desc: "Torna o operador completamente imune a qualquer tipo de dano ou colisão hostil.",
  },
  {
    nome: "Moon Jump (Gravidade Zero)",
    movimentos: "CIMA, CIMA, TRIANGULO, TRIANGULO, QUADRADO, QUADRADO, CIRCULO, X",
    desc: "Reduz a força gravitacional local permitindo saltos extremamente altos e flutuações.",
  },
  {
    nome: "Unlock All Levels (Tudo Liberado)",
    movimentos: "L1, R1, L1, R2, BAIXO, CIMA, DIREITA, ESQUERDA",
    desc: "Desbloqueia imediatamente o acesso a todas as salas, fases e segredos do circuito.",
  },
  {
    nome: "Turbo Speed (Velocidade Máxima)",
    movimentos: "R1, R2, L1, L2, ESQUERDA, BAIXO, DIREITA, CIMA",
    desc: "Aumenta drasticamente a velocidade de movimentação e reação do personagem.",
  },
];

export const PRESET_CONSEQUENCES: ConsequenceInput[] = [
  {
    nome: "Tela de Ruído CRT",
    desc: "A tela da sua TV antiga chiar no canal 3! Fique sem olhar para a tela por 15 segundos.",
  },
  {
    nome: "Controles Invertidos",
    desc: "Sua coordenação motora falhou! Seus eixos principais de direção ficam invertidos.",
  },
  {
    nome: "Perda de Áudio",
    desc: "O cabo de áudio RCA soltou! Jogue em completo silêncio absoluto no próximo desafio.",
  },
  {
    nome: "Modo Preto e Branco",
    desc: "O fósforo colorido queimou! Toda a sala de jogos entra no modo analógico monocromático.",
  },
  {
    nome: "Pane no Sistema",
    desc: "Sobrecarga de energia no transformador do console. Reinicie o último puzzle do zero.",
  },
];
