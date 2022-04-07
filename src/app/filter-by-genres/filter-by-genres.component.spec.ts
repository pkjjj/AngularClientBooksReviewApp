import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterByGenresComponent } from './filter-by-genres.component';

describe('FilterByGenresComponent', () => {
  let component: FilterByGenresComponent;
  let fixture: ComponentFixture<FilterByGenresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterByGenresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterByGenresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
