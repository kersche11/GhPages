import { Component } from '@angular/core';
import {Router} from "@angular/router"; //um die routing Funktion von Angular zu nutzen
import { Location } from '@angular/common';
import {AudioController} from "../scene-controller/Controller/AudioController";
@Component({ //Dekorator
  selector: 'app-toolbar', //gibt an wie die Komponente in der HTML - Datei referenziert wird
  templateUrl: './toolbar.component.html',//HTML- Datei die als Ansicht verwendet wird
  styleUrls: ['./toolbar.component.scss'] //CSS - Datei für die Gestaltung der Komponenten
})
export class ToolbarComponent {

  constructor(private router: Router) {} //brauche den Router für die goBack Funktion, da es wohin navigieren soll

  goBack() {
    AudioController.getInstance().destroyAllAudio();
    AudioController.getInstance().stopAllAudio();
    this.router.navigate(['']); // Navigate to the root URL (customize as needed)

  }

  playAudioToolbar(){
    let audioPath: string;
    audioPath = '/assets/sounds/toolbar.mp3';

    const newAudio = new Audio(audioPath);
    newAudio.play();
  }
}
