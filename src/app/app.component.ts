import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(public router: Router){}
  title = "klauswerner";

  scrollToId(id: string){
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }
}
