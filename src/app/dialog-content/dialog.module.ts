import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouletteModule } from "../roulette/roulette.module";
import { DialogComponent } from "./dialog.component";

@NgModule({
    declarations: [DialogComponent],
    imports: [
        CommonModule,
        RouletteModule
    ],
    exports: [DialogComponent]
})
export class DialogModule { }
