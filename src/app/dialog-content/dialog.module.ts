import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {DadosModule} from "../dados/dados.module";
import {DialogComponent} from "./dialog.component";
import {RouletteModule} from "../roulette/roulette.module";

@NgModule({
    declarations: [DialogComponent],
    imports: [
        CommonModule,
        DadosModule,
        RouletteModule
    ],
    exports: [DialogComponent]
})
export class DialogModule { }
