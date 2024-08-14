import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { PlayerComponent } from "./player.component";
import { RouletteModule } from "../roulette/roulette.module";
import { DadosModule } from "../dados/dados.module";

@NgModule({
    declarations: [PlayerComponent],
    imports: [
    CommonModule,
    RouletteModule,
    DadosModule
],
    exports: [PlayerComponent]
})
export class PlayerModule { }