import { Injectable } from '@angular/core';
import {Ataque} from "../models/ataque.model";

@Injectable({
    providedIn: 'root'
})
export class DanoStorageComponent {

    public ataque: Ataque = {
        parteCorpo: '',
        dano: 0
    };

    constructor() { }

    setDano(valor: number) {
        this.ataque.dano = valor;
    }

    setParteCorpo(parteCorpo: string) {
        this.ataque.parteCorpo = parteCorpo;
    }

    getDano(): number {
        return this.ataque.dano;
    }

    getParteCorpo(): string {
        return this.ataque.parteCorpo;
    }
}
