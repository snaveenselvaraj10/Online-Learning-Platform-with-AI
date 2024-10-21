export interface Course {
  courseId: number;
  title: string;
  description: string;
  articles: Article[]; // Assuming you also want to display articles related to the course
}

export interface Article {
  articleId: number;
  title: string;
  // Add any other properties if necessary
}
