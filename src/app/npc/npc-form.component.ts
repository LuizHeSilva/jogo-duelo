import { Personagem } from "../models/personagem.model";

// migrar para common
export class FormCriarPersonagens {
    static criar(): Personagem {
        return {
            nome: 'Bili De Quibe',
            vida: 20,
            bracos: 6,
            pernas: 6,
            torso: 3,
            cabeca: 1
        }
    };
}