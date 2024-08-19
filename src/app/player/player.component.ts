import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Personagem } from '../models/personagem.model';
import { StorageComponent } from "../storage/storage-component.service";

@Component({
  selector: 'player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css'],
})

export class PlayerComponent implements OnInit {

  @Input() player: Personagem;
  @Output() attackEmit: EventEmitter<any> = new EventEmitter();

  exibirDados: boolean;

  constructor(private _storage: StorageComponent) {
  }

  ngOnInit() {
    this._storage.exibirDados.subscribe(exibirDados => {
      this.exibirDados = exibirDados;
    })
  }

}
