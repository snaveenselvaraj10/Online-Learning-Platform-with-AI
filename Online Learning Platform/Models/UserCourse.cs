namespace Online_Learning_Platform.Models
{
    public class UserCourse
    {
        public int UserId { get; set; }
        public User User { get; set; }
        public int CourseId { get; set; }
        public Course Course { get; set; }
        public DateTime EnrolledDate { get; set; }
    }
}
