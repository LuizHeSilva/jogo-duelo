import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { NpcComponent } from "./npc.component";

@NgModule({
    declarations: [NpcComponent],
    imports: [
        CommonModule,
    ],
    providers: [],
    bootstrap: [NpcComponent],
    exports: [NpcComponent]
})
export class NpcModule { }