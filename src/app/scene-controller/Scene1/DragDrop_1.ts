import Phaser from 'phaser';
import { OperationController } from "./OperationController_1";
import Scene1 from "../Scenes/Scene1";
import {AudioController} from "../Controller/AudioController";

export class dragDrop extends Phaser.GameObjects.Image {
  private originalX: number;
  private originalY: number;
  private isDragging: boolean;
  private isOverSquare: boolean;

  private scene1 :Scene1;

  constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
    super(scene, x, y, texture);
    this.setScale(0.2);
    this.setInteractive({ draggable: true });

    this.originalX = x;
    this.originalY = y;
    this.isDragging = false;
    this.isOverSquare = false;

    this.scene1 = scene as Scene1;

    this.on('dragstart', (pointer: any) => {
      scene.children.bringToTop(this);
      this.isDragging = true;
    });

    this.on('drag', (pointer: any, dragX: number, dragY: number) => {
      if (this.isDragging) {
        this.x = dragX;
        this.y = dragY;

        const emptySquare = OperationController.instance.emptySquare;
        if (emptySquare && Phaser.Geom.Rectangle.Contains(emptySquare.getBounds(), this.x, this.y)) {
          this.x = emptySquare.x;
          this.y = emptySquare.y;
          this.isOverSquare = true;
        } else {
          this.isOverSquare = false;
        }
      }


    });

    this.on('dragend', () => {
      this.isDragging = false;

      if (this.isOverSquare) {
        // Wenn das Bild über dem leeren Quadrat bleibt
        const appleCountInSquare = OperationController.instance.itemsInScene;
        console.log(`Anzahl der Apfelbilder: ${appleCountInSquare}`);

        if (appleCountInSquare === parseInt(texture)) {
          console.log('Die Antwort ist richtig!');

          if (OperationController.instance.correctAnswersCount < 5) {

            OperationController.instance.clearScene();
            this.scene.add.image(this.scene.cameras.main.width / 2, 350, 'gehirnsuper').setScale(1);

            setTimeout(() => {
              OperationController.instance.generateEquationsIfNeeded();
            }, 1000);
          } else if (OperationController.instance.correctAnswersCount == 5) {


              OperationController.instance.end();
              this.createPopup();

          }
        } else {
          setTimeout(() => {
            // Animation, wenn nicht über dem leeren Quadrat abgelegt
            this.scene.tweens.add({
              targets: this,
              x: this.originalX,
              y: this.originalY,
              ease: 'Linear',
              duration: 800
            });
          }, 1000);
        }
      } else {
        // Animation, wenn nicht über dem leeren Quadrat abgelegt
        this.scene.tweens.add({
          targets: this,
          x: this.originalX,
          y: this.originalY,
          ease: 'Linear',
          duration: 800
        });
      }
    });
  }

  private createPopup() {
    // Container für das Popup
    var popupContainer = this.scene.add.container(this.scene.cameras.main.width / 2, this.scene.cameras.main.height / 2);

// Hintergrundfläche für das Popup
    var popupBackground = this.scene.add.graphics();
    var popupWidth = 400; // Neue Breite des Popups
    var popupHeight = 180; // Neue Höhe des Popups
    var popupBorderSize = 5; // Größe der schwarzen Umrandung

// Fülle den Hintergrund mit dunkelgrüner Farbe
    popupBackground.fillStyle(0xFFFFFF, 0.7);
    popupBackground.fillRect(-popupWidth / 2, -popupHeight / 2, popupWidth, popupHeight);

// Zeichne eine schwarze Umrandung
    popupBackground.lineStyle(popupBorderSize, 0x000000);
    popupBackground.strokeRect(-popupWidth / 2, -popupHeight / 2, popupWidth, popupHeight);

    popupContainer.add(popupBackground);


    // Text im Popup
    var popupText = this.scene.add.text(-180, -60, 'Möchtest du nochmal spielen?', {
      fontSize: '20px',
      font: 'bold 25px Arial',
      color: '#000000', // Schwarze Textfarbe

    });
    popupContainer.add(popupText);
    popupText.setInteractive();
    popupText.on('pointerdown', () => {
      AudioController.getInstance().playAudioByKey( this.scene, 'nochmalspielen');
    });

    //daumenhoch
    var daumenhoch = this.scene.add.image(-90, 30, 'daumenhoch').setScale(0.13);
    daumenhoch.setInteractive();
    daumenhoch.on('pointerdown', function () {
      // Aktion bei Klick auf Ja-Button
      console.log('Ja wurde geklickt');
      popupContainer.destroy(); // Popup-Fenster schließen
     OperationController.instance.clearAllandStartNew();

    });
    popupContainer.add(daumenhoch);

    // daumenrunter
    var daumenrunter = this.scene.add.image(50, 30, 'daumenrunter').setScale(0.15);
    daumenrunter.setInteractive();
    daumenrunter.on('pointerdown', () => {
      // Aktion bei Klick auf Nein-Button
      console.log('Nein wurde geklickt');
      popupContainer.destroy(); // Popup-Fenster schließen
      this.scene1.navigateToSceneComponent();

    });
    popupContainer.add(daumenrunter);
  }

}
