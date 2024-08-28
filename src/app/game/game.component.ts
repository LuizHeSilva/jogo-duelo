import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Personagem } from '../models/personagem.model';
import { FormCriarPersonagens } from "../npc/npc-form.component";
import { StorageComponent } from "../storage/storage-component.service";
import { DialogConfigModel } from '../models/dialog-config.model';
import { DialogComponent } from '../dialog-content/dialog.component';
import { Turno } from "../enums/turno.enum";
import { delay, timer } from 'rxjs';

@Component({
  selector: 'game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent implements OnInit {

  player: Personagem = FormCriarPersonagens.criar();
  npc: Personagem = FormCriarPersonagens.criar();

  turno: Turno;
  playerRecebeuDano: boolean;
  npcRecebeuDano: boolean;
  exibirBotaoReset: boolean = false;

  protected readonly Turno = Turno;

  constructor(public _storage: StorageComponent,
              private _ref: ChangeDetectorRef) {}

  ngOnInit(): void {
    this._storage.inicializarPersonagens(this.npc, this.player);
    this._storage.turno.subscribe(turno => {
      this.turno = turno;
      this._ref.detectChanges();
    });

    this._storage.playerRecebeuDano.pipe(delay(2000))
      .subscribe(res => this.playerRecebeuDano = res);

    this._storage.npcRecebeuDano.pipe(delay(2000))
      .subscribe(res => this.npcRecebeuDano = res);

    this._storage.exibirBotaoReset.pipe(delay(2000))
      .subscribe(res => this.exibirBotaoReset = res);
  }

  mudarTurno() {
    this._storage.trocarTurno();
  }

}
