import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appScroll]'
})
export class ScrollDirective {

  @Output() mouseWheelUp = new EventEmitter();
  @Output() mouseWheelDown = new EventEmitter();
  public currentPosition = 0;

  @HostListener('window:scroll', ['$event.target']) onScroll(event: any) {
    this.scrollFunc(event);
  }

  public scrollFunc(event: any) {
    let scroll = event.scrollingElement.scrollTop;

    if (scroll > this.currentPosition) {
      this.mouseWheelDown.emit(event);
    }
    else {
      this.mouseWheelUp.emit(event);
    }

    this.currentPosition = scroll;
  }
}
