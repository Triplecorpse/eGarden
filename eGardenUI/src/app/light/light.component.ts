import {Component, OnInit} from '@angular/core';
import {SocketConnectionService} from "../services/socket-connection.service";
import {Subject} from "rxjs/Subject";

interface color {
  r: string,
  g: string,
  b: string
}

@Component({
  selector: 'app-light',
  templateUrl: './light.component.html',
  styleUrls: ['./light.component.scss']
})
export class LightComponent implements OnInit {
  private color: color = {
    r: 'ff',
    g: 'ff',
    b: 'ff'
  };
  private colorStr: string = 'FFFFFF';

  constructor(public socketConnectionService: SocketConnectionService) {
  }

  onColorChange($event, c) {
    this.color[c] = $event.value.toString(16);;
    if (this.color.r.length === 1) {
      this.color.r += '0';
    }
    if (this.color.g.length === 1) {
      this.color.g += '0';
    }
    if (this.color.b.length === 1) {
      this.color.b += '0';
    }
    const str = this.color.r + this.color.g + this.color.b;

    this.socketConnectionService.emit(str);
  }

  ngOnInit() {

  }

}
