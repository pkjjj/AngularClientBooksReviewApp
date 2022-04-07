import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WrittingReviewComponent } from './writting-review.component';

describe('WrittingReviewComponent', () => {
  let component: WrittingReviewComponent;
  let fixture: ComponentFixture<WrittingReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WrittingReviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WrittingReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
