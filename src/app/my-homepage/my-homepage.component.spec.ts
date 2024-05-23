import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyHomepageComponent } from './my-homepage.component';

describe('MyHomepageComponent', () => {
  let component: MyHomepageComponent;
  let fixture: ComponentFixture<MyHomepageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyHomepageComponent]
    });
    fixture = TestBed.createComponent(MyHomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
