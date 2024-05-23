import {Component, ElementRef, OnDestroy, OnInit} from '@angular/core';
import Phaser from "phaser";
import {ActivatedRoute, Router} from "@angular/router";
import Scene1 from "./Scenes/Scene1";
import Scene2 from "./Scenes/Scene2";
import Scene3 from "./Scenes/Scene3";

@Component({
  selector: 'app-scene-controller',
  templateUrl: './scene-controller.component.html',
  styleUrls: ['./scene-controller.component.scss']
})


export class SceneControllerComponent implements OnInit, OnDestroy {
  phaserGame: Phaser.Game | undefined;
  config: Phaser.Types.Core.GameConfig;
  sceneNr: string | null  = '';

  constructor(
    private route: ActivatedRoute,
    private host: ElementRef,
    private router: Router
  ) {
    this.config = {
      type: Phaser.AUTO,
      backgroundColor: '#9fb5c1',
      height: 768,
      width: 1024,
      //scene: [ Scene3, Scene2, Scene1],
      parent: 'game-root',
      scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
      },
      physics: {
        default: 'arcade',
        arcade: {
          //gravity: { x: 100 , y: 100 }
        }
      }
    };
debugger;
  }

  ngOnInit() {
    //onInit wird immer gleich ausgeführt beim Start
    this.route.paramMap.subscribe(params => {
      this.sceneNr = params.get('id');
      // Now, this.productId contains the value of the 'id' parameter
    });

    this.phaserGame = new Phaser.Game(this.config);
    switch (this.sceneNr){
      case '1' : {
        debugger;
        this.phaserGame.scene.add('1', new Scene1 (this.router), true);
       // while(this.phaserGame.scene.getScene('1') == null);
      /*  while( this.phaserGame.scene.isActive('1') === false){
          let i = 1;
        }
         let test = this.phaserGame.scene.getScene('1') as Scene1;
         test.setRouter(this.router);*/
        break
      }
      case '2' : {
        this.phaserGame.scene.add('2', Scene2, true);
        break
      }
      case '3' : {
        this.phaserGame.scene.add('3', Scene3, true);
        break
      }
    }

    console.log('loading scene: ' + this.sceneNr);
  }

  ngOnDestroy(){
    this.phaserGame?.destroy(true, false);
  }
}
