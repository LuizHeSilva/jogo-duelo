import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";
import { FimJogoComponent } from "./fim-jogo.component";

@NgModule({
  declarations: [
    FimJogoComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [FimJogoComponent],
  providers: [],
})
export class FimJogoModule {}
