import { MoviepageComponent } from './moviepage/moviepage.component';
import { query } from '@angular/core/src/render3/instructions';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList  } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

@Injectable()
export class DatabaseService {

  constructor(private db: AngularFireDatabase) { }

  movies: AngularFireList<any>;
  comments: AngularFireList<any>;

  // returns observable of movies
  getMovies() {
    this.movies = this.db.list('/movie');
    return this.movies;
  }

  // returns observable of comments
  getComments() {
    this.comments = this.db.list('/movieComments/');
    return this.comments;
  }

  // adds new comment to database
  sendNewComment(comment: string, usr: string, rating: string, movieId: number, commentId: number): boolean {
    var ref = firebase.database().ref();
    
    var base = '/movieComments/' + commentId;

    ref.child(base + '/comment').set(comment);
    ref.child(base + '/commentId').set(commentId);
    ref.child(base + '/movieId').set(movieId);
    ref.child(base + '/rating').set(rating);
    ref.child(base + '/username').set(usr);

    return true;
   }
}
