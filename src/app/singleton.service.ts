// singleton.service.ts

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SingletonService {
  constructor(private router: Router) {
    //debugger;
  }

  public navigateToSceneSelector() {
    console.log("singelton.service")

    this.router.navigate(['sceneSelector']);

  }


}
