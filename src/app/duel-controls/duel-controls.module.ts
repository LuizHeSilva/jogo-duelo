import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { DuelControlsComponent } from "./duel-controls.component";
import { DialogModule } from "../dialog-content/dialog.module";
import {DadosModule} from "../dados/dados.module";

@NgModule({
  declarations: [DuelControlsComponent],
  imports: [
    CommonModule,
    DialogModule,
    DadosModule
  ],
  exports: [DuelControlsComponent],
  providers: [],
})
export class DuelControlsModule { }
