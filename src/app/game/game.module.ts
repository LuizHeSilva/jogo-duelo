import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {DuelControlsModule} from '../duel-controls/duel-controls.module';
import {NpcModule} from '../npc/npc.module';
import {GameComponent} from "./game.component";
import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [
    GameComponent,
  ],
  imports: [
    RouterModule.forChild([
      {path: '', component: GameComponent}
    ]),
    CommonModule,
    NpcModule,
    DuelControlsModule,
  ],
  exports: [GameComponent],
  providers: [],
})
export class GameModule {}
