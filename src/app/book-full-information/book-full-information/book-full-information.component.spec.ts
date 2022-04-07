import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookFullInformationComponent } from './book-full-information.component';

describe('BookFullInformationComponent', () => {
  let component: BookFullInformationComponent;
  let fixture: ComponentFixture<BookFullInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookFullInformationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookFullInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
