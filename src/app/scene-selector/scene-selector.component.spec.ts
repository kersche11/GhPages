import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SceneselectorComponent } from './scene-selector.component';

describe('SceneselectorComponent', () => {
  let component: SceneselectorComponent;
  let fixture: ComponentFixture<SceneselectorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SceneselectorComponent]
    });
    fixture = TestBed.createComponent(SceneselectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
