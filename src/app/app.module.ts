import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { EventPageComponent } from './pages/event-page/event-page.component';
import { EventDetailsComponent } from './pages/event-details/event-details.component';
import { HttpClientModule } from '@angular/common/http';
import { EventCardComponent } from './event-card/event-card.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule, Routes } from '@angular/router';
import { LinkToComponent } from './link-to/link-to.component';


const routes: Routes = [
  { path: '', component: EventPageComponent },
  { path: 'details', component: EventDetailsComponent },
]; 

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    EventPageComponent,
    EventDetailsComponent,
    EventCardComponent,
    FooterComponent,
    LinkToComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
