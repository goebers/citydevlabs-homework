import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-moviepage',
  templateUrl: './moviepage.component.html',
  styleUrls: ['./moviepage.component.scss']
})
export class MoviepageComponent implements OnInit {

  constructor(public dataservice: DatabaseService) { }

  movieData: any;

  ngOnInit() {
    
  }

  click() {
    this.dataservice.getMovies().valueChanges().subscribe( data => {
      console.log(data); // debuggings
      this.movieData = data;
    })
  }

}
