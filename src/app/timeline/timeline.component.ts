import { Component, OnInit } from '@angular/core';

interface ITimeline {
  title: string;
  description: string;
  codeStyle: string;
  link: string;
  imgPath: string;
}

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})

export class TimelineComponent implements OnInit {
  references: any[] = [];
  currentIndex: number = 0;
  lastClick: number = new Date().getTime();
  play: boolean = true;
  refAnimationId: any = -1;

  constructor() {
  }

  ngOnInit(): void {
    this.loadReferences();
    this.setMobileTimelineProperty();
    this.startReferenceAnimation();
  }



  mtExistAllElements() {
    for (let i = 0; i < this.references.length; i++) {
      let id = `mt${i}`;
      if (!document.getElementById(id)) {
        // element not exist !
        return false;
      }
    }
    // element exist
    return true;
  }

  clearAllPropertysMobileTimeline() {
    for (let i = 0; i < this.references.length; i++) {
      let id = `mt${i}`;
      const elm = document.getElementById(id);
      if (elm) {
        elm.classList.remove('pos-m');
        elm.classList.remove('pos-ml');
        elm.classList.remove('pos-mr');
      }
    }
  }

  updatePropertysMobileTimeline() {
    // get elm indexes
    let lIndx = this.currentIndex - 1;
    let mIndx = this.currentIndex;
    let rIndx = (this.currentIndex + 1) % this.references.length;
    // prevent array boundery
    if (lIndx < 0) { lIndx = this.references.length - 1; }
    // set propertys:
    const lElm = document.getElementById(`mt${lIndx}`);
    if (lElm) {
      lElm.classList.add('pos-ml');
    }
    const mElm = document.getElementById(`mt${mIndx}`);
    if (mElm) {
      mElm.classList.add('pos-m');
    }
    const rElm = document.getElementById(`mt${rIndx}`);
    if (rElm) {
      rElm.classList.add('pos-mr');
    }
  }

  setMobileTimelineProperty() {
    if (this.mtExistAllElements()) {
      this.clearAllPropertysMobileTimeline();
      this.updatePropertysMobileTimeline();
    }
    // wait for rendering the elements, check in 100ms again
    else {
      setTimeout(() => {
        this.setMobileTimelineProperty();
      }, 100);
    }
  }

  hideHoverInfo() {
    let elm = document.getElementById('hover-info');

    if (elm) {
      elm.classList.add('hide-hover-info');
    }
  }

  updateCarousel(indx: number) {
    this.currentIndex = indx;
    this.setMobileTimelineProperty();
  }

  setNextCurrentIndex() {
    this.currentIndex = (this.currentIndex + 1) % this.references.length;
  }

  clearAllSelectedProperties() {
    for (let i = 0; i < this.references.length; i++) {
      let leftSide1 = document.getElementById(`left-side1-${i}`);
      let leftSide2 = document.getElementById(`left-side2-${i}`);
      let rightSide = document.getElementById(`right-side-${i}`);

      if (leftSide1) { leftSide1.classList.remove('ref-selected'); }
      if (leftSide2) { leftSide2.classList.remove('ref-selected'); }
      if (rightSide) { rightSide.classList.remove('ref-selected'); }
    }
  }

  setCurrentSelectedProperty() {
    let leftSide1 = document.getElementById(`left-side1-${this.currentIndex}`);
    let leftSide2 = document.getElementById(`left-side2-${this.currentIndex - 3}`);
    let rightSide = document.getElementById(`right-side-${this.currentIndex - 3}`);

    if (leftSide1) { leftSide1.classList.add('ref-selected'); }
    if (leftSide2) { leftSide2.classList.add('ref-selected'); }
    if (rightSide) { rightSide.classList.add('ref-selected'); }
  }

  clickOnReference(index: number) {
    this.currentIndex = index;
    this.updateSelectedReference();
  }

  updateSelectedReference() {
    this.clearAllSelectedProperties();
    this.setCurrentSelectedProperty();
  }

  updateAllTimelines() {
    this.updateCarousel(this.currentIndex);
    this.updatePropertysMobileTimeline();
    this.updateSelectedReference();
  }

  updateLeftSideNr() {
    let side2 = document.getElementById('btn-side2');

    if (side2) {
      // check for sideable timeline
      if (window.getComputedStyle(side2).display == "flex") {
        if (this.currentIndex < 3) {
          this.showSide(1);
        }
        else if (this.currentIndex >= 3 && this.currentIndex < this.references.length) {
          this.showSide(2);
        }
      }
      else {
        this.showSide(1);
      }
    }
  }

  startReferenceAnimation() {

    setTimeout(() => {
      this.setNextCurrentIndex();
      this.updateAllTimelines();
      this.updateLeftSideNr();
    }, 1000);

    this.refAnimationId = setInterval(() => {
      this.setNextCurrentIndex();
      this.updateAllTimelines();
      this.updateLeftSideNr();
    }, 4000);
  }

  stopReferenceAnimation() {
    clearInterval(this.refAnimationId);
  }

  btnClickPlay() {
    // stop and play
    this.play = !this.play;

    if (this.play) {
      this.startReferenceAnimation();
    }
    else {
      this.stopReferenceAnimation();
    }
  }

  showSide1() {
    let side1 = document.getElementById('side1');
    let side2 = document.getElementById('side2');
    if (side1 && side2) {
      side1.classList.remove('side1-move-left');
      side2.classList.remove('side2-move-middle');
    }
  }

  showSide2() {
    let side1 = document.getElementById('side1');
    let side2 = document.getElementById('side2');
    if (side1 && side2) {
      side1.classList.add('side1-move-left');
      side2.classList.add('side2-move-middle');
    }
  }

  markBtnSideSelected(sideNr: number) {
    let btn1 = document.getElementById('btn-side1');
    let btn2 = document.getElementById('btn-side2');
    if (btn1 && btn2) {
      if (sideNr == 1) {
        btn1.classList.add('btn-side-selected');
        btn2.classList.remove('btn-side-selected');
      }
      if (sideNr == 2) {
        btn1.classList.remove('btn-side-selected');
        btn2.classList.add('btn-side-selected');
      }
    }
  }

  showSide(sideNr: number) {
    if (sideNr == 1) {
      this.showSide1();
    }
    else if (sideNr == 2) {
      this.showSide2();
    }
    this.markBtnSideSelected(sideNr);
  }

  addReference(data: ITimeline) {
    this.references.push(data);
  }

  loadReferences() {
    this.addReference({
      title: "El Pollo Loco",
      description: "",
      codeStyle: "Javascript | Class-Structure",
      link: "http://klaus-werner.developerakademie.com/EL_POLLO_LOCO/index.html",
      imgPath: "../../assets/img/previewElPolloLoco.png"
    });
    this.addReference({
      title: "Quizz-App",
      description: " ",
      codeStyle: "HTML | CSS | Javascript",
      link: "http://klaus-werner.developerakademie.com/QuizApp/indx.html",
      imgPath: "../../assets/img/previewQuizzApp.png"
    });
    this.addReference({
      title: "Ring Of Fire",
      description: "",
      codeStyle: "HTML | CSS | Javascript | Firebase",
      link: "http://klaus-werner.developerakademie.com/ringoffire/index.html",
      imgPath: "../../assets/img/previewRingOfFire.png"
    });
    this.addReference({
      title: "KanBan-Board",
      description: "",
      codeStyle: "HTML | CSS | Javascript",
      link: "http://klaus-werner.developerakademie.com/KanBan_group69/index/index.html",
      imgPath: "../../assets/img/previewKanBanBoard.png"
    });
    this.addReference({
      title: "Little-Insta",
      description: "",
      codeStyle: "HTML | CSS | Javascript",
      link: "http://klaus-werner.developerakademie.com/Little_Insta/index.html",
      imgPath: "../../assets/img/previewInsta.png"
    });
    this.addReference({
      title: "Slack-Chat",
      description: "",
      codeStyle: "ANGULAR | Firebase | Javascript | HTML | SCSS",
      link: " HERE IS THE VIDEO LINK ... ",
      imgPath: "../../assets/img/previewChat.png"
    });

  }
}
