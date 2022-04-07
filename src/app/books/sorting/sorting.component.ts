import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Book } from 'src/app/interfaces/book';

@Component({
  selector: 'app-sorting',
  templateUrl: './sorting.component.html',
  styleUrls: ['./sorting.component.css']
})
export class SortingComponent {

  @Output() public changeItems = new EventEmitter<Book[]>();
  @Input() public itemsForSort: Book[];

  constructor() {}

  public sort(option: string) {
    if (option === 'default') {
      this.changeItems.next(this.itemsForSort);
    }
    else if (option === 'rating') {
      this.sortByRating();
      this.changeItems.next(this.itemsForSort);
    }
    else if (option === 'date') {
      this.sortByDate();
      this.changeItems.next(this.itemsForSort);
    }
  }

  private sortByRating() {
    this.itemsForSort.sort((item, secondItem) => secondItem.rating - item.rating);
  }

  private sortByDate() {
    this.itemsForSort.sort((item, secondItem) => {
      return item.created > secondItem.created ? -1 : 1;
    });
  }
}
