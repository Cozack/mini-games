import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SquaresSettingsComponent } from './squares-settings.component';

describe('SquaresSettingsComponent', () => {
  let component: SquaresSettingsComponent;
  let fixture: ComponentFixture<SquaresSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SquaresSettingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SquaresSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
