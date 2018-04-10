import {Component} from '@angular/core';
import {SocketConnectionService} from "./services/socket-connection.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [SocketConnectionService]
})
export class AppComponent {
}
