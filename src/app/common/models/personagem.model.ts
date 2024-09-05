import { Atributo } from "./atributo.model";

export interface Personagem {
  nome: string;
  vida: number;
  vidaBase: number;
  cabeca: number;
  torso: number;
  bracoDireito: number;
  bracoEsquerdo: number;
  pernaDireita: number;
  pernaEsquerda: number;
  bracoForte: 'DIREITO' | 'CANHOTO';
  experiencia: number;
  level: number;
  isNpc: boolean;
  atributo: Atributo;
}
