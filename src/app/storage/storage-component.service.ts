import { Injectable } from '@angular/core';
import { Ataque } from "../models/ataque.model";
import { BehaviorSubject, timer } from "rxjs";
import { Personagem } from "../models/personagem.model";
import { DialogConfigModel } from "../models/dialog-config.model";
import { Turno } from "../enums/turno.enum";

@Injectable({
  providedIn: 'root'
})
export class StorageComponent {

  public ataque: Ataque = {
    parteCorpo: '',
    dano: 0
  };

  modalConfig: DialogConfigModel;

  public player: BehaviorSubject<Personagem> = new BehaviorSubject<Personagem>(null);
  public npc: BehaviorSubject<Personagem> = new BehaviorSubject<Personagem>(null);
  public turno: BehaviorSubject<Turno> = new BehaviorSubject<Turno>(Turno.PLAYER);
  public roletaParou: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public resultadoAtaque: BehaviorSubject<string> = new BehaviorSubject<string>('');
  public exibirDados: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() {
    this.roletaParou.subscribe((value) => {
      this.exibirDados.next(true);
    });

    this.exibirDados.subscribe(exibir => {

    })
  }

  trocarTurno() {
    this.turno.next(this.turno.value === 'PLAYER' ? Turno.NPC : Turno.PLAYER);
  }

  setDano(valor: number) {
    this.ataque.dano = valor;
  }

  setParteCorpo(parteCorpo: string) {
    this.ataque.parteCorpo = parteCorpo;
  }

  getDano(): number {
    return this.ataque.dano;
  }

  getParteCorpo(): string {
    return this.ataque.parteCorpo;
  }

  inicializarPersonagens(npc: Personagem, player: Personagem) {
    this.npc.next(npc);
    this.player.next(player);
  }

  efetuarAtaque(resultadoDado: number) {
    this._regraAtaque(resultadoDado);

    const parteDoCorpo = this.getParteCorpo();
    let personagem: Personagem = null;

    if (this.turno.value === Turno.PLAYER) {
      personagem = this.player.getValue();
    } else {
      personagem = this.npc.getValue();
    }

    console.log('Turno: ', this.turno.value, ' - Corpo: ', parteDoCorpo, ' -  personagem: ', personagem);

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

    personagem.vida -= this._calcularDano(parteDoCorpo);

    this._verificarVidaPersonagem(personagem);
  }

  private _verificarVidaPersonagem(personagem: Personagem) {
    if (personagem.vida <= 0) {

      this.modalConfig = {
        tituloDialog: 'Ataque',
        labelBotaoFechar: 'Atacar',
        labelBotaoCancelar: 'Fechar',
        esconderBotaoFechar(): boolean {
          return true;
        }
      }

      timer(2000).subscribe(() => {
        this.setDano(0);
        // TODO: implementar...
        // this.exibirBotaoReset = true;
      });
    }
  }

  private _calcularDano(parteDoCorpo: string): number {
    switch (parteDoCorpo) {
      case 'bracos':
        return this.getDano();
      case 'pernas':
        return this.getDano();
      case 'torso':
        return this.getDano();
      case 'cabeca':
        return this.getDano();
      default:
        return 0;
    }
  }

  private _regraAtaque(resultadoDado: number) {
    switch (this.getParteCorpo()) {
      case 'cabeca':
        this._resultadoDoAtaque(resultadoDado, 18, 20);
        break;
      case 'torso':
        this._resultadoDoAtaque(resultadoDado, 12, 10);
        break;
      case 'bracos':
        this._resultadoDoAtaque(resultadoDado, 15, 10);
        break;
      case 'pernas':
        this._resultadoDoAtaque(resultadoDado, 10, 5);
        break;
    }
  }

  private _resultadoDoAtaque(resultadoDado: number, dificuldade: number, dano: number): void {
    if (resultadoDado >= dificuldade) {
      this.resultadoAtaque.next('TÁ PORRA! ACERTOU NA CAGADA! ( ˶°ㅁ°) !!');
      this.setDano(dano);
    } else {
      this.resultadoAtaque.next('O óbvio aconteceu... vc errou! ദ്ദി ༎ຶ‿༎ຶ )');
    }
  }

}
