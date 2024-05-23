import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SceneControllerComponent } from './scene-controller.component';

describe('SceneControllerComponent', () => {
  let component: SceneControllerComponent;
  let fixture: ComponentFixture<SceneControllerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SceneControllerComponent]
    });
    fixture = TestBed.createComponent(SceneControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
