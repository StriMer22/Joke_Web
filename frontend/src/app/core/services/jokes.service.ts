import { JokeList } from './../app-interfaces';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ENDPOINTS } from '../app-consts';

@Injectable({
  providedIn: 'root',
})
export class JokesService {
  constructor(private http: HttpClient) {}

  addJoke(categoryId: string, content: string) {
    return this.http.post(ENDPOINTS.JOKES, { categoryId, content });
  }

  deleteJoke(id: string) {
    return this.http.delete(ENDPOINTS.JOKES + '/' + id);
  }

  getJokes() {
    return this.http.get<JokeList>(ENDPOINTS.JOKES);
  }

  getMyJokes() {
    return this.http.get<JokeList>(ENDPOINTS.USER_JOKES);
  }
}
