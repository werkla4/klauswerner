import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-timeline-small-box',
  templateUrl: './timeline-small-box.component.html',
  styleUrls: ['./timeline-small-box.component.scss']
})
export class TimelineSmallBoxComponent implements OnInit {
  @Input() title: string = "";
  @Input() codeStyle: string = "";

  constructor() { }

  ngOnInit(): void {

  }

}
