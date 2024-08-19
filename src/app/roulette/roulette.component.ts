import { AfterViewInit, Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
import { StorageComponent } from "../storage/storage-component.service";

@Component({
  selector: 'roulette',
  templateUrl: './roulette.component.html',
  styleUrls: ['./roulette.component.css']
})
export class RouletteComponent implements OnDestroy, AfterViewInit {

  @Output() roletaParou: EventEmitter<boolean> = new EventEmitter();

  itens: string[] = ['cabeca', 'torso', 'bracos', 'pernas'];
  itemSelecionado: string | null = null;
  private sorteioSubscription: Subscription | null = null;

  constructor(private _storage: StorageComponent) {
  }

  ngAfterViewInit() {
    timer(1000).subscribe(() => this.iniciarSorteio());
  }

  iniciarSorteio() {
    const duracaoTotal = 3000;
    const intervalo = 100;
    const numItens = this.itens.length;

    let indice = 0;
    const giros = 10;
    const indiceFinal = Math.floor(Math.random() * numItens);

    this.itemSelecionado = null;

    if (this.sorteioSubscription) {
      this.sorteioSubscription.unsubscribe();
    }

    this.sorteioSubscription = timer(0, intervalo).pipe(
      takeWhile(() => {
        return Date.now() < Date.now() + duracaoTotal;
      })
    ).subscribe(() => {
      this.itemSelecionado = this.itens[indice % numItens];
      indice++;

      if (indice >= giros * numItens) {
        this.itemSelecionado = this.itens[indiceFinal];
        this._storage.setParteCorpo(this.itemSelecionado);
        this.roletaParou.emit(true);
        // remover emitter
        this._storage.roletaParou.next(true);

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
