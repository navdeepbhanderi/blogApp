import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-error',
  templateUrl: 'errorComponent.component.html',
  styleUrls: ['./errorComponent.component.scss'],
})
export class errorComponent {
  @Input('error') error: any;
  @Output() event = new EventEmitter<boolean>();
  onClick() {
    this.event.emit(false);
  }
}
