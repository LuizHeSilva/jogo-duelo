import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, take, timer } from 'rxjs';
import { StorageComponent } from '../storage/storage-component.service';
import { DadoService } from './dados.service';
import { Turno } from "../enums/turno.enum";

@Component({
  selector: 'dados',
  templateUrl: './dados.component.html',
  styleUrls: ['./dados.component.css']
})
export class DadosComponent implements OnInit, OnDestroy {

  public jaPassouVez: boolean = false;
  public resultadoDado: number;

  public turno$ = this._storage.turno.asObservable();
  public resultadoAtaque$ = this._storage.resultadoAtaque.asObservable();
  
  private resultadoDadoSubject = new BehaviorSubject<number>(null);

  constructor(private _dadoService: DadoService,
              private _storage: StorageComponent) {
  }

  ngOnInit(): void {
    this.resultadoDadoSubject.subscribe(resultadoDado => {
      if (resultadoDado) {
        this._storage.efetuarAtaque(resultadoDado);
      }
    });

    if (this._storage.getTurno() === Turno.NPC) {
      this.rolar();
      this.jaPassouVez = true;
    }
  }

  ngOnDestroy(): void {
    this.resultadoDado = null;
    this.resultadoAtaque$ = null;
  }

  rolar() {
    this._dadoService.rolarDado(1, 20).pipe(take(1)).subscribe((resultado: [{ id: number, value: number }]) => {
      this.resultadoDado = resultado[0].value;
      this._setResultadoDado(this.resultadoDado);
    });
  }

  private _setResultadoDado(valor: number): void {
    this.resultadoDadoSubject.next(valor);
  }

  protected readonly Turno = Turno;
}
