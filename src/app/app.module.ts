import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GameModule } from "./game/game.module";
import { HomeModule } from "./home/home.module";
import { SpriteModule } from "./sprite/sprite.module";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HomeModule,
    GameModule,
    SpriteModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
