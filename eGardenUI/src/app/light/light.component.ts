import {Component, OnChanges, SimpleChanges} from '@angular/core';
import {SocketConnectionService} from "../services/socket-connection.service";
import {IMessage} from "../i-message";

@Component({
  selector: 'app-light',
  templateUrl: './light.component.html',
  styleUrls: ['./light.component.scss'],
  providers: [SocketConnectionService]
})
export class LightComponent implements OnChanges {
  private color: string = 'ffffff';
  private gradient: string;
  private position: number = 0;

  constructor(public socketConnectionService: SocketConnectionService) {
    socketConnectionService.getStream().subscribe((data: IMessage) => {
      if (data.header === 'color') {
        this.color = data.body;
      } else if (data.header === 'gradient') {
        this.gradient = data.body;
      } else if (data.header === 'position') {
        this.position = Number(data.body) * 100;
      }
    })
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
  }

}
