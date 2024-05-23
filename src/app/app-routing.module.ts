import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SceneControllerComponent} from "./scene-controller/scene-controller.component";
import {SceneselectorComponent} from "./scene-selector/scene-selector.component";
import {MyHomepageComponent} from "./my-homepage/my-homepage.component";

const routes: Routes = [
  { path: '', component: MyHomepageComponent },
  { path: 'scene/:id', component: SceneControllerComponent },
  { path: 'sceneSelector', component: SceneselectorComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
