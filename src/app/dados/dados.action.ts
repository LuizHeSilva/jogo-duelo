import { Injectable } from "@angular/core";
import { DanoStorageComponent } from "../storage/dano-storage.component";

@Injectable({
    providedIn: 'root'
})
export class DanoAction {

    public resultadoAtaque: string = '';

    constructor(private _danoStorage: DanoStorageComponent){}

    public regraAtaque(resultadoDado: number) {
        const parteCorpo = this._danoStorage.ataque?.parteCorpo;
        switch (parteCorpo) {
            case 'cabeca':
                if (resultadoDado >= 10) {
                    this._danoStorage.setDano(20);
                    this.resultadoAtaque = 'TÁ PORRA! ACERTOU NA CAGADA! ( ˶°ㅁ°) !!'
                } else {
                    this.resultadoAtaque = 'O óbvio aconteceu... vc errou! ദ്ദി ༎ຶ‿༎ຶ )'
                }
                break;
            case 'torso':
                break;
            case 'bracos':
                break;
            case 'pernas':
                break;
        }
    }

}