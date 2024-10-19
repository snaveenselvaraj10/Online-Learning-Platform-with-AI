namespace Online_Learning_Platform.Models
{
    public class Course
    {
        public int CourseId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public ICollection<Article> Articles { get; set; }
        public ICollection<UserCourse> UserCourses { get; set; }
    }
}
