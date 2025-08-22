import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperiencesPageComponent } from './experiences-page.component';

describe('ExperiencesPageComponent', () => {
  let component: ExperiencesPageComponent;
  let fixture: ComponentFixture<ExperiencesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExperiencesPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExperiencesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
