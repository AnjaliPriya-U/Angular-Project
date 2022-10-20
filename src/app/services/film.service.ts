import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FilmService {
  data: any = [];
  id: number = 0;
  constructor() {}

  setData(arrays: any) {
    if (this.data.length == 0)
      for (let arr of arrays) {
        this.data[arr.id] = 100;
      }
    console.log(this.data);
  }

  setId(id: number) {
    this.id = id;
  }

  getData(id: number) {
    console.log('data', this.data);
    return this.data[id];
  }

  updateFilm(id: number, tickets: number) {
    console.log('up', this.data);
    console.log(id, tickets, this.data[id]);
    this.data[id] -= tickets;
    console.log(this.data[id]);
  }
}

