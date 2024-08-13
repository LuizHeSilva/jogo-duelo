import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { dialogAnimations } from '../dialog-content/dialog-animations';
import { DialogComponent } from "../dialog-content/dialog.component";
import { DialogConfigModel } from "../models/dialog-config.model";
import { DanoStorageComponent } from '../storage/dano-storage.component';

@Component({
  selector: 'duel-controls',
  templateUrl: './duel-controls.component.html',
  styleUrls: ['./duel-controls.component.css'],
  animations: [dialogAnimations.bounceIn]
})
export class DuelControlsComponent {

  @Output() attackEmit: EventEmitter<any> = new EventEmitter();
  @ViewChild('modal') private modalComponent: DialogComponent;

  modalConfig: DialogConfigModel;
  exibeDados = false;

  constructor(private _storage: DanoStorageComponent){}
  
  openDialog(parteDoCorpo: string) {
    this.modalConfig = {
      tituloDialog: 'Ataque',
      labelBotaoFechar: 'Atacar',
      labelBotaoCancelar: 'Fechar',
      esconderBotaoFechar(): boolean {return true;}
    }
    
    this.exibeDados = true;
    this._storage.setParteCorpo(parteDoCorpo);
    return this.modalComponent.open();
  }

  showDados() {
    this.exibeDados = false;
  }

  atacar(parteDoCorpo: string) {
    this.attackEmit.emit(parteDoCorpo);
  }

}
