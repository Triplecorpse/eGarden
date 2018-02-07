import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {IUsbDevice} from "./interfaces/i-usb-device";

@Injectable()
export class DataService {
  private usbDeviceList: string = '/api/device-list';

  constructor(public httpClient: HttpClient) { }

  getUsbDeviceList(options?) {
    return this.httpClient.get<IUsbDevice[]>(this.usbDeviceList, options || {});
  }

}
