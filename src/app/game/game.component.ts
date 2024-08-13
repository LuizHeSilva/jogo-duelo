import { Component } from '@angular/core';
import { Personagem } from '../models/personagem.model';
import { FormCriarPersonagens } from "../npc/npc-form.component";
import { DanoStorageComponent } from "../storage/dano-storage.component";

@Component({
  selector: 'game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent {

  player: Personagem = FormCriarPersonagens.criar();
  npc: Personagem = FormCriarPersonagens.criar();

  constructor(public _danoStorage: DanoStorageComponent) {}

  efetuarAtaque(parteDoCorpo: string) {
    this._danoStorage.setParteCorpo(parteDoCorpo);

    switch (parteDoCorpo) {
      case 'bracos':
        this.npc.bracos -= 1;
        break;
      case 'pernas':
        this.npc.pernas -= 1;
        break;
      case 'torso':
        this.npc.torso -= 1;
        break;
      case 'cabeca':
        this.npc.cabeca -= 1;
        break;
    }

    this.npc.vida -= this.calcularDano(parteDoCorpo);

    if (this.npc.vida <= 0) {
      alert('Você venceu!');
      this.resetGame();
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

  resetGame() {
    this.player = {
      nome: 'Jogador',
      vida: 100,
      bracos: 2,
      pernas: 2,
      torso: 1,
      cabeca: 1,
    };

    this.npc = {
      nome: 'NPC',
      vida: 100,
      bracos: 2,
      pernas: 2,
      torso: 1,
      cabeca: 1,
    };
  }
}
