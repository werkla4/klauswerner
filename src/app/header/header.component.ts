import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public activeLink: string;
  @Input() darkMode: boolean;

  constructor(public router: Router) { 
    this.darkMode = false;
    this.activeLink = '/'; 
  }

  ngOnInit(): void {
      
  }
}
