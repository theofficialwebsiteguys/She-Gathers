import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandleMakingComponent } from './candle-making.component';

describe('CandleMakingComponent', () => {
  let component: CandleMakingComponent;
  let fixture: ComponentFixture<CandleMakingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CandleMakingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CandleMakingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
