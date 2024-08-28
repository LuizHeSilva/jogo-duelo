import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { DialogConfigModel } from '../models/dialog-config.model';
import { Personagem } from '../models/personagem.model';
import { StorageComponent } from "../storage/storage-component.service";
import { DialogComponent } from '../dialog-content/dialog.component';
import { Turno } from '../enums/turno.enum';

@Component({
  selector: 'player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css'],
})

export class PlayerComponent implements OnInit, OnDestroy {

  @Input() player: Personagem;
  @Output() attackEmit: EventEmitter<any> = new EventEmitter();

  @ViewChild('modal') private modalComponent: DialogComponent;

  modalConfig: DialogConfigModel;
  exibirDados: boolean;

  constructor(private _storage: StorageComponent) {
  }

  ngOnInit() {
    this._storage.exibirDados.subscribe(exibirDados => {
      this.exibirDados = exibirDados;

      if (this._storage.turno.value === Turno.NPC) {
        this.openDialog(this._storage.getParteCorpo());
        this._storage.setModalComponent(this.modalComponent);
      }
    })
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
