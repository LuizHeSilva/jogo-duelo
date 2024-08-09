import {Component, OnInit} from '@angular/core';
import {DadoService} from './dados.service';
import {DanoStorageComponent} from "../storage/dano-storage.component";
import { DanoAction } from './dados.action';

@Component({
  selector: 'dados',
  templateUrl: './dados.component.html',
  styleUrls: ['./dados.component.css']
})
export class DadosComponent implements OnInit {

    public resultadoDado: number;
    
    get resultadoAtaque() {
        return this._action.resultadoAtaque;
    }

    constructor(private _dadoService: DadoService,
                private _action: DanoAction){
    }

    ngOnInit(): void {
        this.rolar();
    }

    rolar() {
        this._dadoService.rolarDado(1, 20).subscribe((resultado: [{id: number, value: number}]) => {
            this.resultadoDado = resultado[0].value;
            this._action.regraAtaque(this.resultadoDado);
        });
    }

}
