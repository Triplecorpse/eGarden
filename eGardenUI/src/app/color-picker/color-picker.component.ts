import {Component, OnInit} from '@angular/core';
import * as tinyColor from 'tinycolor2';
import {SocketConnectionService} from "../services/socket-connection.service";

@Component({
  selector: 'app-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.scss'],
  providers: [SocketConnectionService]
})
export class ColorPickerComponent implements OnInit {
  private hue: number = 0;
  private saturation: number = 100;
  private lightness: number = 50;
  private saturationGradient: string = `linear-gradient(to right, hsl(${this.hue}, 0%, 50%) 0%, hsl(${this.hue}, 100%, 50%) 100%)`;
  private lightnessGradient: string = `linear-gradient(to right, hsl(${this.hue}, 100%, 0%) 0%, hsl(${this.hue}, 100%, 50%) 50%, hsl(${this.hue}, 100%, 100%) 100%)`;
  private color: string = `hsl(${this.hue}, ${this.saturation}%, ${this.lightness}%)`;
  private colorRGB: string = tinyColor(this.color).toHexString();
  public whitepoint: string = '#ff50b0';

  constructor(public socketConnectionService: SocketConnectionService) {
    socketConnectionService.getStream().subscribe(message => {
      console.log(message);
    });
  }

  changeColor(event) {
    if (event.name === 'hue') {
      this.saturationGradient = `linear-gradient(to right, hsl(${this.hue}, 0%, 50%) 0%, hsl(${this.hue}, 100%, 50%) 100%)`;
      this.lightnessGradient = `linear-gradient(to right, hsl(${this.hue}, 100%, 0%) 0%, hsl(${this.hue}, 100%, 50%) 50%, hsl(${this.hue}, 100%, 100%) 100%)`;
    }

    this.color = `hsl(${this.hue}, ${this.saturation}%, ${this.lightness}%)`;
    this.colorRGB = tinyColor(this.color).toHexString();
    this.send();
  }

  getRatOf255(value) {
    return value / 255;
  }

  send() {
    const whitep = tinyColor(this.whitepoint).toRgb();
    const realc = tinyColor(this.colorRGB).toRgb();
    const colorModel = tinyColor.fromRatio({
      r: realc.r * this.getRatOf255(whitep.r),
      g: realc.g * this.getRatOf255(whitep.g),
      b: realc.b * this.getRatOf255(whitep.b)
    });
    console.log(whitep, realc, colorModel.toHexString());
    this.socketConnectionService.emit({
      header: 'color',
      body: colorModel.toHexString()
    });
  }

  ngOnInit() {
  }

}
