import { Component } from '@angular/core';
import {SessionRPE, Wellness} from 'pmsys';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  wellness = Wellness.fromBasicValues( new Date(), 1, 1, 1, 1, 1,  [], 1, 1);
  rpe =  SessionRPE.fromBasicValues(['chore'], new Date(), 10, 4);
}
