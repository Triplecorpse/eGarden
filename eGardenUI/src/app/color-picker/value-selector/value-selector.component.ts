import {Component, Input, OnInit} from '@angular/core';
import {log} from "util";

@Component({
  selector: 'app-value-selector',
  templateUrl: './value-selector.component.html',
  styleUrls: ['./value-selector.component.scss']
})
export class ValueSelectorComponent implements OnInit {
  @Input() label: string;
  @Input() gradient: string;
  private pointerLeft: number;

  constructor() { }

  selectValue(event) {
    if (event.type === 'click' || (event.type === 'mousemove' && event.buttons === 1)) {
      console.log(event);
      this.pointerLeft = event.offsetX;
    }
  }

  ngOnInit() {
  }

}
