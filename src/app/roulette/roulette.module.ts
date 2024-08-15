import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouletteComponent } from "./roulette.component";

@NgModule({
    declarations: [RouletteComponent],
    imports: [
        CommonModule,
    ],
    exports: [RouletteComponent]
})
export class RouletteModule { }
