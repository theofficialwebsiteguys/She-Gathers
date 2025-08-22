import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaintNightComponent } from './paint-night.component';

describe('PaintNightComponent', () => {
  let component: PaintNightComponent;
  let fixture: ComponentFixture<PaintNightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaintNightComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaintNightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
