import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Book } from 'src/app/interfaces/book';
import { RequestService } from 'src/app/shared/services/request.service';

@Component({
  selector: 'app-tiles',
  templateUrl: './tiles.component.html',
  styleUrls: ['./tiles.component.css']
})
export class TilesComponent {

  @Input() public books: Book[];

  constructor(private _requestService: RequestService) { }
}
