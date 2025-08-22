import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventWizardComponent } from './event-wizard.component';

describe('EventWizardComponent', () => {
  let component: EventWizardComponent;
  let fixture: ComponentFixture<EventWizardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventWizardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventWizardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
