import { Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { dialogAnimations } from '../dialog-content/dialog-animations';
import { DialogComponent } from "../dialog-content/dialog.component";
import { DialogConfigModel } from "../common/models/dialog-config.model";
import { StorageComponent } from '../storage/storage-component.service';
import { Turno } from '../common/enums/turno.enum';

@Component({
  selector: 'personagem',
  templateUrl: './personagem.component.html',
  styleUrls: ['./personagem.component.css'],
  animations: [dialogAnimations.bounceIn]
})
export class PersonagemComponent implements OnDestroy{

  @ViewChild('modal') private modalComponent: DialogComponent;

  modalConfig: DialogConfigModel;
  exibeDados$ = this._storage.exibirDados;

  constructor(private _storage: StorageComponent) {
  }

  ngOnDestroy(): void {
    this._storage.setExibirDados(false);
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

      this.exibeDados$.next(true);
      this._storage.setParteCorpo(parteDoCorpo);

      this._storage.setModalComponent(this.modalComponent);
      return this.modalComponent.open();
    } else {
      return null;
    }
  }

  showDados() {
    this._storage.setExibirDados(false);
  }

}
