import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { HomeComponent } from "./home.component";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [HomeComponent],
  imports: [
    RouterModule.forChild([
      {path: '', component: HomeComponent}
    ]),
    CommonModule,
    FormsModule
  ],
  bootstrap: [HomeComponent],
  exports: [HomeComponent]
})
export class HomeModule {
}
