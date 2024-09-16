import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'sprite',
  templateUrl: './sprite.component.html',
  styleUrls: ['./sprite.component.css']
})
export class SpriteComponent implements OnInit {

  @Input() spriteWidth: number = 16;
  @Input() spriteHeight: number = 16;
  @Input() frameCount: number = 10;

  spriteStyle = {};

  ngOnInit() {
    this.spriteStyle = {
      width: `${this.spriteWidth}px`,
      height: `${this.spriteHeight}px`,
      backgroundImage: 'url(/assets/cowboy2.png)',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: '0 0',
      animation: `play 1s steps(${this.frameCount}) infinite`
    };
  }
}
