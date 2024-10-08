import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { DialogConfigModel } from '../common/models/dialog-config.model';
import { Personagem } from '../common/models/personagem.model';
import { StorageComponent } from "../storage/storage-component.service";
import { DialogComponent } from '../dialog-content/dialog.component';
import { Turno } from '../common/enums/turno.enum';

@Component({
  selector: 'player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css'],
})

export class PlayerComponent implements OnInit, OnDestroy {

  @ViewChild('modal') private modalComponent: DialogComponent;

  modalConfig: DialogConfigModel;
  player: Personagem;

  exibirDados: boolean;

  constructor(private _storage: StorageComponent) {}

  ngOnInit() {
    this._storage.exibirDados.subscribe(exibirDados => {
      this.exibirDados = exibirDados;

      if (this._storage.turno.value === Turno.NPC) {
        this.openDialog(this._storage.getParteCorpo());
        this._storage.setModalComponent(this.modalComponent);
      }
    });

    this._storage.player.subscribe(player => {
      this.player = player;
    });
  }

  ngOnDestroy(): void {
    this.modalComponent.close();
    this.modalComponent = null;
  }

  openDialog(parteDoCorpo: string) {
    this.modalConfig = {
      tituloDialog: `Atacando: ${parteDoCorpo}`,
      esconderBotaoFechar(): boolean {
        return true;
      },
      esconderBotaoCancelar(): boolean {
        return true;
      }
    }
    return this.modalComponent.open();
  }

}
