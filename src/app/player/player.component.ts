import { Component, Input } from '@angular/core';
import { Personagem } from '../models/personagem.model';

@Component({
  selector: 'player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css'],
})

export class PlayerComponent {
  @Input() player: Personagem;
}