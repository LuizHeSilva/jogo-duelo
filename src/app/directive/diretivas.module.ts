import { NgModule } from "@angular/core";
import { UmClickDirective } from "./um-click.directive";

@NgModule({
    declarations: [UmClickDirective],
    exports: [UmClickDirective]
})
export class DirectiveModule { }