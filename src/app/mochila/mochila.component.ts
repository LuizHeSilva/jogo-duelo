import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'mochila',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mochila.component.html',
  styleUrl: './mochila.component.css'
})
export class MochilaComponent {

  itens: (string | null)[] = Array(25).fill(null);

  // Adicionando um item na mochila
  adicionarItem(item: string) {
    const index = this.itens.findIndex(i => i === null);
    if (index !== -1) {
      this.itens[index] = item;
    }
  }

  // Removendo um item da mochila
  removerItem(index: number) {
    this.itens[index] = null;
  }

}