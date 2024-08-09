import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'roulette',
  templateUrl: './roulette.component.html',
  styleUrls: ['./roulette.component.scss']
})
export class RouletteComponent implements OnInit{
  public result: string = '';
  public sectors: string[] = ['Cabeça', 'Torso', 'Braços', 'Pernas'];
  public sectorAngle: number = 360 / this.sectors.length;

  ngOnInit(): void {
    this.girar();
  }

  public girar(): void {
    // Gira a roleta entre 1000ms a 3000ms
    const spinDuration = Math.floor(Math.random() * (3000 - 1000 + 1)) + 1000;
    const randomIndex = Math.floor(Math.random() * this.sectors.length);
    const rotationDegree = 360 * 5 + randomIndex * this.sectorAngle; // 5 voltas para garantir um giro completo

    const rouletteElement = document.querySelector('.roulette') as HTMLElement;
    if (rouletteElement) {
      rouletteElement.style.transition = `transform ${spinDuration}ms ease-out`;
      rouletteElement.style.transform = `rotate(${rotationDegree}deg)`;
      
      // Espera o tempo de animação terminar e então define o resultado
      setTimeout(() => {
        this.result = this.sectors[randomIndex];
        rouletteElement.style.transition = 'none';
        rouletteElement.style.transform = `rotate(${randomIndex * this.sectorAngle}deg)`;
      }, spinDuration);
    }
  }
}
