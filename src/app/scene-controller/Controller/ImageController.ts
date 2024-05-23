export class ImageController {
  private static instance: ImageController;
  private imageFiles: { [key: string]: string } = {};

  private constructor() {}

  public static getInstance(): ImageController {
    if (!ImageController.instance) {
      ImageController.instance = new ImageController();
    }
    return ImageController
      .instance;
  }

  public preloadImage(scene: Phaser.Scene): void {

    for (let i = 0; i <= 9; i++) {
      const key = `${i}`;
      const file = `assets/numbers/${i}.png`;
      scene.load.image(key, file);
    }

    // load audio
    const imageFiles = [

      //scene 1
      { key: 'apfel', file: 'assets/bilder/apfel.png'},
      { key: 'blauessquare', file: 'assets/bilder/blauessquare.png'},
      { key: 'hintergrundwiese', file: 'assets/hintergrund/wiese.jpg'},
      { key: 'strawberry', file: 'assets/bilder/strawberry.png'},

      //scene 2
      { key: 'kleinerals', file: 'assets/operationen/kleinerals.png'},
      { key: 'groesserals', file: 'assets/operationen/groesserals.png'},
      { key: 'hintergrundblume', file: 'assets/hintergrund/blumen.jpg'},
      { key: 'gehirnmengen', file: 'assets/bilder/gehirnmengen.png'},

      //scene 3
      { key: 'plus', file: 'assets/operationen/plus.png'},
      { key: 'hintergrundwald', file: 'assets/hintergrund/wald.jpg'},


      //generally
      { key: 'square', file: 'assets/operationen/square.png'},
      { key: 'gleich', file: 'assets/operationen/gleich.png'},
      { key: 'gehirn', file: 'assets/animations/gehirn.png'},
      { key: 'gehirnfragezeichen', file: 'assets/animations/gehirnfragezeichen.png'},
      { key: 'gehirnsuper', file: 'assets/animations/gehirnsuper.png'},
      { key: 'star', file: 'assets/animations/star.png'},

      { key: 'istgleich', file: 'assets/operationen/istgleich.png'},

      { key: 'daumenhoch', file: 'assets/bilder/daumen_hoch.png'},
      { key: 'daumenrunter', file: 'assets/bilder/daumen_runter.png'},



      //numbers

    ];

    imageFiles.forEach(image => {
      scene.load.image(image.key, image.file);
    });
  }

  public showImageByKey(scene: Phaser.Scene, key: string, x: number, y: number, scale: number = 1): Phaser.GameObjects.Image | null {
    if (scene.textures.exists(key)) {
      const image = scene.add.image(x, y, key).setScale(scale);
      return image;
    } else {
      console.error(`Bilddatei mit dem Schlüssel "${key}" nicht gefunden.`);
      return null;
    }
  }


}
