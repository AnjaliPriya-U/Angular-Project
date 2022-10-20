import { Injectable } from '@angular/core';
import { Observable, retry, catchError } from 'rxjs';
import { Constant } from '../utilities/constant';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  constructor(private h: HttpClient) {}

  getData(): Observable<any> {
    return this.h
      .get<any>(Constant.getLatest.toString())
      .pipe(retry(1), catchError(this.handleError));
  }

  handleError() {
    return 'error';
  }
  
  getLatest(): Observable<any> {
    return this.h.get<any>(Constant.getLatest.toString());
  }

  getNowPlaying(): Observable<any> {
    return this.h.get<any>(Constant.getNowPlaying.toString());
  }

  getPopular(): Observable<any> {
    return this.h.get<any>(Constant.getPopular.toString());
  }

  getUpcoming(): Observable<any> {
    return this.h.get<any>(Constant.getUpcoming.toString());
  }

  getRecommendations(id: any): Observable<any> {
    return this.h.get<any>(
      `${Constant.getDetails}/${parseInt(id)}/recommendations?api_key=${
        Constant.k
      }&language=en-US`
    );
  }

  getCapitalMovieDetail(id: any): Observable<any> {
    return this.h.get<any>(
      `${Constant.getDetails}/${parseInt(id)}?api_key=${
        Constant.k
      }&language=en-US`
    );
  }

  getMovieTrailer(id: any) {
    return this.h.get<any>(
      `${Constant.getDetails}/${parseInt(id)}/videos?api_key=${
        Constant.k
      }&language=en-US`
    );
  }
}
