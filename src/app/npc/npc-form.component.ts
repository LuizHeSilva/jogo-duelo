import { Personagem } from "../models/personagem.model";

// migrar para common
export class FormCriarPersonagens {
    static criar(nomeJogador?: string): Personagem {
        return {
            nome: nomeJogador ? nomeJogador : 'Bili De Quibe',
            vida: 20,
            bracos: 6,
            pernas: 6,
            torso: 3,
            cabeca: 1
        }
    };
}