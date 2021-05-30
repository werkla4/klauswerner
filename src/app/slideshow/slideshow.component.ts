import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.scss']
})
export class SlideshowComponent implements OnInit {

  constructor() { }

  images = ['glassespc.jpg', 'laptoptable.jpg', 'yougotthis.jpg'];
  headlines = ['Bring the engeneering to the next level', 'Born to code', 'Simplicity is the soul of efficiency'];
  currentImage = 0;
  showImage = true;

  ngOnInit(){
    this.updateImage();
  }

  updateImage(){
    setInterval(()=>{
      this.currentImage++;
      this.currentImage = this.currentImage % this.images.length;
      this.showImage = false;
      setTimeout(()=>{
        this.showImage = true;
      }, 10);
    }, 8000);
  }
}
