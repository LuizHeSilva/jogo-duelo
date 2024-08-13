import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { PlayerComponent } from "./player.component";
import { RouletteModule } from "../roulette/roulette.module";

@NgModule({
    declarations: [PlayerComponent],
    imports: [
    CommonModule,
    RouletteModule
],
    exports: [PlayerComponent]
})
export class PlayerModule { }