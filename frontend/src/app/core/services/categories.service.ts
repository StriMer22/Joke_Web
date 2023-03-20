import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ENDPOINTS } from '../app-consts';
import { GetCategoriesResponse, Category } from '../app-interfaces';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private http: HttpClient) {}

  getCategories() {
    return this.http.get<GetCategoriesResponse>(ENDPOINTS.CATEGORIES);
  }

  create(name: string) {
    return this.http.post<Category>(ENDPOINTS.CATEGORIES, { name });
  }
}
