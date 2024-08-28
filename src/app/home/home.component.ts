import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageComponent } from '../storage/storage-component.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  highScore: number = 0;
  exibirInputNome: boolean = false;
  nomeJogador: string = '';

  constructor(private router: Router,
              private _storage: StorageComponent) { }

  ngOnInit() {
    const storedHighScore = localStorage.getItem('highScore');
    this.highScore = storedHighScore ? parseInt(storedHighScore, 10) : 0;
  }

  iniciarJogo() {
    this.exibirInputNome = true;
  }

  redirecionar() {
    this._storage.setNomeJogador(this.nomeJogador);
    this.router.navigate(['/game']);
  }

}
