import {Component, OnInit} from '@angular/core';
import {DadoService} from './dados.service';
import {DanoStorageComponent} from "../storage/dano-storage.component";

@Component({
  selector: 'dados',
  templateUrl: './dados.component.html',
  styleUrls: ['./dados.component.css']
})
export class DadosComponent implements OnInit {

    public roll: number;

    constructor(private _dadoService: DadoService,
                private _danoStorage: DanoStorageComponent){
    }

    ngOnInit(): void {
        this.rolar();
    }

    rolar() {
        this._dadoService.rolarDado(1, 20).subscribe((resultado: [{id: number, value: number}]) => {
            this.roll = resultado[0].value;
            this._verificar();
        });
    }

//     TODO: implementar em um ACTION as regras de como irá acertar os ataques
    private _verificar() {
        const parteCorpo = this._danoStorage.ataque?.parteCorpo;
        switch (parteCorpo) {
            case 'cabeca':
                if (this.roll >= 10) {
                    this._danoStorage.setDano(20);
                    console.log('acertou');
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
