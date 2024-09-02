import {Component, Input} from '@angular/core';
import { Personagem } from '../common/models/personagem.model';

@Component({
  selector: 'npc',
  templateUrl: './npc.component.html',
  styleUrls: ['./npc.component.css'],
})
export class NpcComponent {

  @Input() npc: Personagem;

}
