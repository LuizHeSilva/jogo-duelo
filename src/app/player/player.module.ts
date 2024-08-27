import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { DadosModule } from "../dados/dados.module";
import { DialogModule } from "../dialog-content/dialog.module";
import { RouletteModule } from "../roulette/roulette.module";
import { PlayerComponent } from "./player.component";

@NgModule({
    declarations: [PlayerComponent],
    imports: [
    CommonModule,
    RouletteModule,
    DadosModule,
    DialogModule
],
    exports: [PlayerComponent]
})
export class PlayerModule { }