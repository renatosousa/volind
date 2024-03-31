import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LongandshortComponent } from './longandshort.component';

describe('LongandshortComponent', () => {
  let component: LongandshortComponent;
  let fixture: ComponentFixture<LongandshortComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LongandshortComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LongandshortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
