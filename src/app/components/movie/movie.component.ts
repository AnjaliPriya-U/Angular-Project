import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/services/movie.service';
import { FilmService } from 'src/app/services/film.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css'],
})
export class MovieComponent implements OnInit {
  latestMovies: any = '';
  nowPlayingMovies: any = '';
  popularMovies: any = '';
  upcomingMovies: any = '';

  constructor(private s: MovieService, 
    private f: FilmService) {}

  ngOnInit(): void {
    this.getLatest();
    this.getNowPlaying();
    this.getPopular();
    this.getUpcoming();
    window.scrollTo(0, 0);
  }

  getLatest(): void {
    this.s.getLatest().subscribe((data: any) => {
      this.f.setData(data.results);
      this.latestMovies = data.results;
    });
  }

  getNowPlaying(): void {
    this.s.getNowPlaying().subscribe((data: any) => {
      console.log(data);
      this.nowPlayingMovies = data.results;
    });
  }
  getPopular(): void {
    this.s.getPopular().subscribe((data: any) => {
      this.popularMovies = data.results;
    });
  }
  
  getUpcoming(): void {
    this.s.getUpcoming().subscribe((data: any) => {
      this.upcomingMovies = data.results;
    });
  }
}
