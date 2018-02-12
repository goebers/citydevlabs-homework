import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-moviepage',
  templateUrl: './moviepage.component.html',
  styleUrls: ['./moviepage.component.scss']
})
export class MoviepageComponent implements OnInit {

  constructor(public dataservice: DatabaseService) { }

  moviesCount: number;
  movieAverage: any;

  movieData: any;
  commentData: any;

  lightBox = false;
  userLightBox = false;
  lightBoxImg: any;
  lightBoxMovie: any;
  lightBoxMovieSynopsis: any;

  movieId: number; // movie id that we get from image click
  commentId: number; // commentId that we determine for a new comment

  userName: string;
  usersComments: any;

  newUser: string;
  newComment: string;
  newRating: any;

  ngOnInit() {
    // get all movies
    this.dataservice.getMovies().valueChanges().subscribe( data => {
      console.log(data); // debuggings
      this.moviesCount = data.length; // save movie count for later
      this.movieData = data;
    })

  }

  // subscribe and get all movie comments with specified id for the lightbox view
  showLightBox(id) {
    this.dataservice.getComments().valueChanges().subscribe ( data => {

      console.log(data);
      this.commentId = data.length;

      this.commentData = data.filter( fil => fil.movieId == id);
      console.log(this.commentData);

      var total = 0; // total number of rating
      for(var i=0; i < this.commentData.length; i++) {
        console.log(this.commentData[i].rating);
        total = total + parseInt(JSON.stringify(this.commentData[i].rating));
      }

      console.log('total rating: ' + total);

      this.movieAverage = total / this.commentData.length; // calulate user avg rating

      this.movieId = id;

      this.lightBoxImg = this.movieData[id].image;
      this.lightBoxMovie = this.movieData[id].name;
      this.lightBoxMovieSynopsis = this.movieData[id].synopsis;
      
      this.lightBox = true;

    })
  }

  userReviews(usr: string) {
    console.log(usr);
    this.userName = usr;
    this.userLightBox = true;
    this.userComments(usr, this.movieId);
  }

  userComments(usr: string, movieID: number) {
    this.dataservice.getComments().valueChanges().subscribe( data => {
      //console.log(data);
      this.usersComments = data.filter( fil => fil.username == usr);
      console.log(this.usersComments);

    });
  }

  getComment() {
    this.dataservice.getComments().valueChanges().subscribe(data => this.commentId = data.length); // check correct comment id before sending
    console.log(this.commentId);
    this.newRating = parseInt(this.newRating);
    this.dataservice.sendNewComment(this.newComment, this.newUser, this.newRating, this.movieId, this.commentId);
    this.eraseInputs();
  }

  closeLightBox() {
    this.lightBox = false;
    this.eraseInputs();
  }

  closeUserLightBox() {
    this.userLightBox = false;
    this.eraseInputs();
  }

  eraseInputs() {
     this.newUser = '';
     this.newComment = '';
  }

}
