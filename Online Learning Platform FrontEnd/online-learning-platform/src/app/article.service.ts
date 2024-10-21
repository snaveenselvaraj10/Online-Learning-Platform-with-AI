import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Article } from 'src/app/models/Article.model';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {
  private apiUrl = 'https://localhost:7013/api/course';  // Adjust API URL

  constructor(private http: HttpClient) { }

  getArticles(): Observable<Article[]> {
    return this.http.get<Article[]>(this.apiUrl);
  }
}
