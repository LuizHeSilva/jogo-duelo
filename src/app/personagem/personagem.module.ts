import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { PersonagemComponent } from "./personagem.component";
import { DialogModule } from "../dialog-content/dialog.module";
import { DadosModule } from "../dados/dados.module";

@NgModule({
  declarations: [PersonagemComponent],
  imports: [
    CommonModule,
    DialogModule,
    DadosModule
  ],
  exports: [PersonagemComponent],
  providers: [],
})
export class PersonagemModule { }
