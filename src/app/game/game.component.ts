import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { delay } from 'rxjs';
import { Turno } from "../common/enums/turno.enum";
import { Personagem } from '../common/models/personagem.model';
import { StorageComponent } from "../storage/storage-component.service";

@Component({
  selector: 'game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent implements OnInit {

  player: Personagem;
  npc: Personagem;

  turno: Turno;
  playerRecebeuDano: boolean;
  npcRecebeuDano: boolean;
  exibirBotaoReset: boolean = false;

  protected readonly Turno = Turno;

  constructor(public _storage: StorageComponent,
              private _ref: ChangeDetectorRef) {}

  ngOnInit(): void {
    this._storage.player.subscribe(player => {
      this.player = player;
    });

    this._storage.npc.subscribe(npc => {
      this.npc = npc;
    });

    this._storage.inicializarPersonagens();
    
    this._storage.turno.subscribe(turno => {
      this.turno = turno;
      this._ref.detectChanges();
    });

    this._storage.playerRecebeuDano.pipe(delay(2000)).subscribe(res => this.playerRecebeuDano = res);

    this._storage.npcRecebeuDano.pipe(delay(2000)).subscribe(res => this.npcRecebeuDano = res);

    this._storage.exibirBotaoReset.pipe(delay(2000)).subscribe(res => this.exibirBotaoReset = res);
  }

  mudarTurno() {
    this._storage.trocarTurno();
  }

}
