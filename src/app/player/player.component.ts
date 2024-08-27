import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { DialogConfigModel } from '../models/dialog-config.model';
import { Personagem } from '../models/personagem.model';
import { StorageComponent } from "../storage/storage-component.service";
import { DialogComponent } from '../dialog-content/dialog.component';

@Component({
  selector: 'player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css'],
})

export class PlayerComponent implements OnInit {

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

      this.openDialog(this._storage.getParteCorpo());
      this._storage.setModalComponent(this.modalComponent);
    })
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
