import { Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { dialogAnimations } from '../dialog-content/dialog-animations';
import { DialogComponent } from "../dialog-content/dialog.component";
import { DialogConfigModel } from "../models/dialog-config.model";
import { StorageComponent } from '../storage/storage-component.service';
import { Turno } from '../enums/turno.enum';

@Component({
  selector: 'duel-controls',
  templateUrl: './duel-controls.component.html',
  styleUrls: ['./duel-controls.component.css'],
  animations: [dialogAnimations.bounceIn]
})
export class DuelControlsComponent implements OnInit, OnDestroy{

  @ViewChild('modal') private modalComponent: DialogComponent;

  modalConfig: DialogConfigModel;
  exibeDados: boolean;

  constructor(private _storage: StorageComponent) {
  }

  ngOnInit() {
    this._storage.exibirDados.subscribe(exibirDados => {
      this.exibeDados = exibirDados;
    })
  }

  ngOnDestroy(): void {
    this._storage.exibirDados.next(false);
    this.modalComponent.close();
  }

  openDialog(parteDoCorpo: string) {
    if (this._storage.turno.value === Turno.PLAYER) {
      this.modalConfig = {
        tituloDialog: `Atacando: ${parteDoCorpo}`,
        esconderBotaoFechar(): boolean {
          return true;
        },
        esconderBotaoCancelar(): boolean {
          return true;
        }
      }

      this.exibeDados = true;
      this._storage.setParteCorpo(parteDoCorpo);

      this._storage.setModalComponent(this.modalComponent);
      return this.modalComponent.open();
    } else {
      return null;
    }
  }

  showDados() {
    this._storage.exibirDados.next(false);
  }

}
