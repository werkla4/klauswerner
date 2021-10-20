import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SlideshowComponent } from './slideshow/slideshow.component';
import { HeaderComponent } from './header/header.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ImprintComponent } from './imprint/imprint.component';
import { StartPageComponent } from './start-page/start-page.component';
import { MyPersonComponent } from './my-person/my-person.component';
import { TimelineComponent } from './timeline/timeline.component';
import { TimelineSmallBoxComponent } from './timeline-small-box/timeline-small-box.component';
import { TimelineSmallBoxMobileComponent } from './timeline-small-box-mobile/timeline-small-box-mobile.component';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    SlideshowComponent,
    HeaderComponent,
    ImprintComponent,
    StartPageComponent,
    MyPersonComponent,
    TimelineComponent,
    TimelineSmallBoxComponent,
    TimelineSmallBoxMobileComponent,
    ContactFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
