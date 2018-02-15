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

  // variables that hold json data fetched from server
  movieData: any;
  commentData: any;

  // variables that dictate the visibility of lightboxes
  lightBox = false;
  userLightBox = false;

  // variables for the movie lightbox
  lightBoxImg: any;
  lightBoxMovie: any;
  lightBoxMovieSynopsis: any;
  lightBoxMovieYear: any;

  movieId: number; // movie id that we get from image click
  commentId: number; // commentId that we determine for a new comment


  userName: string; // username that we are currently looking
  usersComments: any;

  // new rating variables
  newUser: any;
  newComment: any;
  newRating: any;

  ngOnInit() {
    // get all movies
    this.dataservice.getMovies().valueChanges().subscribe( data => {
      //console.log(data); // debuggings
      this.moviesCount = data.length; // save movie count for later
      this.movieData = data;
    })

  }

  // subscribe and get all movie comments with specified id for the lightbox view
  showLightBox(id) {
    document.getElementById('main').classList.add('hidden'); // disable scrolling on the front page

    this.dataservice.getComments().valueChanges().subscribe ( data => {

      //console.log(data);
      this.commentId = data.length;

      this.commentData = data.filter( fil => fil.movieId == id);
      //console.log(this.commentData);

      var total = 0; // total number of rating
      for(var i=0; i < this.commentData.length; i++) {
        //console.log(this.commentData[i].rating);
        total = total + parseInt(JSON.stringify(this.commentData[i].rating));
      }

      //console.log('total rating: ' + total);

      this.movieAverage = total / this.commentData.length; // calulate user avg rating

      this.movieId = id;

      this.lightBoxImg = this.movieData[id].image;
      this.lightBoxMovie = this.movieData[id].name;
      this.lightBoxMovieSynopsis = this.movieData[id].synopsis;
      this.lightBoxMovieYear = this.movieData[id].year;
      
      this.lightBox = true;

    })
  }

  userReviews(usr: string) {
    document.getElementById('movieLightBox').classList.add('hidden'); // disable scrolling on front movie lightbox

    //console.log(usr);
    this.userName = usr;
    this.userLightBox = true;
    this.userComments(usr, this.movieId);
  }

  userComments(usr: string, movieID: number) {
    this.dataservice.getComments().valueChanges().subscribe( data => {
      //console.log(data);
      this.usersComments = data.filter( fil => fil.username == usr);
      //console.log(this.usersComments);
    });
  }

  // sends comment forward to database-service
  getComment() {
    this.dataservice.getComments().valueChanges().subscribe(data => this.commentId = data.length); // check correct comment id before sending
    //console.log(this.commentId);
    if(this.dataservice.sendNewComment(this.newComment, this.newUser, this.newRating, this.movieId, this.commentId)) {
      this.eraseInputs();
    }
  }

  validateComment() {
    // angular's ngModel causes some problems here and cannot be used, if used it wont display the <select> elements default hidden option
    // also this https://stackoverflow.com/questions/12989741/the-property-value-does-not-exist-on-value-of-type-htmlelement
    this.newRating = (<HTMLInputElement>document.getElementById('newRating')).value;
    this.newRating = parseInt(this.newRating);

    //console.log(this.newRating);

    if(this.newComment  === "" || this.newUser  === "" || this.newRating  === 0) {
      alert('Please fill all the fields!');
    } else {
      this.getComment();
    }
  }

  closeLightBox() {
    document.getElementById('main').classList.remove('hidden'); // enable scrolling on front page

    this.lightBox = false;
  }

  closeUserLightBox() {
    document.getElementById('movieLightBox').classList.remove('hidden'); // enable scrolling on front movie lightbox

    this.userLightBox = false;
  }

  // resets "new comment"-inputs
  eraseInputs() {
    this.newUser = '';
    this.newComment = '';
  }

}
