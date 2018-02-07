export interface IUsbDevice {
  busNumber: number;
  deviceAddress: number;
  idProduct: number;
  idVendor: number;
  portNumbers?: number[]
}
