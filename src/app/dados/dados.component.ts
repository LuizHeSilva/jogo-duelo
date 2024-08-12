import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DanoStorageComponent } from '../storage/dano-storage.component';
import { DadoService } from './dados.service';

@Component({
  selector: 'dados',
  templateUrl: './dados.component.html',
  styleUrls: ['./dados.component.css']
})
export class DadosComponent implements OnInit, OnDestroy {

    @Output() attackEmit: EventEmitter<any> = new EventEmitter();

    public resultadoAtaque: string;
    public resultadoDado: number;
    private resultadoDadoSubject = new BehaviorSubject<number>(0);
    public resultadoDado$: Observable<number> = this.resultadoDadoSubject.asObservable();
    
    constructor(private _dadoService: DadoService,
                private _danoStorage: DanoStorageComponent) {
    }

    ngOnInit(): void {
        this.resultadoDado$.subscribe(value => {
            if (value != 0) {
                const parteCorpo = this._danoStorage.getParteCorpo();
                this.atacar(parteCorpo);
            }
        });
    }

    ngOnDestroy(): void {
        console.log('estou sendo dentruido');
        
        this.resultadoDado = null;
        this.resultadoAtaque = null;
    }

    rolar() {
        this._dadoService.rolarDado(1, 20).subscribe((resultado: [{id: number, value: number}]) => {
            this.resultadoDado = resultado[0].value;
            this.regraAtaque(this.resultadoDado);
        });
    }

    setResultadoDado(newValue: number): void {
        this.resultadoDadoSubject.next(newValue);
    }

    private atacar(parteDoCorpo: string) {
        this.attackEmit.emit(parteDoCorpo);
      }

    private regraAtaque(resultadoDado: number) {
        const parteCorpo = this._danoStorage.ataque?.parteCorpo;
        switch (parteCorpo) {
            case 'cabeca':
                this.resultadoDoAtaque(resultadoDado, 18, 20);
                break;
            case 'torso':
                this.resultadoDoAtaque(resultadoDado, 12, 10);
                break;
            case 'bracos':
                this.resultadoDoAtaque(resultadoDado, 15, 10);
                break;
            case 'pernas':
                this.resultadoDoAtaque(resultadoDado, 10, 5);
                break;
        }
    }

    private resultadoDoAtaque(resultadoDado: number, dificuldade: number, dano: number): void {
        if (resultadoDado >= dificuldade) {
            this.resultadoAtaque = 'TÁ PORRA! ACERTOU NA CAGADA! ( ˶°ㅁ°) !!';
            this._danoStorage.setDano(dano);
            this.setResultadoDado(this.resultadoDado);
        } else {
            this.resultadoAtaque = 'O óbvio aconteceu... vc errou! ദ്ദി ༎ຶ‿༎ຶ )';
        }
    }
}
