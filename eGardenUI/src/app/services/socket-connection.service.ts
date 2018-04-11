import {Injectable} from '@angular/core';
import * as Rx from 'rxjs/Rx';
import {IMessage} from "../i-message";

@Injectable()
export class SocketConnectionService {
  private subject: Rx.Subject<MessageEvent>;

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
      next: (data: MessageEvent) => {
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

  public getStream(): Rx.Observable<IMessage> {
    return this.connect()
      .asObservable()
      .map((response: MessageEvent) => {
        const res = JSON.parse(response.data);
        return {header: res.header, body: res.body, success: res.success, status: res.status}
      })
  }

  public emit(data) {
    this.subject.next(data);
  }
}
