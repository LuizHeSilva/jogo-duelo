import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { StorageComponent } from '../storage/storage-component.service';
import { Turno } from "../common/enums/turno.enum";
import { VisualizarAtributosComponent } from "./visualizar-atributos/visualizar-atributos.component";

@Component({
  selector: 'distribuir-atributos',
  templateUrl: './distribuir-atributos.component.html',
  standalone: true,
  imports: [CommonModule, VisualizarAtributosComponent],
  styleUrls: ['./distribuir-atributos.component.css']
})
export class DistribuidorAtributosComponent {

  pontosRestantes: number = 4;
  maxPontos: number = 4;

  atributos: {[key: string]: {atual: number, total: number}};

  constructor(private _storage: StorageComponent) {
    this.atributos = {
      'destreza': {atual: 0, total: _storage.getPlayer().atributo.destreza},
      'forca': {atual: 0, total: _storage.getPlayer().atributo.forca},
      'resistencia': {atual: 0, total: _storage.getPlayer().atributo.resistencia},
      // 'agilidade': {atual: 0, total: _storage.getPlayer().atributo.agilidade},
      // 'inteligencia': {atual: 0, total: _storage.getPlayer().atributo.inteligencia},
      // 'sorte': {atual: 0, total: _storage.getPlayer().atributo.sorte}
      }
  }

  distribuirPonto(atributo: string) {
    if (this.pontosRestantes > 0) {
      this.atributos[atributo].atual++;
      this.atributos[atributo].total++;
      this.pontosRestantes--;
      this.regraDistribuicaoAtributos(atributo);
    }
  }

  regraDistribuicaoAtributos(atributo: string) {
    switch (atributo) {
      case ('resistencia'):
        this._storage.getPlayer().vida = this._storage.getPlayer().vidaBase + (this.atributos['resistencia'].total / 2);
        break;
      case ('destreza'):
        this._storage.getPlayer().atributo.modificadorDado = this.atributos['destreza'].total / 100;
        break;
      case ('forca'):
        this._storage.getPlayer().atributo.modificadorDano = this.atributos['forca'].total / 10;
        break;
    }
  }

  retirarPonto(atributo: string) {
    if (this.atributos[atributo].atual > 0) {
      this.atributos[atributo].atual--;
      this.atributos[atributo].total--;
      this.pontosRestantes++;
    }
  }

  teste() {
    this.setAtributosDistribuidos();
    this._storage.setTurno(Turno.ESCOLHA);
  }

  continuar() {
    this.setAtributosDistribuidos();

    this._storage.setTurno(Turno.PLAYER);
  }

  private setAtributosDistribuidos() {
    this._storage.getPlayer().atributo.destreza = this.atributos['destreza'].total;
    this._storage.getPlayer().atributo.forca = this.atributos['forca'].total;
    this._storage.getPlayer().atributo.resistencia = this.atributos['resistencia'].total;
    // this._storage.getPlayer().atributo.agilidade = this.atributos['agilidade'].total;
    // this._storage.getPlayer().atributo.inteligencia = this.atributos['inteligencia'].total;
    // this._storage.getPlayer().atributo.sorte = this.atributos['sorte'].total;
  }

  get atributoNames() {
    return Object.keys(this.atributos);
  }
}
