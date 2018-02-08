import { Component } from '@angular/core';
import {SocketConnectionService} from "./socket-connection.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [SocketConnectionService]
})
export class AppComponent {
  constructor(public socketConnectionService: SocketConnectionService) {
    socketConnectionService.startConnection().subscribe(data => {
      console.log(data);
    })
  }
  title = 'app';
}
