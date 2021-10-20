import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-timeline-small-box-mobile',
  templateUrl: './timeline-small-box-mobile.component.html',
  styleUrls: ['./timeline-small-box-mobile.component.scss']
})
export class TimelineSmallBoxMobileComponent implements OnInit {
  @Input() title: string = "";
  @Input() codeStyle: string = "";

  constructor() { }

  ngOnInit(): void {
  }

}
