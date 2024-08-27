import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Personagem } from '../models/personagem.model';
import { FormCriarPersonagens } from "../npc/npc-form.component";
import { StorageComponent } from "../storage/storage-component.service";
import { DialogConfigModel } from '../models/dialog-config.model';
import { DialogComponent } from '../dialog-content/dialog.component';
import { Turno } from "../enums/turno.enum";
import { timer } from 'rxjs';

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

    this._storage.playerRecebeuDano.subscribe(res => {
      timer(2000).subscribe(() => this.playerRecebeuDano = res);
    });
    
    this._storage.npcRecebeuDano.subscribe(res => {
      timer(2000).subscribe(() => this.npcRecebeuDano = res);
    });
    
    this._storage.exibirBotaoReset.subscribe(res => {
      timer(2000).subscribe(() => this.exibirBotaoReset = res);
    });

  }

  mudarTurno() {
    this._storage.trocarTurno();
  }

  resetGame() {
    this.player = FormCriarPersonagens.criar();
    this.npc = FormCriarPersonagens.criar();
    this._storage.exibirBotaoReset.next(false);
  }

}
