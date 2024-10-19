using Microsoft.EntityFrameworkCore;
using Online_Learning_Platform.Models;

namespace Online_Learning_Platform.Data
{
    public class LearningPlatformContext : DbContext
    {
        public LearningPlatformContext(DbContextOptions<LearningPlatformContext> options)
            : base(options)
        { }

        public DbSet<User> Users { get; set; }
        public DbSet<Article> Articles { get; set; }
        public DbSet<Course> Courses { get; set; }
        public DbSet<CourseRecommendation> CourseRecommendations { get; set; }
        public DbSet<UserCourse> UserCourses { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<UserCourse>()
                .HasKey(uc => new { uc.UserId, uc.CourseId }); 
            modelBuilder.Entity<UserCourse>()
                .HasOne(uc => uc.User)
                .WithMany(u => u.UserCourses)
                .HasForeignKey(uc => uc.UserId);

            modelBuilder.Entity<UserCourse>()
                .HasOne(uc => uc.Course)
                .WithMany(c => c.UserCourses)
                .HasForeignKey(uc => uc.CourseId);

            modelBuilder.Entity<CourseRecommendation>()
                .HasKey(cr => cr.RecommendationId);

            modelBuilder.Entity<CourseRecommendation>()
                .HasOne(cr => cr.User)
                .WithMany()  // Or you can create a collection navigation if required
                .HasForeignKey(cr => cr.UserId);

            modelBuilder.Entity<CourseRecommendation>()
                .HasOne(cr => cr.Course)
                .WithMany()  // Or create a collection navigation if needed
                .HasForeignKey(cr => cr.CourseId);

            base.OnModelCreating(modelBuilder);
        }

    }
}
