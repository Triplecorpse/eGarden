import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageMainLightTestComponent } from './page-main-light-test.component';

describe('PageMainLightTestComponent', () => {
  let component: PageMainLightTestComponent;
  let fixture: ComponentFixture<PageMainLightTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageMainLightTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageMainLightTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
