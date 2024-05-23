export class AudioController {
  private static instance: AudioController;
  private audioFiles: { [key: string]: Phaser.Sound.BaseSound } = {};

  private constructor() {}

  public static getInstance(): AudioController {
    if (!AudioController.instance) {
      AudioController.instance = new AudioController();
    }
    return AudioController.instance;
  }

  public preloadAudio(scene: Phaser.Scene): void {
    // load audio
    const audioFiles = [
      //scene 1

      { key: 'zahlenerkl', file: 'assets/sounds/scene_1/zahlen_erkl.mp3' },
      { key: 'zahlentext', file: 'assets/sounds/scene_1/zahlen_text.mp3'},

      //scene 2
      { key: 'groesserals', file: 'assets/sounds/groesserals.mp3' },
      { key: 'kleinerals', file: 'assets/sounds/kleinerals.mp3' },
      { key: 'mengenerkl', file: 'assets/sounds/scene_2/mengen_erkl.mp3' },
      { key: 'mengentext', file: 'assets/sounds/scene_2/mengen_text.mp3' },


      //scene 3
      { key: 'pluserkl', file: 'assets/sounds/plus_erkl.mp3' },
      { key: 'plus_scene3', file: 'assets/sounds/plus_scene3.mp3' },
      { key: 'plusoperation', file: 'assets/sounds/plus.mp3' },


      //generally
      { key: 'nochmalspielen', file: 'assets/sounds/nochmal_spielen.mp3'},
      { key: 'rightanswer', file: 'assets/sounds/rightanswer.mp3' },
      { key: 'istgleich', file: 'assets/sounds/istgleich.mp3' },

      //numbers
      { key: '0', file: 'assets/sounds/zahlen/0.mp3'},
      { key: '1', file: 'assets/sounds/zahlen/1.mp3'},
      { key: '2', file: 'assets/sounds/zahlen/2.mp3'},
      { key: '3', file: 'assets/sounds/zahlen/3.mp3'},
      { key: '4', file: 'assets/sounds/zahlen/4.mp3'},
      { key: '5', file: 'assets/sounds/zahlen/5.mp3'},
      { key: '6', file: 'assets/sounds/zahlen/6.mp3'},
      { key: '7', file: 'assets/sounds/zahlen/7.mp3'},
      { key: '8', file: 'assets/sounds/zahlen/8.mp3'},
      { key: '9', file: 'assets/sounds/zahlen/9.mp3'},

    ];

    audioFiles.forEach(audio => {
      scene.load.audio(audio.key, audio.file);
    });
  }



  public playAudioByKey(scene: Phaser.Scene, key: string): void {
    let audio = this.audioFiles[key];
    if (!audio) {
      // Versuche, das Audio-Objekt zu laden
      audio = scene.sound.add(key);
      if (audio) {
        this.audioFiles[key] = audio;
      } else {
        console.error(`Fehler: Audio-Objekt konnte für den Schlüssel '${key}' nicht geladen werden.`);
        return;
      }
    }
    audio.play();
  }


  public stopAllAudio(): void {
    for (const key in this.audioFiles) {
      if (this.audioFiles[key].isPlaying) {
        this.audioFiles[key].stop();
      }
    }
  }

  public destroyAllAudio(): void {
    for (const key in this.audioFiles) {
      this.audioFiles[key].destroy();
      delete this.audioFiles[key];
    }
  }

}
