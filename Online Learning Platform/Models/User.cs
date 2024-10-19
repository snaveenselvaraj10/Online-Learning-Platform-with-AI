namespace Online_Learning_Platform.Models
{
    public class User
    {
        public int UserId { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string PasswordHash { get; set; }
        public ICollection<UserCourse> UserCourses { get; set; }
    }
}
