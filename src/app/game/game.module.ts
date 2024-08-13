import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";
import { DuelControlsModule } from '../duel-controls/duel-controls.module';
import { NpcModule } from '../npc/npc.module';
import { PlayerModule } from "../player/player.module";
import { GameComponent } from "./game.component";

@NgModule({
  declarations: [
    GameComponent,
  ],
  imports: [
    RouterModule.forChild([
        { path: '', component: GameComponent }
    ]),
    CommonModule,
    NpcModule,
    DuelControlsModule,
    PlayerModule
],
  exports: [GameComponent],
  providers: [],
})
export class GameModule {}
