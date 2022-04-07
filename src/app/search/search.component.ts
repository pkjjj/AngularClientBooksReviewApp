import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  @Output() public changeItems = new EventEmitter<string[]>();
  // fix undefined
  @Input() public itemsForSearch: string[];
  @Input() public isButtonStyleWarning: boolean;
  @Input() public inputWidth: string;
  public searchValue: string;

  constructor() { }

  public search(searchText: string) {

    if (!this.itemsForSearch) {
      return this.changeItems.next(this.itemsForSearch);
    }

    if (!searchText) {
      return this.changeItems.next(this.itemsForSearch);
    }

    searchText = searchText.toLocaleLowerCase();

    const resultArray = this.itemsForSearch.filter(it => {
      return it.toLocaleLowerCase().includes(searchText);
    });

    if (resultArray !== undefined) {
      return this.changeItems.next(resultArray);
    }
    else {
      return this.changeItems.next(this.itemsForSearch);
    }
  }
}

