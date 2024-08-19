import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Personagem } from '../models/personagem.model';
import { FormCriarPersonagens } from "../npc/npc-form.component";
import { StorageComponent } from "../storage/storage-component.service";
import { DialogConfigModel } from '../models/dialog-config.model';
import { DialogComponent } from '../dialog-content/dialog.component';
import { Turno } from "../enums/turno.enum";

@Component({
  selector: 'game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent implements OnInit {

  @ViewChild('modal') private modalComponent: DialogComponent;

  player: Personagem = FormCriarPersonagens.criar();
  npc: Personagem = FormCriarPersonagens.criar();
  exibirBotaoReset: boolean = false;

  modalConfig: DialogConfigModel;

  turno: Turno;

  constructor(public _storage: StorageComponent,
              private _ref: ChangeDetectorRef) {}

  ngOnInit(): void {
    this._storage.inicializarPersonagens(this.npc, this.player);
    this._storage.turno.subscribe(turno => {
      this.turno = turno;
      this._ref.detectChanges();
    });
  }

  mudarTurno() {
    this._storage.trocarTurno();
  }

  resetGame() {
    this.player = FormCriarPersonagens.criar();
    this.npc = FormCriarPersonagens.criar();
    this.modalComponent.close()
  }

  protected readonly Turno = Turno;
}
