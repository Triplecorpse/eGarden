import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor() {
    Number.prototype['roundTo'] = function (num) {
      const resto = this % num;
      if (resto <= (num / 2)) {
        return this - resto;
      } else {
        return this + num - resto;
      }
    }
  }
}
