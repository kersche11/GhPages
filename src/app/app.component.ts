import {Component} from '@angular/core';
import Scene3 from "./scene-controller/Scenes/Scene3";
import {Router} from "@angular/router";
import { SingletonService } from './singleton.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'game';



  static singletonService: SingletonService;

  constructor(private router: Router, private singletonService: SingletonService) {

    AppComponent.singletonService = singletonService;


  }

}
