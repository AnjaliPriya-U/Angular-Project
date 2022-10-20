import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';
import { User } from '../utilities/user';
import { Constant } from '../utilities/constant';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  users: User[] = [];
  constructor(private h: HttpClient) {}

  getDetails() {
    return this.h.get<User[]>(Constant.book.toString());
  }

  postDetails(data: any) {
    return this.h.post<User[]>(Constant.book.toString(), data);
  }

  putInfo(data: any, id: Number) {
    return this.h.put<User[]>(Constant.book.toString() + id, data);
  }

  delete(id: Number) {
    return this.h.delete<User[]>(Constant.book.toString() + id);
  }

  handleError(err: any) {
    return throwError(() => {
      console.log(err);
    });
  }
}
