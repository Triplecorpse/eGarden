import {Injectable} from '@angular/core';
import * as Rx from 'rxjs/Rx';

@Injectable()
export class SocketConnectionService {
  private subject: Rx.Subject<MessageEvent>;

  constructor() {
  }

  private connect(): Rx.Subject<MessageEvent> {

    if (!this.subject) {
      this.subject = this.create();
      if (!this.subject.hasError) {
        console.warn('Viewer connection established');
      }
    }

    return this.subject;
  }

  private create(): Rx.Subject<MessageEvent> {
    const ws = new WebSocket(`ws://${location.host}/connect`);
    const observable = Rx.Observable.create(
      (obs: Rx.Observer<MessageEvent>) => {
        ws.onmessage = obs.next.bind(obs);
        ws.onerror = obs.error.bind(obs);
        ws.onclose = obs.complete.bind(obs);

        return ws.close.bind(ws);
      });
    const observer = {
      next: (data: Object) => {
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify(data));
        }
      },
      complete: () => {
        if (ws.readyState === WebSocket.OPEN) {
          ws.close();
        }
      }
    };

    return Rx.Subject.create(observer, observable);
  }

  public startConnection() {
    return this.connect().map((response: MessageEvent) => {
        return JSON.parse(response.data);
      });
  }
}
