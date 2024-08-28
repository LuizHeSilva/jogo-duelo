import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { StorageComponent } from "../storage/storage-component.service";
import { FormCriarPersonagens } from "../npc/npc-form.component";
import { Turno } from "../enums/turno.enum";

@Component({
  selector: 'fim-jogo',
  templateUrl: './fim-jogo.component.html',
  styleUrl: './fim-jogo.component.css'
})
export class FimJogoComponent implements OnInit {

  vencedor: string = '';

  constructor(public _storage: StorageComponent,
              private _ref: ChangeDetectorRef) {}

  ngOnInit(): void {
    this._storage.turno.subscribe(turno => {
      this._ref.detectChanges();
    });

    this.vencedor = this._storage.turno.value === Turno.PLAYER ? 'NPC' : 'Jogador';
  }

  restartGame() {
    this._storage.player.next(FormCriarPersonagens.criar());
    this._storage.npc.next(FormCriarPersonagens.criar());
    this._storage.turno.next(Turno.PLAYER);
  }

}
