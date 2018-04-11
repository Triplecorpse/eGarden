import {Component, Inject, OnInit} from '@angular/core';
import {SocketConnectionService} from "../services/socket-connection.service";
import {DOCUMENT} from "@angular/common";
import {IMessage} from "../i-message";

@Component({
  selector: 'app-light',
  templateUrl: './light.component.html',
  styleUrls: ['./light.component.scss'],
  providers: [SocketConnectionService]
})
export class LightComponent implements OnInit {
  private color: string = 'ffffff';
  private gradient: string;
  private position: number = 0;

  constructor(public socketConnectionService: SocketConnectionService, @Inject(DOCUMENT) private document: Document) {
    socketConnectionService.getStream().subscribe((data: IMessage) => {
      if (data.header === 'Color') {
        this.color = data.body;
        this.document.body.style['background-color'] = data.body;
      } else if (data.header === 'Gradient') {
        this.gradient = data.body;
      } else if (data.header === 'Position') {
        this.position = Number(data.body);
      }
    })
  }

  onColorChange($event, c) {
    // this.color[c] = $event.value.toString(16);;
    // if (this.color.r.length === 1) {
    //   this.color.r += '0';
    // }
    // if (this.color.g.length === 1) {
    //   this.color.g += '0';
    // }
    // if (this.color.b.length === 1) {
    //   this.color.b += '0';
    // }
    // const str = this.color.r + this.color.g + this.color.b;

    // this.socketConnectionService.emit(str);
  }

  ngOnInit() {

  }

}
