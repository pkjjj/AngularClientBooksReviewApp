import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {

  @Input() public rating: number;
  @Input() public backgroundColor: string;
  public countStars: number[];
  public remainingStars: number[];
  public readonly maxRating = 10;

  constructor() {}

  ngOnInit() {
    this.rating = Math.round(this.rating);
    this.fillArray();
    this.getCountRemainingStars();
  }

  public fillArray() {
    this.countStars = Array.from({ length: this.rating }, (_, i) => i + 1);
  }

  public getCountRemainingStars() {
    const countRemainingStars = this.maxRating - this.rating;
    if (countRemainingStars > 0) {
      this.remainingStars = Array.from({ length: countRemainingStars }, (_, i) => i + 1);
    }
  }
}
