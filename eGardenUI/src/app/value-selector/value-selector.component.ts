import {
  Component, ElementRef, EventEmitter, forwardRef, Input, OnInit, Output
} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

interface iCustomEvent {
  name: string,
  source: ElementRef,
  value: number
}

export const EXPANDED_SLIDER_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => ValueSelectorComponent),
  multi: true,
};

@Component({
  selector: 'app-value-selector',
  templateUrl: './value-selector.component.html',
  styleUrls: ['./value-selector.component.scss'],
  providers: [EXPANDED_SLIDER_VALUE_ACCESSOR]
})
export class ValueSelectorComponent implements OnInit, ControlValueAccessor {
  @Input() name: string;
  @Input() gradient: string;
  @Input() min?: number;
  @Input() max?: number;
  @Input() step?: number;
  @Output() input: EventEmitter<iCustomEvent> = new EventEmitter();
  private innerModel: number;
  private isDisabled: boolean;
  public onChange: any;
  public onTouched: any;

  constructor(private elementRef: ElementRef) {
  }

  selectValue(event) {
    if (this.isDisabled) {
      return
    }

    if ((event.type === 'click' || (event.type === 'mousemove' && event.buttons === 1)) && !event.target.className.includes('picker__pointer')) {
      const relation = event.offsetX / event.target.offsetWidth;
      const rawValue = relation * (this.max - this.min);
      const steppedvalue = rawValue['roundTo'](this.step);

      this.innerModel = steppedvalue + this.min;
      this.onChange(this.innerModel);
      this.input.emit({
        name: this.name,
        source: this.elementRef.nativeElement,
        value: this.innerModel
      });
    }
  }

  get pointerLeft(): number {
    const range = this.max - this.min;
    const value = this.innerModel - this.min;

    return (value / range) * 100
  }

  writeValue(value: number): void {
    this.innerModel = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  ngOnInit() {
    if (!this.min) {
      this.min = 0;
    }

    if (!this.max) {
      this.max = 100;
    }

    if (!this.step) {
      this.step = 1;
    }
  }
}
