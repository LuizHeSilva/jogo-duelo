import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, take } from 'rxjs';
import { Turno } from "../enums/turno.enum";
import { StorageComponent } from '../storage/storage-component.service';
import { DadoService } from './dados.service';

@Component({
  selector: 'dados',
  templateUrl: './dados.component.html',
  styleUrls: ['./dados.component.css']
})
export class DadosComponent implements OnInit, OnDestroy {

  public turno: Turno;
  public resultadoAtaque: string;
  public resultadoDado: number;
  private resultadoDadoSubject = new BehaviorSubject<number>(null);
  protected readonly Turno = Turno;

  constructor(private _dadoService: DadoService,
              private _storage: StorageComponent) {
  }

  ngOnInit(): void {
    this.resultadoDadoSubject.subscribe(resultadoDado => {
      if (resultadoDado) {
        this._storage.efetuarAtaque(resultadoDado);
      }
    });

    if (this._storage.turno.value === Turno.NPC) {
      this.rolar();
    }

    this._storage.resultadoAtaque.subscribe(resultado => {
      this.resultadoAtaque = resultado;
    });

    this._storage.turno.subscribe(turno => {
      this.turno = turno;
    });
  }

  ngOnDestroy(): void {
    this.resultadoDado = null;
    this.resultadoAtaque = null;
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

}
