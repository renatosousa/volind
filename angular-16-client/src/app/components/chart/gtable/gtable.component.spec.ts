import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GtableComponent } from './gtable.component';

describe('GtableComponent', () => {
  let component: GtableComponent;
  let fixture: ComponentFixture<GtableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GtableComponent]
    });
    fixture = TestBed.createComponent(GtableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
