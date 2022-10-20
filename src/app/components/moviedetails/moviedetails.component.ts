import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from 'src/app/services/movie.service';
import { BookService } from 'src/app/services/book.service';
import { FilmService } from 'src/app/services/film.service';

@Component({
  selector: 'app-moviedetails',
  templateUrl: './moviedetails.component.html',
  styleUrls: ['./moviedetails.component.css'],
})

export class MoviedetailsComponent implements OnInit {
  movieDetails: any = '';
  n: any = this.r.snapshot.paramMap.get('id')!;
  movieTrailer: any = '';
  recommendation: any = '';
  d: any;
  currentItem: any = this.n;
  constructor(
    private r: ActivatedRoute,
    private s: MovieService,
    private b: BookService,
    private f: FilmService
  ) {}

  ngOnInit(): void {
    this.getDetails();
    this.getTrailer();
    this.getRecommendations();
    window.scrollTo(0, 0);
  }

  getDetails(): void {
    this.s.getCapitalMovieDetail(this.n).subscribe((data: any) => {
      this.movieDetails = data;
    });
  }

  getTrailer(): void {
    this.s.getMovieTrailer(this.n).subscribe((data: any) => {
      for (let i = 0; i < data.results.length; i++) {
        //console.log(data.results[i].name)
        if (data.results[i].name == 'Official Trailer') {
          this.movieTrailer = data.results[i].key;
        } else if (data.results[i].type == 'Trailer') {
          this.movieTrailer = data.results[i].key;
        }
      } 
    });
  }

  getRecommendations(): void {
    this.s.getRecommendations(this.n).subscribe((data: any) => {
      //console.log(data)
      this.recommendation = data.results;
    });
  }
}
