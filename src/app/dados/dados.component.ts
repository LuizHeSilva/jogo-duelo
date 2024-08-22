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

  public turno: Turno;
  public jaPassouVez: boolean = false;
  public resultadoAtaque: string;
  public resultadoDado: number;
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

    if (this._storage.turno.value === Turno.NPC) {
      this.rolar();
      this.jaPassouVez = true;

      // timer(5000).subscribe(() => this._storage.trocarTurno());
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

    // if (!this.jaPassouVez) {
    //   this._storage.trocarTurno();
    // }
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
