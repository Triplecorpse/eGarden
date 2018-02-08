import {Component, OnInit} from '@angular/core';
import {DataService} from "../data.service";
import {SocketConnectionService} from "../socket-connection.service";
import {IUsbDevice} from "../interfaces/i-usb-device";

@Component({
  selector: 'app-usb-list',
  templateUrl: './usb-list.component.html',
  styleUrls: ['./usb-list.component.scss'],
  providers: [DataService, SocketConnectionService]
})
export class UsbListComponent implements OnInit {
  deviceList: IUsbDevice[] = [];
  displayedColumns = ['busNumber', 'deviceAddress', 'pid', 'vid', 'portNumbers'];
  isLoaded: boolean = false;

  constructor(public dataService: DataService) {

  }

  ngOnInit() {
    this.dataService.getUsbDeviceList('/api/device-list')
      .subscribe(data => {
        for (let obj in data) {
          this.deviceList.push({
            busNumber: data[obj]['busNumber'],
            deviceAddress: data[obj]['deviceAddress'],
            idProduct: data[obj]['deviceDescriptor']['idProduct'],
            idVendor: data[obj]['deviceDescriptor']['idVendor'],
            portNumbers: data[obj]['portNumbers']
          })
        }

        this.isLoaded = true;
      })
  }
}