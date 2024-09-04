import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { StorageComponent } from '../storage/storage-component.service';
import { Turno } from "../common/enums/turno.enum";

@Component({
  selector: 'distribuir-atributos',
  templateUrl: './distribuir-atributos.component.html',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['./distribuir-atributos.component.css']
})
export class DistribuidorAtributosComponent {

  pontosRestantes: number = 10;

  atributos: {[key: string]: {atual: number, total: number}};

  maxPontos: number = 10;

  constructor(private _storage: StorageComponent) {
    this.atributos = {'agilidade': {atual: 0, total: _storage.getPlayer().atributo.agilidade},
      'destreza': {atual: 0, total: _storage.getPlayer().atributo.destreza},
      'forca': {atual: 0, total: _storage.getPlayer().atributo.forca},
      'inteligencia': {atual: 0, total: _storage.getPlayer().atributo.inteligencia},
      'resistencia': {atual: 0, total: _storage.getPlayer().atributo.resistencia},
      'sorte': {atual: 0, total: _storage.getPlayer().atributo.sorte}}

  }

  distribuirPonto(atributo: string) {
    if (this.pontosRestantes > 0) {
      this.atributos[atributo].atual++;
      this.atributos[atributo].total++;
      this.pontosRestantes--;
    }
  }

  retirarPonto(atributo: string) {
    if (this.atributos[atributo].atual > 0) {
      this.atributos[atributo].atual--;
      this.atributos[atributo].total--;
      this.pontosRestantes++;
    }
  }

  continuar() {
    this.setAtributosDistribuidos();

    this._storage.setTurno(Turno.PLAYER);
  }

  private setAtributosDistribuidos() {
    this._storage.getPlayer().atributo.agilidade = this.atributos['agilidade'].total;
    this._storage.getPlayer().atributo.destreza = this.atributos['destreza'].total;
    this._storage.getPlayer().atributo.forca = this.atributos['forca'].total;
    this._storage.getPlayer().atributo.inteligencia = this.atributos['inteligencia'].total;
    this._storage.getPlayer().atributo.resistencia = this.atributos['resistencia'].total;
    this._storage.getPlayer().atributo.sorte = this.atributos['sorte'].total;
  }

  get atributoNames() {
    return Object.keys(this.atributos);
  }
}
