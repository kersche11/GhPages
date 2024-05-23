export class StarController {
  private scene: Phaser.Scene;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
  }

  public addStar(correctAnswersCount: number, stars: Phaser.GameObjects.Image[]) {
    const centerX = this.scene.cameras.main.width / 2;
    const starOffset = 100; // Abstand zwischen den Sternen

    const starX = centerX - 550 + correctAnswersCount * starOffset; // Startposition X des ersten Sterns
    const starY = 70 ; // Y-Position basierend auf der Anzahl der korrekten Antworten

    const star = this.scene.add.image(starX, starY, 'star').setScale(0.1);

    // Sound abspielen
    const sound_wow =  this.scene.sound.add('rightanswer');
    sound_wow.play();

    // Zum Array hinzufügen
    stars.push(star);
  }
}
