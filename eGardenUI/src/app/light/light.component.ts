import {Component, OnInit} from '@angular/core';
import {SocketConnectionService} from "../services/socket-connection.service";
import {Subject} from "rxjs/Subject";

@Component({
  selector: 'app-light',
  templateUrl: './light.component.html',
  styleUrls: ['./light.component.scss']
})
export class LightComponent implements OnInit {
  public color: string = 'FFFFFF';
  private emitter: Subject<string>;

  constructor(public socketConnectionService: SocketConnectionService) {
  }

  changeColor() {
    if (this.color.match(/^[0-9A-F]{6}$/)) {
      console.log(this.color);
      this.socketConnectionService.emit(this.color);
    }
  }

  ngOnInit() {
    this.changeColor();
  }

}
