import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlowerMakingComponent } from './flower-making.component';

describe('FlowerMakingComponent', () => {
  let component: FlowerMakingComponent;
  let fixture: ComponentFixture<FlowerMakingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlowerMakingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlowerMakingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
