import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageRgbTestComponent } from './page-rgb-test.component';

describe('PageRgbTestComponent', () => {
  let component: PageRgbTestComponent;
  let fixture: ComponentFixture<PageRgbTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageRgbTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageRgbTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
