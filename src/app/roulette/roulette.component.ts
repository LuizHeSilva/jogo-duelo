import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {Subscription, timer} from 'rxjs';
import {takeWhile} from 'rxjs/operators';

@Component({
  selector: 'roulette',
  templateUrl: './roulette.component.html',
  styleUrls: ['./roulette.component.scss']
})
export class RouletteComponent implements OnInit, OnDestroy {

  @Output() roletaParou: EventEmitter<boolean> = new EventEmitter();

  items: string[] = ['cabeca', 'torso', 'braco', 'perna'];
  selectedItem: string | null = null;
  private drawSubscription: Subscription | null = null;

  ngOnInit() {}

  startDraw() {
    let index = 0;
    this.selectedItem = null;
    if (this.drawSubscription) {
      this.drawSubscription.unsubscribe();
    }
    this.drawSubscription = timer(0, 100).pipe(takeWhile(() => index < this.items.length * 10)).subscribe(() => {
      this.selectedItem = this.items[index % this.items.length];
      index++;
    });
  }

  ngOnDestroy() {
    if (this.drawSubscription) {
      this.drawSubscription.unsubscribe();
    }
  }

}
