import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @HostListener('window:scroll') onScroll(): void {
    this.scrolling();
  }

  @Input() darkMode: boolean;
  public activeLink: string;
  showMobileMenu = false;
  navbarFocused = false;
  manuelScrolling = true;
  currentWebside = "Home";

  items: any = [
    { title: "Home", id: "slideshow" },
    { title: "Me", id: "my-person" },
    { title: "References", id: "references" },
    { title: "Contact", id: "contact-form" },
    { title: "Imprint", id: "imprint" }
  ];

  constructor(public router: Router) {
    this.darkMode = false;
    this.activeLink = '/';
  }

  ngOnInit(): void {
    this.addSelectedProperty(0);
  }

  clickMenuLogo() {
    this.showMobileMenu = !this.showMobileMenu;

    if (this.showMobileMenu) {
      this.navbarFocused = true;
    }
  }

  scrolling() {
    if (this.manuelScrolling) {
      this.updateSelectedMenuOnScroll();
    }
  }

  updateSelectedMenuOnScroll() {
    let selectIndx = -1;

    if (this.slideshowFullInWindow()) {
      selectIndx = 0;
    }
    for (let i = 1; i < this.items.length; i++) {
      if (this.elementFullInWindow(this.items[i].id)) {
        selectIndx = i;
      }
    }
    if (selectIndx > -1) {
      this.updateSelectProperty(selectIndx);
    }
  }

  slideshowFullInWindow() {
    const elm = document.getElementById("slideshow");
    if (elm) {
      const elmTop = window.innerHeight * -1;
      const documentY = elm.getBoundingClientRect().y;

      if (documentY > elmTop && documentY < 0) {
        return true;
      }
    }
    return false;
  }

  elementFullInWindow(id: string) {
    const elm = document.getElementById(id);
    if (elm) {
      const windowHeight = window.innerHeight;
      const documentY = elm.getBoundingClientRect().y;
      const inWindow = windowHeight - elm.clientHeight;

      if (documentY < inWindow && documentY > 0) {
        return true;
      }
    }
    return false;
  }

  scrollTo(index: number) {
    let delay = 0;

    if (this.currentWebside == "Imprint") {
      delay = 500;
    }

    setTimeout(() => {
      let elm = document.getElementById(this.items[index].id);

      if (elm) {
        elm.scrollIntoView({ behavior: "smooth" });
      }
    }, delay);
  }

  hideSelectedPropertyOfAllItems() {
    for (let i = 0; i < this.items.length; i++) {
      let elm = document.getElementById(`item${i}`);
      if (elm) {
        elm.classList.remove('nav-item-selected');
      }
    }
  }

  navbarUnfocused() {
    this.showMobileMenu = false;
    this.navbarFocused = false;
  }

  updateSelectProperty(index: number) {
    this.hideSelectedPropertyOfAllItems();
    this.addSelectedProperty(index);
  }

  goToImprintWebside() {
    this.router.navigate(['/imprint']);
  }

  goToStartWebside() {
    this.router.navigate(['/']);
  }

  itemClick(index: number) {
    if (this.items[index].title == "Imprint") {
      this.goToImprintWebside();
    }
    else {
      this.goToStartWebside();
      this.scrollTo(index);
      setTimeout(() => {
        this.manuelScrolling = true;
      }, 800);
    }
    this.updateSelectProperty(index);
    this.navbarFocused = true;
    this.manuelScrolling = false;
  }

  addSelectedProperty(index: number) {
    let elm = document.getElementById(`item${index}`);

    if (elm) {
      elm.classList.add('nav-item-selected');
    }
  }

  addSelectedPropertyWithId(id: string) {
    let elm = document.getElementById(id);

    if (elm) {
      elm.classList.add('nav-item-selected');
    }
  }
}
