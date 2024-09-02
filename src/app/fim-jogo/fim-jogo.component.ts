import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Turno } from "../common/enums/turno.enum";
import { StorageComponent } from "../storage/storage-component.service";

@Component({
  selector: 'fim-jogo',
  templateUrl: './fim-jogo.component.html',
  styleUrl: './fim-jogo.component.css'
})
export class FimJogoComponent implements OnInit {

  vencedor: string = '';

  constructor(public _storage: StorageComponent,
              private router: Router,
              private _ref: ChangeDetectorRef) {}

  ngOnInit(): void {
    this._storage.turno.subscribe(turno => {
      this._ref.detectChanges();
    });

    this.vencedor = this._storage.turno.value === Turno.PLAYER ? 'NPC' : 'Jogador';
  }

  restartGame() {
    this.router.navigate(['/home']);
    this._storage.inicializarPersonagens();
    this._storage.turno.next(Turno.PLAYER);
  }

}
