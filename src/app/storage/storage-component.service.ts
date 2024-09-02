import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, of, switchMap, timer } from "rxjs";
import { CriarPersonagens } from '../common/criarPersonagem.component';
import { Turno } from "../common/enums/turno.enum";
import { Ataque } from "../common/models/ataque.model";
import { Personagem } from "../common/models/personagem.model";
import { JsonService } from '../common/service/json.service';
import { DialogComponent } from '../dialog-content/dialog.component';

@Injectable({
  providedIn: 'root'
})
export class StorageComponent {

  public ataque: Ataque = {
    parteCorpo: '',
    dano: 0
  };

  public modalComponent: DialogComponent;

  public nomeJogador: BehaviorSubject<string> = new BehaviorSubject<string>('');

  public player: BehaviorSubject<Personagem> = new BehaviorSubject<Personagem>(null);
  public npc: BehaviorSubject<Personagem> = new BehaviorSubject<Personagem>(null);
  public turno: BehaviorSubject<Turno> = new BehaviorSubject<Turno>(Turno.PLAYER);

  public roletaParou: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public resultadoAtaque: BehaviorSubject<string> = new BehaviorSubject<string>('');
  public exibirDados: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public playerRecebeuDano: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public npcRecebeuDano: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public exibirBotaoReset: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  private limitesExperiencia: any[] = [];

  constructor(private _jsonService: JsonService) {
    this.roletaParou.subscribe(() => this.exibirDados.next(true));
    this.carregarLevels();
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

  setModalComponent(modalComponentParametro: DialogComponent) {
    this.modalComponent = modalComponentParametro;
  }

  getDano(): number {
    return this.ataque.dano;
  }

  getParteCorpo(): string {
    return this.ataque.parteCorpo;
  }

  public getNomeJogador(): string {
    return this.nomeJogador.getValue();
  }

  public setNomeJogador(value: string) {
    this.nomeJogador.next(value);
  }

  public getPlayer(): Personagem {
    return this.player.getValue();
  }

  public setPlayer(value: Personagem) {
    this.player.next(value);
  }

  public getNpc(): Personagem {
    return this.npc.getValue();
  }

  public setNpc(value: Personagem) {
    this.npc.next(value);
  }

  public getTurno(): Turno {
    return this.turno.getValue();
  }

  public setTurno(value: Turno) {
    this.turno.next(value);
  }

  public getRoletaParou(): boolean {
    return this.roletaParou.getValue();
  }

  public setRoletaParou(value: boolean) {
    this.roletaParou.next(value);
  }

  public getResultadoAtaque(): string {
    return this.resultadoAtaque.getValue();
  }

  public setResultadoAtaque(value: string) {
    this.resultadoAtaque.next(value);
  }

  public getExibirDados(): boolean {
    return this.exibirDados.getValue();
  }

  public setExibirDados(value: boolean) {
    this.exibirDados.next(value);
  }

  public getPlayerRecebeuDano(): boolean {
    return this.playerRecebeuDano.getValue();
  }

  public setPlayerRecebeuDano(value: boolean) {
    this.playerRecebeuDano.next(value);
  }

  public getNpcRecebeuDano(): boolean {
    return this.npcRecebeuDano.getValue();
  }

  public setNpcRecebeuDano(value: boolean) {
    this.npcRecebeuDano.next(value);
  }

  public getExibirBotaoReset(): boolean {
    return this.exibirBotaoReset.getValue();
  }

  public setExibirBotaoReset(value: boolean) {
    this.exibirBotaoReset.next(value);
  }

  inicializarPersonagens() {
    this.npc.next(CriarPersonagens.criar(this.nomeJogador.value));
    this.player.next(CriarPersonagens.criar(this.nomeJogador.value));
  }

  efetuarAtaque(resultadoDado: number) {
    this._regraAtaque(resultadoDado);

    const parteDoCorpo = this.getParteCorpo();
    let personagem: Personagem = null;

    if (this.turno.value === Turno.PLAYER) {
      personagem = this.npc.getValue();
    } else {
      personagem = this.player.getValue();
    }

    switch (parteDoCorpo) {
    case 'cabeca':
      personagem.cabeca -= 1;
      break;
    case 'torso':
      personagem.torso -= 1;
      break;
    case 'bracoDireito':
      personagem.bracoDireito -= 1;
      break;
    case 'bracoEsquerdo':
      personagem.bracoEsquerdo -= 1;
      break;
    case 'pernaDireita':
      personagem.pernaDireita -= 1;
      break;
    case 'pernaEsquerda':
      personagem.pernaEsquerda -= 1;
      break;
    }

    if (this.getDano() > 0) {
      personagem.vida -= this._calcularDano(parteDoCorpo);
      timer(500).subscribe(() => {
        if (this.turno.value === Turno.PLAYER) {
          this.npcRecebeuDano.next(true);
        } else {
          this.playerRecebeuDano.next(true);
        }
      });
    }

// TODO: metodo que valida final do jogo.
// adaptar o mesmo para finalizar o duelo e criar nova ação.
    this._verificarVidaPersonagem(personagem);

    timer(2000).subscribe(() => {
      this.modalComponent.close();
      this._posAtaque();
    });
  }

  private _verificarVidaPersonagem(personagem: Personagem) {
    if (personagem.vida <= 0) {
      timer(2000).subscribe(() => {
        this.setDano(0);
        this.exibirBotaoReset.next(true);
        this.turno.next(Turno.FIMJOGO);
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
        this._resultadoDoAtaque(resultadoDado, 1, 20);
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
      this.setDano(0);
    }
  }

  private _posAtaque() {
    if (!this.exibirBotaoReset.value) {
      timer(2000).subscribe(() => this.trocarTurno());
    }
    this.playerRecebeuDano.next(false);
    this.npcRecebeuDano.next(false);

//  TODO: passar variavel player para calcular corretamente.
    this.calcularLevel(0);
  }

  private carregarLevels(): Observable<void> {
    return this._jsonService.obterLimitesExperiencia().pipe(
      switchMap(limites => {
        this.limitesExperiencia = limites;
        return of(void 0);
      }),
      catchError(error => {
        console.error('Erro ao carregar limites de experiência', error);
        return of(void 0);
      })
    );
  }

  private calcularLevel(experiencia: number): number {
    for (let i = 0; i < this.limitesExperiencia.length; i++) {
      if (experiencia < this.limitesExperiencia[i]) {
        return i;
      }
    }
    return this.limitesExperiencia.length;
  }

}
