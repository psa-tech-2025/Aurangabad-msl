import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SCHEMESComponent } from './schemes.component';

describe('SCHEMESComponent', () => {
  let component: SCHEMESComponent;
  let fixture: ComponentFixture<SCHEMESComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SCHEMESComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SCHEMESComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
