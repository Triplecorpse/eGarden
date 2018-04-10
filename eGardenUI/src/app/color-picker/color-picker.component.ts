import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.scss']
})
export class ColorPickerComponent implements OnInit {
  private hue: number = 0;
  private saturation: number = 0;
  private lightness: number = 0;
  private saturationGradient: string = `linear-gradient(to right, hsl(${this.hue}, 100%, 50%) 0%, hsl(${this.hue}, 0%, 50%) 100%)`;
  private lightnessGradient: string = `linear-gradient(to right, hsl(${this.hue}, 100%, 50%) 0%, hsl(${this.hue}, 100%, 0%) 100%)`;
  private color: string = `hsl(${this.hue}, ${100 - this.saturation}%, ${100 - this.lightness}%)`;

  constructor() {
  }

  changeColor(event) {
    if (event.name === 'hue') {
      this.hue = (event.value / 100) * 360;
      this.saturationGradient = `linear-gradient(to right, hsl(${this.hue}, 100%, 50%) 0%, hsl(${this.hue}, 0%, 50%) 100%)`;
      this.lightnessGradient = `linear-gradient(to right, hsl(${this.hue}, 100%, 50%) 0%, hsl(${this.hue}, 100%, 0%) 100%)`;
    } else if (event.name === 'saturation') {
      this.saturation = 100 - event.value;
    } else if (event.name === 'lightness') {
      this.lightness = 100 - event.value;
    }

    this.color = `hsl(${this.hue}, ${this.saturation}%, ${this.lightness}%)`;
  }

  ngOnInit() {
  }

}
