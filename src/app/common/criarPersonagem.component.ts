import { Personagem } from "./models/personagem.model";

export class CriarPersonagens {
    static criar(nomeJogador?: string): Personagem {
        return {
            nome: nomeJogador ? nomeJogador : 'Bili De Quibe',
            vidaBase: 5,
            vida: 5,
            cabeca: 1,
            torso: 0,
            bracoDireito: 0,
            bracoEsquerdo: 0,
            pernaDireita: 0,
            pernaEsquerda: 0,
            bracoForte: "DIREITO",
            experiencia: 0,
            level: 1,
            isNpc: false,
            atributo: new Atributos()
        };
    }
}

export class Atributos {
    agilidade: number;
    destreza: number;
    forca: number;
    inteligencia: number;
    resistencia: number;
    sorte: number;
    modificadorDano: number;
    modificadorDado: number;

    constructor() {
        this.agilidade = 0;
        this.destreza = 0;
        this.forca = 0;
        this.inteligencia = 0;
        this.resistencia = 0;
        this.sorte = 0;
        this.modificadorDano = 0;
        this.modificadorDado = 0;
    }

}
