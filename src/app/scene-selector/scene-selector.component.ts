import {Component, OnInit} from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-scene-selector',
  templateUrl: './scene-selector.component.html',
  styleUrls: ['./scene-selector.component.scss']
})

export class SceneselectorComponent {



  currentAudio: HTMLAudioElement | null = null;

  items = [ // ein Array das eine Liste von Objekten enthält
    {
      title: 'Zahlen',
      subtitle: '0 - 9',
      description: 'Lerne hier die Zahlen von 0 bis 9 kennen',
      sceneNum: '1'
    },
    {
      title: 'Mengen',
      subtitle: '< , = , >',
      description: 'Lerne hier die Mengen und ihre Symbole kennen',
      sceneNum: '2'
    },
    {
      title: 'Plus',
      subtitle: '+',
      description: 'Lerne hier einfache Plusrechnungen zu lösen',
      sceneNum: '3'
    }

  ];

  constructor(private router: Router) { }

  startScene(sceneNum: string) {
    //audio start
    let audioPath: string;
    audioPath = '/assets/sounds/scene_selector/start.mp3';

    // Beende das aktuelle Audio, wenn es existiert
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio = null;
    }

    const playAudio = new Audio(audioPath);
    playAudio.play();

    //sceneNumber
    const numericSceneNum = +sceneNum; // Konvertiere den String in eine Zahl
    this.router.navigate(['/scene', numericSceneNum]);
  }

  getImagePath(sceneNum: number): string {
    switch (sceneNum) {
      case 1:
        return '/assets/bilder/zahlensele.png';
      case 2:
        return '/assets/bilder/waage.png';
      case 3:
        return '/assets/bilder/einkaufswagen.png';
      // Weitere Fälle für andere Szenen hinzufügen, wenn nötig
      default:
        return '';
    }
  }

  playAudio(sceneNum: number): void {
    // Beende das aktuelle Audio, wenn es existiert
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio = null;
    }

    // Code zum Abspielen der Audio
    let audioPath: string;
    switch (sceneNum) {
      case 1:
        audioPath = '/assets/sounds/scene_selector/zahlen.mp3';
        break;
      case 2:
        audioPath = '/assets/sounds/scene_selector/mengen.mp3';
        break;
      case 3:
        audioPath = '/assets/sounds/scene_selector/plus.mp3';
        break;

      default:
        return;
    }

    // Erstelle eine neue Audio-Instanz und spiele sie ab
    const newAudio = new Audio(audioPath);
    newAudio.play();

    // Setze die aktuelle Audio-Instanz auf die neue Instanz
    this.currentAudio = newAudio;
  }


}

