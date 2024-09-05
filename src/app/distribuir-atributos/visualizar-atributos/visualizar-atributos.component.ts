import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Personagem } from 'src/app/common/models/personagem.model';
import { StorageComponent } from 'src/app/storage/storage-component.service';

@Component({
  selector: 'visualizar-atributos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './visualizar-atributos.component.html',
  styleUrl: './visualizar-atributos.component.css'
})
export class VisualizarAtributosComponent {

  public personagem: Personagem;
  
  constructor(private _storage: StorageComponent){
    this.personagem = _storage.getPlayer();
  }

}
