namespace Online_Learning_Platform.Models
{
    public class CourseRecommendation
    {
        public int RecommendationId { get; set; }  // Primary Key
        public int UserId { get; set; }
        public User User { get; set; }
        public int CourseId { get; set; }
        public Course Course { get; set; }
        public DateTime RecommendedOn { get; set; }
    }
}
