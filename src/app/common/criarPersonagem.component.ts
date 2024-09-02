import { Personagem } from "./models/personagem.model";

export class CriarPersonagens {
    static criar(nomeJogador?: string): Personagem {
        return {
            nome: nomeJogador ? nomeJogador : 'Bili De Quibe',
            vida: 20,
            cabeca: 1,
            torso: 0,
            bracoDireito: 0, 
            bracoEsquerdo: 0, 
            pernaDireita: 0, 
            pernaEsquerda: 0,
            bracoForte: "DIREITO", 
            experiencia: 0, 
            level: 0, 
            atributo: null
        }
    };
}