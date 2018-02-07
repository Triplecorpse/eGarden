import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {UsbListComponent} from './usb-list/usb-list.component';
import {MatButtonModule, MatTableModule} from "@angular/material";


@NgModule({
  declarations: [
    AppComponent,
    UsbListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatButtonModule,
    MatTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
