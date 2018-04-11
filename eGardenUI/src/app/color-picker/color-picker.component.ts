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
    this.socketConnectionService.emit({
      header: 'color',
      body: this.colorRGB
    });
  }

  ngOnInit() {
  }

}
