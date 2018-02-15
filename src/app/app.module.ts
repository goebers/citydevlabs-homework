import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { MoviepageComponent } from './moviepage/moviepage.component';
import { HttpClientModule } from '@angular/common/http';
import { DatabaseService } from './database.service';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';
import { AngularFirestore } from 'angularfire2/firestore';
import { RatingroundPipe } from './ratinground.pipe';


@NgModule({
  declarations: [
    AppComponent,
    MoviepageComponent,
    RatingroundPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  providers: [DatabaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }