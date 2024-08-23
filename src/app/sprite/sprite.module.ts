import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SpriteComponent } from "./sprite.component";

@NgModule({
    declarations: [SpriteComponent],
    imports: [
        CommonModule,
    ],
    exports: [SpriteComponent]
})
export class SpriteModule { }
