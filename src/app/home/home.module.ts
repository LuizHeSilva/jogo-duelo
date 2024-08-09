import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {HomeComponent} from "./home.component";
import {RouterModule} from "@angular/router";

@NgModule({
    declarations: [HomeComponent],
    imports: [
        RouterModule.forChild([
            {path: 'home', component: HomeComponent}
        ]),
        CommonModule,
    ],
    bootstrap: [HomeComponent],
    exports: [HomeComponent]
})
export class HomeModule { }
