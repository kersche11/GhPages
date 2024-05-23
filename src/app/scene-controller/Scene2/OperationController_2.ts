import Phaser from 'phaser';
import { dragDrop } from "./DragDrop_2";
import { StarController } from "../Controller/StarController";
import { AudioController } from "../Controller/AudioController";

export class OperationController {
  private readonly scene: Phaser.Scene;
  public firstNumber: string;
  public secondNumber: string;
  public emptySquare: Phaser.GameObjects.Image;
  public static instance: OperationController;
  public correctAnswersCount: number;
  // Array for the stars
  private stars: Phaser.GameObjects.Image[] = [];
  private star: Phaser.GameObjects.Image;
  private starController: StarController;

  constructor(scene: Phaser.Scene) {
    OperationController.instance = this;
    this.scene = scene;
    this.correctAnswersCount = 1;
    this.firstNumber = '';
    this.secondNumber = '';
    this.emptySquare = this.scene.add.image(-50, 0, '');
    this.generateNewEquation();

    this.createQuestionButton();
    this.star = this.scene.add.image(-50, 0, '');

    this.starController = new StarController(scene);
  }

  private generateNewEquation() {
    this.firstNumber = Phaser.Math.Between(0, 9).toString();
    this.secondNumber = Phaser.Math.Between(0, 9).toString();
    console.log('First Number: ' + this.firstNumber);
    console.log('Second Number: ' + this.secondNumber);

    const centerX = this.scene.cameras.main.width / 2;
    const centerY = this.scene.cameras.main.height / 2;

    this.emptySquare = this.scene.add.image(centerX, 350, 'square').setScale(0.6).setInteractive();
    const firstNumberImage = this.scene.add.image(centerX - 200, 350, this.firstNumber).setScale(0.2).setInteractive();
    const secondNumberImage = this.scene.add.image(centerX + 200, 350, this.secondNumber).setScale(0.2).setInteractive();

    this.scene.add.existing(firstNumberImage);
    this.scene.add.existing(secondNumberImage);

    // Add event listeners for the number images
    firstNumberImage.on('pointerdown', () => {
      this.playNumberAudio(this.firstNumber);
    });

    secondNumberImage.on('pointerdown', () => {
      this.playNumberAudio(this.secondNumber);
    });

    // Mengensymbol
    const kleinerAlsSymbol = new dragDrop(this.scene, centerX - 270, centerY + 200, 'kleinerals');
    const istGleichSymbol = new dragDrop(this.scene, centerX, centerY + 200, 'istgleich');
    const groesserAlsSymbol = new dragDrop(this.scene, centerX + 270, centerY + 200, 'groesserals');

    // Add symbols to the scene
    this.scene.add.image(centerX - 330, centerY + 200, 'gehirnmengen').setScale(0.05);
    this.scene.add.image(centerX - 210, centerY + 200, 'gehirnmengen').setScale(0.1);
    this.scene.add.image(centerX - 70, centerY + 200, 'gehirnmengen').setScale(0.1);
    this.scene.add.image(centerX + 70, centerY + 200, 'gehirnmengen').setScale(0.1);
    this.scene.add.image(centerX + 330, centerY + 200, 'gehirnmengen').setScale(0.05);
    this.scene.add.image(centerX + 210, centerY + 200, 'gehirnmengen').setScale(0.1);

    this.scene.add.existing(kleinerAlsSymbol);
    this.scene.add.existing(istGleichSymbol);
    this.scene.add.existing(groesserAlsSymbol);

    kleinerAlsSymbol.setInteractive();
    istGleichSymbol.setInteractive();
    groesserAlsSymbol.setInteractive();

    kleinerAlsSymbol.on('pointerdown', () => {
      AudioController.getInstance().playAudioByKey(this.scene, 'kleinerals');
    });

    groesserAlsSymbol.on('pointerdown', () => {
      AudioController.getInstance().playAudioByKey(this.scene, 'groesserals');
    });

    istGleichSymbol.on('pointerdown', () => {
      AudioController.getInstance().playAudioByKey(this.scene, 'istgleich');
    });

    // Mengentext
    this.mengentext();
  }

  public generateEquationsIfNeeded() {
    this.correctAnswersCount++;
    console.log('Richtige Antwort! Fortschritt: ' + this.correctAnswersCount + '/5');

    this.clearScene();
    this.starController.addStar(this.correctAnswersCount, this.stars);
    this.generateNewEquation();
    this.createQuestionButton();
  }

  public end() {
    this.correctAnswersCount++;
    console.log('Richtige Antwort! Fortschritt: ' + this.correctAnswersCount + '/5');

    this.clearScene();
    this.starController.addStar(this.correctAnswersCount, this.stars);
    this.createQuestionButton();
  }

  public clearScene() {
    // Remove all previous elements
    this.scene.children.removeAll();
    // Background
    this.scene.add.image(0, 0, 'hintergrundblume').setOrigin(0).setScale(0.9);
    // Keep the stars after removeAll
    this.stars.forEach(star => {
      this.scene.add.existing(star);
    });
  }

  public mengentext() {
    // Text for the explanation
    const mengentext = this.scene.add.text(180, 150, 'Ziehe das richtige Symbol in das leere Quadrat!', {
      font: 'bold 32px Arial',
      color: '0xffffff'
    });

    // Make the text interactive
    mengentext.setInteractive();
    mengentext.on('pointerdown', () => {
      AudioController.getInstance().playAudioByKey(this.scene, 'mengentext');
    });
  }

  // Function to play the audio for the numbers
  private playNumberAudio(number: string): void {
    AudioController.getInstance().playAudioByKey(this.scene, `${number}`);
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
      const video = this.scene.add.video(this.scene.cameras.main.width / 2, this.scene.cameras.main.height / 2, 'mengener');

      video.play();

      // complete: when the video finishes, destroy it
      video.on('complete', () => {
        video.destroy();
      });
    });
  }

  public clearAllandStartNew() {
    // Remove all previous elements
    this.scene.children.removeAll();
    this.scene.add.image(0, 0, 'hintergrundblume').setOrigin(0).setScale(0.9);
    this.correctAnswersCount = 1;
    this.stars = [];
    this.generateNewEquation();
    this.createQuestionButton();
  }
}
