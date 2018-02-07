import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsbListComponent } from './usb-list.component';

describe('UsbListComponent', () => {
  let component: UsbListComponent;
  let fixture: ComponentFixture<UsbListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsbListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsbListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
