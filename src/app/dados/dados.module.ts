import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { DirectiveModule } from "../directive/diretivas.module";
import { DadosComponent } from "./dados.component";
import { DadoService } from "./dados.service";

@NgModule({
    declarations: [DadosComponent],
    imports: [
        CommonModule,
        HttpClientModule,
        DirectiveModule,
    ],
    exports: [DadosComponent],
    providers: [DadoService,]
})
export class DadosModule { }
