import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistribuirAtributosComponent } from './distribuir-atributos.component';

describe('DistribuirAtributosComponent', () => {
  let component: DistribuirAtributosComponent;
  let fixture: ComponentFixture<DistribuirAtributosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DistribuirAtributosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DistribuirAtributosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
