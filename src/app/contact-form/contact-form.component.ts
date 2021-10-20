import { HttpClient } from '@angular/common/http';
import { Component, HostListener, OnInit } from '@angular/core';

interface mailStruct {
  name: string;
  message: string;
}

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})

export class ContactFormComponent implements OnInit {
  @HostListener('window:scroll') onScroll(): void {
    if (this.fullContactCardInWindow()) {
      if (this.mailState == "default")
        this.firstOpenMailAnimation();
    }
  }
  mailState: string = "default";
  sendMailState: boolean = false;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.showDefaultMail();
  }

  getMailData() {
    let data: any = { name: "HOMEPAGE-Bewerbung-MAIL" };
    const inputTxt: any = document.getElementById('input-text');
    if (inputTxt) {
      data["message"] = inputTxt.value;
    }
    return data;
  }

  async sendMail(url: string, data: mailStruct) {
    (async () => {
      const rawResponse = await fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (rawResponse.statusText == "OK") {
        this.sendMailState = true;
      }
      else {
        this.sendMailState = false;
      }
    })();
  }

  mailDataValid(data: mailStruct) {
    if (data.message == "") {
      return false;
    }
    return true;
  }

  mail() {
    let url = "http://klaus-werner.developerakademie.com/klauswerner/send_mail.php";
    let data = this.getMailData();

    if (this.mailDataValid(data)) {
      this.sendMail(url, data);
      this.sendMailAnimation();
    }
  }

  sendMailAnimation() {
    this.mailState = "animationWorks";
    this.moveMailToRightTop();
    setTimeout(() => {
      this.removeEnvelopeOverAll();
      this.moveMailToRightBottom();
    }, 1000);
    setTimeout(() => {
      this.closeEnvelope();
    }, 2000);
    setTimeout(() => {
      this.flyAwayEnvelope();
      this.hideLetter();
    }, 3300);
    setTimeout(() => {
      this.comeBackEnvelope();
    }, 5000);
    setTimeout(() => {
      this.displayLetter();
      this.writeMailStateInLetter();
      this.openEnvelope();
    }, 6000);
    // setTimeout(() => {
    //   this.writeMailStateInLetter();
    //   this.openEnvelope();
    // }, 7000); 
    setTimeout(() => {
      this.moveMailToRightTop();
    }, 7000);
    setTimeout(() => {
      this.setEnvelopeOverAll();
      this.showLargeLetterMiddle();
    }, 8000);
    setTimeout(() => {
      this.mailState = "showSendMailState";
    }, 9000);
  }

  setEnvelopeOverAll(){
    let elm = document.getElementById('envelope');
    if(elm){
      elm.classList.add('envelope-over-all');
    }
  }

  removeEnvelopeOverAll(){
    let elm = document.getElementById('envelope');
    if(elm){
      elm.classList.remove('envelope-over-all');
    }
  }

  setLetterTitle(text: string) {
    const elm = document.getElementById('letter-title');
    if (elm) {
      elm.innerHTML = text;
    }
  }

  setLetterText(text: string) {
    const elm: any = document.getElementById('input-text');
    if (elm) {
      elm.value = text;
    }
  }

  getTextSendMailWorks(){
    return "Your message has come to me successfully.\nThank you for your interest and i will contact you immediately.\nHave a wonderful time, see you soon.\nBest regards Klaus Werner";
  }

  getTextSendMailDontWorks(){
    return "The transfer of the mail was not successful.\n\nTry it again.";
  }

  setSendMailStateToDefault(){
    this.sendMailState = false;
  }

  writeMailStateInLetter() {
    // mail is send
    if (this.sendMailState) {
      this.setLetterTitle("Thank you");
      this.setLetterText(this.getTextSendMailWorks());
    }
    // mail not send
    else{
      this.setLetterTitle("Something went wrong!");
      this.setLetterText(this.getTextSendMailDontWorks());
    }
    this.setSendMailStateToDefault();
  }

  displayLetter() {
    let letter = document.getElementById('letter');
    let envelope = document.getElementById('envelope');

    if (letter && envelope) {
      // hide flicker  
      envelope.style.zIndex = "300";

      letter.classList.remove('d-none');
      // hide flicker
      envelope.style.zIndex = "unset";
    }
  }

  hideLetter() {
    let letter = document.getElementById('letter');

    if (letter) {
      letter.classList.add('d-none');
    }
  }

  comeBackEnvelope() {
    let envelope = document.getElementById('envelope');

    if (envelope) {
      envelope.classList.remove('fly-away');
    }
  }

  flyAwayEnvelope() {
    let envelope = document.getElementById('envelope');

    if (envelope) {
      envelope.classList.add('fly-away');
    }
  }

  firstOpenMailAnimation() {
    this.mailState = "animationWorks";
    this.openEnvelope();
    setTimeout(() => {
      this.moveMailToRightTop();
    }, 500);
    setTimeout(() => {
      this.showLargeLetterMiddle();
      this.setEnvelopeOverAll();
    }, 1500);
    setTimeout(() => {
      this.writeInfoTextInLetter();
    }, 2700);
    setTimeout(() => {
      this.mailState = "showInfoText";
    }, 7700);
  }

  calcCharWritingTime(infoText: string[], writeTime: number) {
    let sumChars = 0;
    for (let txt of infoText) {
      sumChars += txt.length;
    }
    let charTime = (writeTime / sumChars).toFixed();
    return charTime;
  }

  runWriteTextAnimation(infoText: string[], charTime: number) {
    const elm: any = document.getElementById('input-text');
    if (elm) {
      let charId = 1;
      for (let rowIndx = 0; rowIndx < infoText.length; rowIndx++) {
        for (let charIndx = 0; charIndx < infoText[rowIndx].length; charIndx++) {
          // new row
          if (charIndx == infoText[rowIndx].length - 1) {
            setTimeout(() => {
              elm.value += infoText[rowIndx][charIndx] + "\n";
            }, charId * charTime);
          }
          else {
            setTimeout(() => {
              elm.value += infoText[rowIndx][charIndx];
            }, charId * charTime);
          }
          charId++;
        }
      }
    }
  }

  getInfoText() {
    return [
      "Please write here your message/question",
      "with your contact details.",
      "To send, click on the envolope.",
      "I will contact you as well.",
      "Best regards Klaus Werner"];
  }

  writeInfoTextInLetter() {
    const writeTime: number = 5000;
    const infoText: string[] = this.getInfoText();

    const charTime: any = this.calcCharWritingTime(infoText, writeTime);
    this.runWriteTextAnimation(infoText, charTime);
  }

  showDefaultMail() {
    let letter = document.getElementById('letter');
    let mailTop = document.getElementById('top-svg');
    let mailTopIndx = document.getElementById('top');

    if (letter && mailTop && mailTopIndx) {
      letter.classList.add('letter-small-right-bottom');
      mailTop.classList.add('close-letter');
      mailTopIndx.classList.add('letter-top-show');
    }
  }

  showLargeLetterMiddle() {
    let letter = document.getElementById('letter');

    if (letter) {
      letter.classList.remove('letter-small-right-top');
    }
  }

  moveMailToRightTop() {
    let letter = document.getElementById('letter');

    if (letter) {
      letter.classList.remove('letter-small-right-bottom');
      letter.classList.add('letter-small-right-top');
    }
  }

  moveMailToRightBottom() {
    let letter = document.getElementById('letter');

    if (letter) {
      letter.classList.add('letter-small-right-bottom');
      letter.classList.remove('letter-small-right-top');
    }
  }

  openEnvelope() {
    let mailTop = document.getElementById('top-svg');

    if (mailTop) {
      mailTop.classList.remove('close-letter');
      // 
      setTimeout(() => {
        let mailTopIndx = document.getElementById('top');
        if (mailTopIndx) {
          mailTopIndx.classList.remove('letter-top-show');
        }
      }, 500);
    }
  }

  closeEnvelope() {
    let mailTop = document.getElementById('top-svg');

    if (mailTop) {
      mailTop.classList.add('close-letter');
      // 
      setTimeout(() => {
        let mailTopIndx = document.getElementById('top');
        if (mailTopIndx) {
          mailTopIndx.classList.add('letter-top-show');
        }
      }, 500);
    }
  }

  clearTextarea() {
    const elm: any = document.getElementById('input-text');
    if (elm) {
      elm.value = "";
    }
  }

  clickOnTextarea() {
    if (this.mailState == "showInfoText") {
      this.clearTextarea();
      this.mailState = "waitingForUserInput";
    }
    if (this.mailState == "showSendMailState") {
      this.setLetterTitle("Your message");
      this.clearTextarea();
      this.mailState = "waitingForUserInput";
    }
  }

  // envelope = Briefkuvert
  envelopeClick() {
    if (this.mailState == "waitingForUserInput") {
      this.mail();
    }
  }

  fullContactCardInWindow() {
    const elm = document.getElementById('middle-id');
    if (elm) {
      const windowHeight = window.innerHeight;
      const documentY = elm.getBoundingClientRect().y;
      const inWindow = windowHeight - 320;
      if (documentY < inWindow) {
        return true;
      }
    }
    return false;
  }
}
