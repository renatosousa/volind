import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VolatividadeComponent } from './volatividade.component';

describe('VolatividadeComponent', () => {
  let component: VolatividadeComponent;
  let fixture: ComponentFixture<VolatividadeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VolatividadeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VolatividadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
