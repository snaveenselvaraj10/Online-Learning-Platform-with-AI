namespace Online_Learning_Platform.Models
{
    public class Article
    {
        public int ArticleId { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public int CourseId { get; set; }
        public Course Course { get; set; }
    }
}
