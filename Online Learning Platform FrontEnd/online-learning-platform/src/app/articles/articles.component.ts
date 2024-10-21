import { Component, OnInit } from '@angular/core';
import { ArticlesService } from 'src/app/article.service';
import { Article } from 'src/app/models/Article.model';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {
  articles: Article[] = [];
  loading = true;
  error: string | null = null;

  constructor(private articlesService: ArticlesService) { }

  ngOnInit(): void {
    this.articlesService.getArticles().subscribe(
      (data: Article[]) => {
        this.articles = data;
        this.loading = false;
      },
      (err) => {
        this.error = 'Error fetching articles';
        this.loading = false;
      }
    );
  }
}
