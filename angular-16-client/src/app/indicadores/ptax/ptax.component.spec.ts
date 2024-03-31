import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PtaxComponent } from './ptax.component';

describe('PtaxComponent', () => {
  let component: PtaxComponent;
  let fixture: ComponentFixture<PtaxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PtaxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PtaxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
