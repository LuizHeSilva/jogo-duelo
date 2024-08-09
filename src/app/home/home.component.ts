import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  highScore: number = 0;

  constructor(private router: Router) { }

  ngOnInit() {
    const storedHighScore = localStorage.getItem('highScore');
    this.highScore = storedHighScore ? parseInt(storedHighScore, 10) : 0;
  }

  startGame() {
    console.log('homecomponent init')
    this.router.navigate(['/game'])
  }
}
