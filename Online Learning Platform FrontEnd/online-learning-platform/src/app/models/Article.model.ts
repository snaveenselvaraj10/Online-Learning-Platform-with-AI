export class Article {
    articleId: number; // This must be initialized in the constructor
    title: string; // This must also be initialized in the constructor
  
    constructor(articleId: number, title: string) {
      this.articleId = articleId;
      this.title = title;
    }
  }
