import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Personagem } from '../models/personagem.model';

@Component({
  selector: 'player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css'],
})

export class PlayerComponent {

  @Input() player: Personagem;
  @Output() attackEmit: EventEmitter<any> = new EventEmitter();

  exibeDados: boolean = false;

  public npcAtaque(evento: boolean) {
    this.exibeDados = evento;
  }

  atacar(parteDoCorpo: string) {
    this.attackEmit.emit(parteDoCorpo);
  }

}