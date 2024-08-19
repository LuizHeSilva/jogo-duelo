import { Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { dialogAnimations } from '../dialog-content/dialog-animations';
import { DialogComponent } from "../dialog-content/dialog.component";
import { DialogConfigModel } from "../models/dialog-config.model";
import { StorageComponent } from '../storage/storage-component.service';

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
  }
  openDialog(parteDoCorpo: string) {
    this.modalConfig = {
      tituloDialog: 'Ataque',
      labelBotaoFechar: 'Atacar',
      labelBotaoCancelar: 'Fechar',
      esconderBotaoFechar(): boolean {
        return true;
      }
    }

    this.exibeDados = true;
    this._storage.setParteCorpo(parteDoCorpo);
    return this.modalComponent.open();
  }

  showDados() {
    this._storage.exibirDados.next(false);
  }

}
