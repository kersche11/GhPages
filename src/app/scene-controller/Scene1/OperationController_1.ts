import Phaser from 'phaser';
import { dragDrop } from "./DragDrop_1";
import { StarController } from "../Controller/StarController";
import { AudioController } from "../Controller/AudioController";

export class OperationController {
  private scene: Phaser.Scene;
  public itemsInScene: number;
  public emptySquare: Phaser.GameObjects.Image;
  public static instance: OperationController;
  public correctAnswersCount: number;
  private stars: Phaser.GameObjects.Image[] = [];
  private itemImages: { image: Phaser.GameObjects.Image, clicked: boolean, cellGraphics: Phaser.GameObjects.Graphics }[] = [];
  private starController: StarController;
  private clickCount: number = 0;
  private currentItemKey: string;

  constructor(scene: Phaser.Scene) {
    OperationController.instance = this;

    this.scene = scene;
    this.correctAnswersCount = 1;
    this.itemsInScene = Phaser.Math.Between(0, 9);
    console.log('Items in der Szene: ' + this.itemsInScene);

    this.currentItemKey = this.getRandomItemKey();

    this.emptySquare = this.scene.add.image(-50, 0, '');
    this.generateItemsInScene();
    this.createQuestionButton();

    this.starController = new StarController(scene);
  }

  private getRandomItemKey(): string {
    const items = ['apfel', 'strawberry'];
    return items[Phaser.Math.Between(0, items.length - 1)];
  }

  private generateItemsInScene() {
    const centerX = this.scene.cameras.main.width / 2;
    const centerY = this.scene.cameras.main.height / 2;

    this.emptySquare = this.scene.add.image(centerX - 200, centerY - 100, 'square').setScale(0.6).setInteractive();

    const gleichImage = this.scene.add.image(centerX, centerY - 100, 'gleich').setScale(0.1);

    const blauessquareSize = 350;
    const blauessquare = this.scene.add.graphics({ fillStyle: { color: 0x339933 } });
    blauessquare.fillRect(centerX + 250 - blauessquareSize / 2, centerY - 100 - blauessquareSize / 2, blauessquareSize, blauessquareSize);

    const gridSizeX = 3;
    const gridSizeY = 3;
    const cellWidth = blauessquareSize / gridSizeX;
    const cellHeight = blauessquareSize / gridSizeY;

    const itemPositions: Phaser.Math.Vector2[] = [];

    let itemCount = 0;
    for (let row = 0; row < gridSizeY; row++) {
      for (let col = 0; col < gridSizeX; col++) {
        if (itemCount >= this.itemsInScene) break;

        const cellX = centerX + 250 - blauessquareSize / 2 + (col + 0.5) * cellWidth;
        const cellY = centerY - 100 - blauessquareSize / 2 + (row + 0.5) * cellHeight;

        itemPositions.push(new Phaser.Math.Vector2(cellX, cellY));
        itemCount++;
      }
      if (itemCount >= this.itemsInScene) break;
    }

    itemPositions.forEach((position, index) => {
      const cellGraphics = this.scene.add.graphics({ fillStyle: { color: 0x339933 } });
      cellGraphics.fillRect(position.x - cellWidth / 2, position.y - cellHeight / 2, cellWidth, cellHeight);

      const itemImage = this.scene.add.image(position.x, position.y, this.currentItemKey).setScale(0.15);
      this.itemImages.push({ image: itemImage, clicked: false, cellGraphics: cellGraphics });

      itemImage.setInteractive();
      itemImage.on('pointerdown', () => {
        this.countItems(index);
      });
    });

    for (let i = 0; i <= 9; i++) {
      const numberImage = new dragDrop(this.scene, 90 * i + 110, 550, `${i}`);
      this.scene.add.existing(numberImage);

      numberImage.setInteractive();
      numberImage.on('pointerdown', () => {
        this.speakNumber(`${i}`);
      });
    }
  }

  public speakNumber(number: string) {
    AudioController.getInstance().playAudioByKey(this.scene, `${number}`);
  }

  public generateEquationsIfNeeded() {
    this.correctAnswersCount++;
    console.log(`Richtige Antwort! Fortschritt: ${this.correctAnswersCount}/5`);

    this.clearScene();
    this.starController.addStar(this.correctAnswersCount, this.stars);
    this.itemsInScene = Phaser.Math.Between(0, 9);
    this.currentItemKey = this.getRandomItemKey();
    this.generateItemsInScene();
    this.createQuestionButton();
  }

  public clearScene() {
    this.scene.children.removeAll();
    this.scene.add.image(0, -10, 'hintergrundwiese').setOrigin(0).setScale(0.214);
    this.stars.forEach(star => {
      this.scene.add.existing(star);
    });
    this.itemImages = [];
    this.resetColorsandCountItems();
  }

  public end() {
    this.correctAnswersCount++;
    console.log('Richtige Antwort! Fortschritt: ' + this.correctAnswersCount + '/5');

    this.clearScene();
    this.starController.addStar(this.correctAnswersCount, this.stars);
    this.createQuestionButton();
  }

  private createQuestionButton() {
    const questionButton = this.scene.add.image(
      this.scene.cameras.main.width - 40,
      10,
      'gehirnfragezeichen'
    ).setScale(0.2);
    questionButton.setOrigin(1, 0);
    questionButton.setInteractive();

    questionButton.on('pointerdown', () => {
      const video = this.scene.add.video(this.scene.cameras.main.width / 2, this.scene.cameras.main.height / 2, 'zahlener');

      video.play();

      video.on('complete', () => {
        video.destroy();
      });
    });
  }

  public countItems(index: number) {
    const item = this.itemImages[index];
    if (!item.clicked) {
      this.speakNumber(`${this.clickCount + 1}`); // Ansage der aktuellen Klick-Zahl
      item.clicked = true; // Markiere das Item als angeklickt

      item.cellGraphics.fillStyle(0x00ff00); // Neue Farbe (rot)
      item.cellGraphics.fillRect(item.image.x - item.image.displayWidth / 2, item.image.y - item.image.displayHeight / 2, item.image.displayWidth, item.image.displayHeight);

      this.clickCount++; // Klick-Zähler erhöhen
      if (this.clickCount >= this.itemsInScene) {
        this.clickCount = 0; // Klick-Zähler zurücksetzen, wenn alle Items gezählt wurden
        this.itemImages.forEach(item => {
          item.clicked = false; // Alle Items wieder auf nicht angeklickt setzen
          item.cellGraphics.clear();
          item.cellGraphics.fillStyle(0x339933); // Ursprüngliche Farbe (grün)
          item.cellGraphics.fillRect(item.image.x - item.image.displayWidth / 2, item.image.y - item.image.displayHeight / 2, item.image.displayWidth, item.image.displayHeight);
        });
      }
    } else {
      this.speakNumber("den hast du schon"); // Ansage, dass das Item bereits angeklickt wurde
    }
  }

  private resetColorsandCountItems() {
    this.clickCount = 0;
    this.itemImages.forEach(item => {
      if (item.clicked) {
        item.cellGraphics.clear();
        item.cellGraphics.fillStyle(0x339933);
        item.cellGraphics.fillRect(item.image.x - 15, item.image.y - 15, 30, 30);
      }
    });
    this.clickCount = 0;
  }

  public clearAllandStartNew() {
    // Lösche alle vorherigen Elemente hier
    this.scene.children.removeAll();
    this.scene.add.image(0, -10, 'hintergrundwiese').setOrigin(0).setScale(0.214);
    this.correctAnswersCount = 1;
    this.stars = [];
    this.currentItemKey = this.getRandomItemKey();
    this.generateItemsInScene();
    this.createQuestionButton();
  }
}
