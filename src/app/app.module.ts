import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { MatIconModule } from '@angular/material/icon';
import { SceneselectorComponent } from './scene-selector/scene-selector.component';
import { MatButtonModule } from '@angular/material/button';
import {MatGridListModule} from '@angular/material/grid-list';
import { SceneControllerComponent } from './scene-controller/scene-controller.component';
import {MatCardModule} from "@angular/material/card";
//import {RouterModule, Routes} from "@angular/router";
//import {SingletonService} from "./singleton.service";
//import {NgOptimizedImage} from "@angular/common";
import { MyHomepageComponent } from './my-homepage/my-homepage.component';
import {SingletonService} from "./singleton.service";
import {NavbarComponent} from "./navbar/navbar.component";


@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    SceneselectorComponent,
    SceneControllerComponent,
    MyHomepageComponent,
    NavbarComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        MatGridListModule,
        MatCardModule,

       // RouterModule.forRoot(routes),
        //NgOptimizedImage,
    ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
