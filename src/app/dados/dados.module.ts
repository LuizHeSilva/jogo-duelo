import { CommonModule } from "@angular/common";
import { provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { DirectiveModule } from "../common/directive/diretivas.module";
import { DadosComponent } from "./dados.component";
import { DadoService } from "./dados.service";

@NgModule({ declarations: [DadosComponent],
    exports: [DadosComponent], imports: [CommonModule,
        DirectiveModule], providers: [DadoService, provideHttpClient(withInterceptorsFromDi()),] })
export class DadosModule { }
