import Phaser from "phaser";
import {OperationController} from "../Scene3/OperationController";
import {Router} from "@angular/router";
import {SingletonService} from "../../singleton.service";
import {AppComponent} from "../../app.component";
import {AudioController} from "../Controller/AudioController";
import {ImageController} from "../Controller/ImageController";

export default class Scene3 extends Phaser.Scene {

  //Rufzeichen: Es wird später instanziert = man braucht es nicht im constructor angeben
  private operationController!: OperationController;

  private gehirn!: Phaser.GameObjects.Image;
  private bubble!: Phaser.GameObjects.Graphics;
  private bubbleText!: Phaser.GameObjects.Text;

  router: Router;


  constructor(router:Router, singletonService: SingletonService) {
    super({ key: '3' });

    this.router = router;

  }

  preload() {

    AudioController.getInstance().preloadAudio(this);
    ImageController.getInstance().preloadImage(this);

    //Video
    this.load.video('pluser', 'assets/videos/PlusrechnungErklaerung.mp4' )

  }

  create() {

    //hintergrund
    this.add.image(0,0, 'hintergrundwald').setOrigin(0).setScale(0.2);


    this.time.delayedCall(1000, () => {
      // Gehirn-Bild anzeigen
      this.gehirn = this.add.image(150, 500, 'gehirn').setScale(0.5);

      // Sprechblase erstellen
      this.createSpeechBubble({

        x: 250,
        y: 200,
        width: 320,
        height: 160,
        quote: 'Löse diese Plusrechnung, du musst eine Zahl in das leere Quadrat ziehen. Wenn du Hilfe brauchst ' +
          'klicke auf das Gehirn mit den Fragezeichen. Viel Spaß beim Lösen!'
      });

      AudioController.getInstance().playAudioByKey( this, 'pluserkl');
    }, [], this);

    // Warte 10 Sekunden, bevor das Gehirn und die Sprechblase entfernt werden
    this.time.delayedCall(13000, () => {
      this.removeGehirnAndBubble();
      this.operationController = new OperationController(this);

    }, [], this);
  }

  //Sprechblasenerstellung
  createSpeechBubble ({x, y, width, height, quote}: { x: any, y: any, width: any, height: any, quote: any })
  {

    const bubbleWidth = 400;
    const bubbleHeight = 200;
    const bubblePadding = 10;
    const arrowHeight = bubbleHeight / 4;

    this.bubble = this.add.graphics({ x: x, y: y });

    //  Bubble shadow
    this.bubble.fillStyle(0x222222, 0.5);
    this.bubble.fillRoundedRect(6, 6, bubbleWidth, bubbleHeight, 16);

    //  Bubble color
    this.bubble.fillStyle(0xffffff, 1);

    //  Bubble outline line style
    this.bubble.lineStyle(4, 0x565656, 1);

    //  Bubble shape and outline
    this.bubble.strokeRoundedRect(0, 0, bubbleWidth, bubbleHeight, 16);
    this.bubble.fillRoundedRect(0, 0, bubbleWidth, bubbleHeight, 16);

    //  Calculate arrow coordinates
    const point1X = Math.floor(bubbleWidth / 7);
    const point1Y = bubbleHeight;
    const point2X = Math.floor((bubbleWidth / 7) * 2);
    const point2Y = bubbleHeight;
    const point3X = Math.floor(bubbleWidth / 7);
    const point3Y = Math.floor(bubbleHeight + arrowHeight);

    //  Bubble arrow shadow
    this.bubble.lineStyle(4, 0x222222, 0.5);
    this.bubble.lineBetween(point2X - 1, point2Y + 6, point3X + 2, point3Y);

    //  Bubble arrow fill
    this.bubble.fillTriangle(point1X, point1Y, point2X, point2Y, point3X, point3Y);
    this.bubble.lineStyle(2, 0x565656, 1);
    this.bubble.lineBetween(point2X, point2Y, point3X, point3Y);
    this.bubble.lineBetween(point1X, point1Y, point3X, point3Y);

    this.bubbleText = this.add.text(0, 0, quote, { fontFamily: 'Arial', fontSize: 25, color: '#000000', align: 'center', wordWrap: { width: bubbleWidth - (bubblePadding * 2) } });

    const b = this.bubbleText.getBounds();

    this.bubbleText.setPosition(this.bubble.x + (bubbleWidth / 2) - (b.width / 2), this.bubble.y + (bubbleHeight / 2) - (b.height / 2));
  }

  removeGehirnAndBubble() {
    this.gehirn.destroy();
    this.bubble.destroy();
    this.bubbleText.destroy();
  }

  private get singletonService(): SingletonService {
    return AppComponent.singletonService;
  }

  navigateToSceneComponent(){

    console.log('SingletonService:', this.singletonService);

    if (this.singletonService) {
      this.singletonService.navigateToSceneSelector();
    } else {
      console.error('SingletonService is undefined.');
    }
  }



}
