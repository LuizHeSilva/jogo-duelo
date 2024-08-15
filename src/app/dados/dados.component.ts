import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {BehaviorSubject, Observable, take, timer} from 'rxjs';
import {DanoStorageComponent} from '../storage/dano-storage.component';
import {DadoService} from './dados.service';

@Component({
  selector: 'dados',
  templateUrl: './dados.component.html',
  styleUrls: ['./dados.component.css']
})
export class DadosComponent implements OnInit, OnDestroy {

    @Output() attackEmit: EventEmitter<any> = new EventEmitter();

    public jaPassouVez: boolean = false;
    public resultadoAtaque: string;
    public resultadoDado: number;
    private resultadoDadoSubject = new BehaviorSubject<number>(0);
    public resultadoDado$: Observable<number> = this.resultadoDadoSubject.asObservable();

    constructor(private _dadoService: DadoService,
                private _danoStorage: DanoStorageComponent) {
    }

    ngOnInit(): void {
        this.resultadoDado$.subscribe(value => {
            if (value !== 0) {
              console.log('dentro subs resultado dado: ', value);
              const parteCorpo: string = this._danoStorage.getParteCorpo();
              this.atacar(parteCorpo);
            }
        });

        if (!this._danoStorage.turno) {
            this.rolar();
            this.jaPassouVez = true;

            timer(5000).subscribe(() => this._danoStorage.trocarTurno());
        }
    }

    ngOnDestroy(): void {
        this.resultadoDado = null;
        this.resultadoAtaque = null;

        if (!this.jaPassouVez) {
            this._danoStorage.trocarTurno();
        }
    }

    rolar() {
        this._dadoService.rolarDado(1, 20).pipe(take(1)).subscribe((resultado: [{id: number, value: number}]) => {
            this.resultadoDado = resultado[0].value;
            this._regraAtaque(this.resultadoDado);
        });
    }

    private atacar(parteDoCorpo: string) {
        console.log('atacar: ', parteDoCorpo);
        this._danoStorage.setParteCorpo(parteDoCorpo);
        this.attackEmit.emit(parteDoCorpo);
    }

    private _regraAtaque(resultadoDado: number) {
        const parteCorpo = this._danoStorage.ataque?.parteCorpo;
        switch (parteCorpo) {
            case 'cabeca':
                this._resultadoDoAtaque(resultadoDado, 18, 20);
                break;
            case 'torso':
                this._resultadoDoAtaque(resultadoDado, 12, 10);
                break;
            case 'bracos':
                this._resultadoDoAtaque(resultadoDado, 15, 10);
                break;
            case 'pernas':
                this._resultadoDoAtaque(resultadoDado, 10, 5);
                break;
        }
    }

    private _resultadoDoAtaque(resultadoDado: number, dificuldade: number, dano: number): void {
        if (resultadoDado >= dificuldade) {
            this.resultadoAtaque = 'TÁ PORRA! ACERTOU NA CAGADA! ( ˶°ㅁ°) !!';
            this._danoStorage.setDano(dano);
        } else {
            this.resultadoAtaque = 'O óbvio aconteceu... vc errou! ദ്ദി ༎ຶ‿༎ຶ )';
        }
        this._setResultadoDado(this.resultadoDado);
    }

    private _setResultadoDado(valor: number): void {
        this.resultadoDadoSubject.next(valor);
    }
}
