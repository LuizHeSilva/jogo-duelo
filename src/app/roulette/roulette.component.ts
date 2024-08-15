import {AfterViewInit, Component, EventEmitter, OnDestroy, Output} from '@angular/core';
import {Subscription, timer} from 'rxjs';
import {takeWhile} from 'rxjs/operators';
import {DanoStorageComponent} from "../storage/dano-storage.component";

@Component({
  selector: 'roulette',
  templateUrl: './roulette.component.html',
  styleUrls: ['./roulette.component.css']
})
export class RouletteComponent implements OnDestroy, AfterViewInit  {

  @Output() roletaParou: EventEmitter<boolean> = new EventEmitter();

  itens: string[] = ['cabeca', 'torso', 'braco', 'perna'];
  itemSelecionado: string | null = null;
  private sorteioSubscription: Subscription | null = null;

  constructor(private _storage: DanoStorageComponent){}

  ngAfterViewInit() {
    timer(1000).subscribe(() => this.iniciarSorteio());
  }

  iniciarSorteio() {
    const duracaoTotal  = 3000; // Duração total do sorteio em milissegundos
    const intervalo  = 100; // Tempo de intervalo em milissegundos
    const numItens  = this.itens.length;

    let indice = 0;
    const giros = 10; //  Número de giros antes de parar
    const indiceFinal = Math.floor(Math.random() * numItens ); // Item aleatório para terminar

    this.itemSelecionado = null;

    if (this.sorteioSubscription) {
      this.sorteioSubscription.unsubscribe();
    }

    this.sorteioSubscription = timer(0, intervalo ).pipe(
      takeWhile(() => {
        // Continue enquanto estiver girando
        return Date.now() < Date.now() + duracaoTotal ;
      })
    ).subscribe(() => {
      this.itemSelecionado = this.itens[indice % numItens ];
      indice++;

      // Parar de girar após um número de giros
      if (indice >= giros * numItens ) {
        this.itemSelecionado = this.itens[indiceFinal];
        this._storage.setParteCorpo(this.itemSelecionado);
        this.roletaParou.emit(true);

        this.sorteioSubscription.unsubscribe();
      }
    });
  }

  ngOnDestroy() {
    if (this.sorteioSubscription) {
      this.sorteioSubscription.unsubscribe();
    }
  }
}
