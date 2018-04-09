import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DataService {
  private usbDeviceList: string = '/api/device-list';

  constructor(public httpClient: HttpClient) { }

  getUsbDeviceList(options?) {
    // return this.httpClient.get<IUsbDevice[]>(this.usbDeviceList, options || {});
  }

}
