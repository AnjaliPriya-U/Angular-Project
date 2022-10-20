import { Component, OnInit } from '@angular/core';
import { FilmService } from 'src/app/services/film.service';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
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
      this.f.setData(data.results);
      this.nowPlayingMovies = data.results;
    });
  }
  getPopular(): void {
    this.s.getPopular().subscribe((data: any) => {
      console.log('pop', data);
      this.popularMovies = data.results;
    });
  }
  getUpcoming(): void {
    this.s.getUpcoming().subscribe((data: any) => {
      console.log('up', data);
      this.upcomingMovies = data.results;
    });
  }
}