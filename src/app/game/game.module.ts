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
import { DistribuidorAtributosComponent } from "../distribuir-atributos/distribuir-atributos.component";

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
    PlayerModule,
    DialogModule,
    DirectiveModule,
    SpriteModule,
    FimJogoModule,
    DistribuidorAtributosComponent
],
  exports: [GameComponent],
  providers: [],
})
export class GameModule {}
