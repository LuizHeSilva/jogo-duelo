import {Component, EventEmitter, Output, ViewChild} from '@angular/core';
import {dialogAnimations} from '../dialog-content/dialog-animations';
import {DialogConfigModel} from "../models/dialog-config.model";
import {DialogComponent} from "../dialog-content/dialog.component";

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
  
  async openDialog(parteDoCorpo: string) {
    this.modalConfig = {
      tituloDialog: 'Ataque',
      labelBotaoFechar: 'Atacar',
      labelBotaoCancelar: 'Desistir',
      esconderBotaoFechar(): boolean {
        return true;}
    }
    this.atacar(parteDoCorpo);
    return await this.modalComponent.open();
  }

  atacar(parteDoCorpo: string) {
    this.attackEmit.emit(parteDoCorpo);
  }
}
