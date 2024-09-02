import { Directive, HostListener } from '@angular/core';

@Directive({selector: '[umClick]'})
export class UmClickDirective {

  constructor() {
  }

  @HostListener('click', ['$event'])
  onClick(e: any) {
    e.preventDefault();
    e.stopPropagation();
    e.srcElement.setAttribute('disabled', true);
  }

}
