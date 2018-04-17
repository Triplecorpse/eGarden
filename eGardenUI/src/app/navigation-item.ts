import {INavigation} from "./i-navigation";

export class NavigationItem implements INavigation {
  constructor(public name: string, public href: string, public disabled: boolean = false) {
  }
}
