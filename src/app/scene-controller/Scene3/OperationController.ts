import Phaser from 'phaser';
import {dragDrop} from "./DragDrop";
import {StarController} from "../Controller/StarController";
import {AudioController} from "../Controller/AudioController";



export class OperationController {
  private scene: Phaser.Scene;
  public firstNumber: string;
  public secondNumber: string;
  public result: string;
  public plusSign: Phaser.GameObjects.Image;
  public emptySquare: Phaser.GameObjects.Image;
  public static instance: OperationController;
  public correctAnswersCount: number;
 //array für die sterne
  private stars: Phaser.GameObjects.Image[] = [];
  private star: Phaser.GameObjects.Image;
  private starController: StarController;

  constructor(scene: Phaser.Scene) {
    OperationController.instance = this;
    this.scene = scene;
    this.correctAnswersCount = 1;
    this.firstNumber = '';
    this.secondNumber = '';
    this.result = '';
    this.plusSign = this.scene.add.image(-50, 0, ''); // Leeres Bild als Platzhalter
    this.emptySquare = this.scene.add.image(-50, 0, '');
    this.generateNewEquation();

    this.createQuestionButton();
    this.star = this.scene.add.image(-50, 0, '');

    this.starController = new StarController(scene);

  }

  private generateNewEquation() {
    this.secondNumber = Phaser.Math.Between(1, 4).toString();
    this.result = (parseInt(this.secondNumber) + Phaser.Math.Between(1, 5)).toString();
    console.log('secondNumber: ' + this.secondNumber);
    console.log('result: ' + this.result);

    const centerX = this.scene.cameras.main.width / 2;

    this.emptySquare = this.scene.add.image(centerX - 200, 300, 'square').setScale(0.6).setInteractive();
    this.plusSign = this.scene.add.image(centerX, 300, 'plus').setScale(0.05);
    this.scene.add.image(centerX + 100, 300, this.secondNumber).setScale(0.2).setInteractive();
    this.scene.add.image(centerX + 200, 300, 'gleich').setScale(0.1);
    this.scene.add.image(centerX + 300, 300, this.result).setScale(0.2).setInteractive();

    // Platzieren der Zahlenbilder unten
    for (let i = 1; i <= 9; i++) {
      const numberImage = new dragDrop(this.scene, 100 * i, 550, `${i}`);
      this.scene.add.existing(numberImage);

      numberImage.setInteractive();
      // Event-Handler für Klick auf die Zahl
      numberImage.on('pointerdown', () => {
        // Methode zum Abspielen des Sounds
        this.speakNumber(`${i}`);
      });
    }

    // Event-Handler für Klick auf das leere Quadrat
    this.emptySquare.on('pointerdown', () => {
      // Rufe die Methode in OperationController auf, um die Klanggleichung abzuspielen
      this.playSoundRechnung();
    });


    //Text für die Erklärung
    var plustext = this.scene.add.text(100, 150, 'Ziehe eine Zahl in das leere Feld zum Lösen der Rechnung!', {
      font: 'bold 32px Arial',
      color: '0xffffff'
    });

    // Mache den Text interaktiv
    plustext.setInteractive();
    plustext.on('pointerdown', () => {
      AudioController.getInstance().playAudioByKey( this.scene, 'plus_scene3');
    });
  }

  public generateEquationsIfNeeded() {


      this.correctAnswersCount++;
      console.log('Richtige Antwort! Fortschritt: ' + this.correctAnswersCount + '/5');

      this.clearScene();

      //this.addStar();
    this.starController.addStar(this.correctAnswersCount, this.stars);
      this.generateNewEquation();
      this.createQuestionButton();

  }

  public end(){
    this.correctAnswersCount++;
    console.log('Richtige Antwort! Fortschritt: ' + this.correctAnswersCount + '/5');

    this.clearScene();
    //this.addStar();
    this.starController.addStar(this.correctAnswersCount, this.stars);
    this.createQuestionButton();
  }

  public clearAllandStartNew(){
    // Lösche alle vorherigen Elemente hier
    this.scene.children.removeAll();
    this.scene.add.image(0,0, 'hintergrundwald').setOrigin(0).setScale(0.2);
    this.correctAnswersCount = 1;
    this.stars = [];
    this.generateNewEquation();
    this.createQuestionButton();
  }

  public clearScene() {
      // Lösche alle vorherigen Elemente hier
      this.scene.children.removeAll();
    //Hintergrund
    this.scene.add.image(0,0, 'hintergrundwald').setOrigin(0).setScale(0.2);
    //damit er die sterne auch nach dem removeAll lässt
      this.stars.forEach(star => {
      this.scene.add.existing(star);
    });


  }

//für die Zahlen zum Ausprechen
  public speakNumber(number: string) {
    AudioController.getInstance().playAudioByKey( this.scene, `${number}`);
  }

  // Methode, um den Klang für die Zahlen, das Plus und das Gleichheitszeichen abzuspielen
  public playSoundRechnung() {
    const equationSounds = [
      'plusoperation',
      `${this.secondNumber}`,
      'istgleich',
      `${this.result}`
    ];

    // Ab hier die Audio-Dateien zusammensetzen und abspielen
    this.playEquationSound(equationSounds, 0);
  }

  // Methode, um eine einzelne Audio-Datei abzuspielen => Für die Rechnung
  public playEquationSound(sounds: string[], index: number) {
    if (index < sounds.length) {
      const soundKey = sounds[index];

      // Spiele die aktuelle Audio-Datei ab
      const audio = this.scene.sound.add(soundKey);
      audio.on('complete', () => {
        // Spiele die nächste Audio-Datei ab, wenn die aktuelle abgeschlossen ist
        this.playEquationSound(sounds, index + 1);
      });

      audio.play();
    }
  }

  private createQuestionButton() {
    const questionButton = this.scene.add.image(
      this.scene.cameras.main.width - 40,
      40,
      'gehirnfragezeichen'
    ).setScale(0.2);
    questionButton.setOrigin(1, 0);
    questionButton.setInteractive();

    questionButton.on('pointerdown', () => {
      const video = this.scene.add.video(this.scene.cameras.main.width / 2, this.scene.cameras.main.height / 2, 'pluser');

      video.play();

      //complete: wenn das video fertig ist wird es zerstört
      video.on('complete', () => {
        video.destroy();
      });


    });
  }

}
