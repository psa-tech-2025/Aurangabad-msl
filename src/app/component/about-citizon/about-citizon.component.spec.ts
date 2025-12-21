import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutCitizonComponent } from './about-citizon.component';

describe('AboutCitizonComponent', () => {
  let component: AboutCitizonComponent;
  let fixture: ComponentFixture<AboutCitizonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutCitizonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutCitizonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
