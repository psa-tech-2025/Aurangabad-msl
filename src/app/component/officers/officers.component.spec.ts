import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OFFICERSComponent } from './officers.component';

describe('OFFICERSComponent', () => {
  let component: OFFICERSComponent;
  let fixture: ComponentFixture<OFFICERSComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OFFICERSComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OFFICERSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
