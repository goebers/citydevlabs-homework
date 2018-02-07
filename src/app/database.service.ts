import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFireDatabase, AngularFireList  } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

@Injectable()
export class DatabaseService {

  constructor(private http: HttpClient, private db: AngularFireDatabase) { }

  movies: AngularFireList<any>;

  getMovies() {
    this.movies = this.db.list('/movie');
    return this.movies;
  }

}
