import { Component, ViewChild } from '@angular/core';
import { Personagem } from '../models/personagem.model';
import { FormCriarPersonagens } from "../npc/npc-form.component";
import { DanoStorageComponent } from "../storage/dano-storage.component";
import { DialogConfigModel } from '../models/dialog-config.model';
import { DialogComponent } from '../dialog-content/dialog.component';

@Component({
  selector: 'game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent {

  @ViewChild('modal') private modalComponent: DialogComponent;

  player: Personagem = FormCriarPersonagens.criar();
  npc: Personagem = FormCriarPersonagens.criar();

  modalConfig: DialogConfigModel;

  constructor(public _danoStorage: DanoStorageComponent) {}

  efetuarAtaque(personagem: Personagem) {
    const parteDoCorpo = this._danoStorage.getParteCorpo();

    switch (parteDoCorpo) {
      case 'bracos':
        personagem.bracos -= 1;
        break;
      case 'pernas':
        personagem.pernas -= 1;
        break;
      case 'torso':
        personagem.torso -= 1;
        break;
      case 'cabeca':
        personagem.cabeca -= 1;
        break;
    }

    personagem.vida -= this.calcularDano(parteDoCorpo);

    if (personagem.vida <= 0) {
      
      this.modalConfig = {
        tituloDialog: 'Ataque',
        labelBotaoFechar: 'Atacar',
        labelBotaoCancelar: 'Fechar',
        esconderBotaoFechar(): boolean {return true;}
      }
      
      this.modalComponent.open();

      setTimeout(() => {
        this.resetGame();
      }, 5000);
    }
  }

  calcularDano(parteDoCorpo: string): number {
    switch (parteDoCorpo) {
      case 'bracos':
        return this._danoStorage.getDano();
      case 'pernas':
        return this._danoStorage.getDano();
      case 'torso':
        return this._danoStorage.getDano();
      case 'cabeca':
        return this._danoStorage.getDano();
      default:
        return 0;
    }
  }

  mudarTurno() {
    this._danoStorage.trocarTurno();
  }

  resetGame() {
    this.player = FormCriarPersonagens.criar();
    this.npc = FormCriarPersonagens.criar();
  }
}
