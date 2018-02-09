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

  movieData: any;
  commentData: any;

  lightBox = false;
  userLightBox = false;
  lightBoxImg: any;
  lightBoxMovie: any;
  lightBoxMovieSynopsis: any;

  movieId: number;
  userName: string;
  usersComments: any;

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
    this.dataservice.getComments(id).valueChanges().subscribe ( data => {

      console.log(data);

      this.commentData = data.filter( fil => fil.movieId == id);
      console.log(this.commentData);

      this.movieId = id;

      this.lightBoxImg = this.movieData[id-1].image;
      this.lightBoxMovie = this.movieData[id-1].name;
      this.lightBoxMovieSynopsis = this.movieData[id-1].synopsis;
      
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
    this.dataservice.getUserComments(usr).valueChanges().subscribe( data => {
      //console.log(data);
      this.usersComments = data.filter( fil => fil.username == usr);
      console.log(this.usersComments);

    });
  }

  filter(arr, term) {
    
  }
}
