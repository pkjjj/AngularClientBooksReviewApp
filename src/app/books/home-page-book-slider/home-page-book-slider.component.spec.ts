import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePageBookSliderComponent } from './home-page-book-slider.component';

describe('HomePageBookSliderComponent', () => {
  let component: HomePageBookSliderComponent;
  let fixture: ComponentFixture<HomePageBookSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomePageBookSliderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePageBookSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
