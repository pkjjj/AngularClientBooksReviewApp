import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import * as cloneDeep from 'lodash/cloneDeep';

@Component({
  selector: 'app-date-filter',
  templateUrl: './date-filter.component.html',
  styleUrls: ['./date-filter.component.css']
})
export class DateFilterComponent {

  @Input() public itemsForSort: Object[];
  @Input() public propertyNameForSort: string;
  @Output() public changeItems = new EventEmitter<Object[]>();
  public sortedItems: Object[];

  constructor() {}

  public sort(option: string) {
    this.sortedItems = cloneDeep(this.itemsForSort);

    const isExist = this.sortedItems.some(e => e.hasOwnProperty(this.propertyNameForSort));

    if (isExist) {
      this.checkSortOption(option);
    }
    else {
      throw Error("Not valid property name");
    }
  }

  private checkSortOption(option: string) {
    if (option === 'All') {
      this.changeItems.next(this.sortedItems);
    }
    else if (option === 'Newest') {
      this.sortByNewestDate();
      this.changeItems.next(this.sortedItems);
    }
    else if (option === 'Oldest') {
      this.sortByOldestDate();
      this.changeItems.next(this.sortedItems);
    }
    else if (option === 'One day') {
      this.filterByLastDay();
      this.changeItems.next(this.sortedItems);
    }
  }

  private sortByNewestDate() {
    this.sortedItems.sort((item, secondItem) => {
      return item[this.propertyNameForSort] > secondItem[this.propertyNameForSort] ? -1 : 1;
    });
  }

  private sortByOldestDate() {
    this.sortedItems.sort((item, secondItem) => {
      return item[this.propertyNameForSort] > secondItem[this.propertyNameForSort] ? 1 : -1;
    });
  }

  private filterByLastDay() {
    this.sortedItems = this.sortedItems.filter(x => {
      const timeStamp = Math.round(new Date().getTime() / 1000);
      const timeStampYesterday = timeStamp - (24 * 3600);
      return x[this.propertyNameForSort] >= new Date(timeStampYesterday * 1000).toISOString();
    });
  }
}
