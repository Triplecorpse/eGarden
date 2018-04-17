import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule, Routes, RouterLinkActive} from '@angular/router';

import {AppComponent} from './app.component';
import {
  MatInputModule, MatFormFieldModule, MatCardModule, MatMenuModule, MatButtonModule
} from "@angular/material";
import {LightComponent} from './light/light.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FormsModule} from "@angular/forms";
import {ColorPickerComponent} from './color-picker/color-picker.component';
import {ValueSelectorComponent} from './value-selector/value-selector.component';
import {NavigationComponent} from './navigation/navigation.component';
import {PageOverviewComponent} from './page-overview/page-overview.component';
import {PageRgbTestComponent} from './page-rgb-test/page-rgb-test.component';
import { PageMainLightTestComponent } from './page-main-light-test/page-main-light-test.component';
import { PageHeatTestComponent } from './page-heat-test/page-heat-test.component';
import { PageWateringTestComponent } from './page-watering-test/page-watering-test.component';
import { PageWorkLogComponent } from './page-work-log/page-work-log.component';
import {PageScheduleComponent} from "./page-schedule/page-schedule.component";

const appRoutes: Routes = [
  {path: 'home', component: PageOverviewComponent},
  {path: 'rgb', component: PageRgbTestComponent},
  {path: 'main-light', component: PageMainLightTestComponent},
  {path: 'heat', component: PageHeatTestComponent},
  {path: 'watering', component: PageWateringTestComponent},
  {path: 'log', component: PageWorkLogComponent},
  {path: 'schedule', component: PageScheduleComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    LightComponent,
    ColorPickerComponent,
    ValueSelectorComponent,
    NavigationComponent,
    PageOverviewComponent,
    PageRgbTestComponent,
    PageMainLightTestComponent,
    PageHeatTestComponent,
    PageWateringTestComponent,
    PageWorkLogComponent,
    PageScheduleComponent
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
    MatButtonModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
