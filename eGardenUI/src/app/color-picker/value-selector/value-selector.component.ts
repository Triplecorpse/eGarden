import {Component, ElementRef, EventEmitter, Input, OnInit, Output} from '@angular/core';

interface iCustomEvent {
  name: string,
  source: ElementRef,
  value: number
}

@Component({
  selector: 'app-value-selector',
  templateUrl: './value-selector.component.html',
  styleUrls: ['./value-selector.component.scss']
})
export class ValueSelectorComponent implements OnInit {
  @Input() label: string;
  @Input() gradient: string;
  @Input() name?: string;
  @Output() input: EventEmitter<iCustomEvent> = new EventEmitter();
  private pointerLeft: number;

  constructor(private elementRef: ElementRef) { }

  selectValue(event) {
    if ((event.type === 'click' || (event.type === 'mousemove' && event.buttons === 1)) && !event.target.className.includes('picker__pointer')) {
      this.pointerLeft = event.offsetX;
      this.input.emit({
        name: this.name,
        source: this.elementRef.nativeElement,
        value: (100 / event.target.offsetWidth) * event.offsetX
      });
    }
  }

  ngOnInit() {
  }

}
