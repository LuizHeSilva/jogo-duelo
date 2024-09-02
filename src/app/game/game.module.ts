import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";
import { DuelControlsModule } from '../duel-controls/duel-controls.module';
import { NpcModule } from '../npc/npc.module';
import { PlayerModule } from "../player/player.module";
import { GameComponent } from "./game.component";
import { DialogModule } from '../dialog-content/dialog.module';
import {DirectiveModule} from "../common/directive/diretivas.module";
import { SpriteModule } from "../sprite/sprite.module";
import { FimJogoModule } from "../fim-jogo/fim-jogo.module";

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
    PlayerModule,
    DialogModule,
    DirectiveModule,
    SpriteModule,
    FimJogoModule
  ],
  exports: [GameComponent],
  providers: [],
})
export class GameModule {}
