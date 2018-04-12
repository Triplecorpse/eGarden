import {BrowserModule, HAMMER_GESTURE_CONFIG} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {
  MatInputModule, MatFormFieldModule, GestureConfig, MatCardModule, MatMenuModule, MatButtonModule
} from "@angular/material";
import {LightComponent} from './light/light.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FormsModule} from "@angular/forms";
import {ColorPickerComponent} from './color-picker/color-picker.component';
import {ValueSelectorComponent} from './value-selector/value-selector.component';

@NgModule({
  declarations: [
    AppComponent,
    LightComponent,
    ColorPickerComponent,
    ValueSelectorComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatInputModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    FormsModule,
    MatCardModule,
    MatMenuModule,
    MatButtonModule
  ],
  providers: [{provide: HAMMER_GESTURE_CONFIG, useClass: GestureConfig}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
