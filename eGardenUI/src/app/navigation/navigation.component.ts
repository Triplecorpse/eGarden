import { Component, OnInit } from '@angular/core';
import {INavigation} from "../i-navigation";
import {NavigationItem} from "../navigation-item";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  private nav: INavigation[] = [
    new NavigationItem('Overview', 'home'),
    new NavigationItem('RGB Light Test', 'rgb'),
    new NavigationItem('Main Light Test', 'main-light', ),
    new NavigationItem('Heat Test', 'heat',),
    new NavigationItem('Watering Test', 'watering'),
    new NavigationItem('Work Log', 'log'),
    new NavigationItem('Scheduler', 'schedule')
  ];
  // public active:string = 'active';
  constructor() { }

  beforeNavigate(navItem: INavigation, event: MouseEvent) {
    if (navItem.disabled) {
      event.preventDefault();
    }
  }

  ngOnInit() {
  }

}
