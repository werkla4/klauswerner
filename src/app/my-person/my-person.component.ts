import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-person',
  templateUrl: './my-person.component.html',
  styleUrls: ['./my-person.component.scss']
})
export class MyPersonComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
    
  }

  scrollToContactForm(){
    let elm = document.getElementById('contact-form');

    if(elm){
      elm.scrollIntoView({behavior: "smooth"});
    }    
  }
}
