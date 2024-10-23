using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Online_Learning_Platform.Models;
using Online_Learning_Platform.Data;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Online_Learning_Platform.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CourseController : ControllerBase
    {
        private readonly LearningPlatformContext _context;

        public CourseController(LearningPlatformContext context)
        {
            _context = context;
        }

        // GET: api/course
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Course>>> GetCourses()
        {
            return await _context.Courses.Include(c => c.Articles).ToListAsync();
        }

        // GET: api/course/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Course>> GetCourse(int id)
        {
            var course = await _context.Courses
                .Include(c => c.Articles) // Include articles in the response
                .FirstOrDefaultAsync(c => c.CourseId == id);

            if (course == null)
            {
                return NotFound();
            }

            return course;
        }

        // POST: api/course
        [HttpPost]
        public async Task<ActionResult<Course>> CreateCourse(Course course)
        {
            _context.Courses.Add(course);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetCourse), new { id = course.CourseId }, course);
        }

        // PUT: api/course/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCourse(int id, Course course)
        {
            if (id != course.CourseId)
            {
                return BadRequest();
            }

            _context.Entry(course).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CourseExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/course/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCourse(int id)
        {
            var course = await _context.Courses.FindAsync(id);
            if (course == null)
            {
                return NotFound();
            }

            _context.Courses.Remove(course);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // POST: api/course/{courseId}/enroll
        [HttpPost("{courseId}/enroll")]
        public async Task<IActionResult> EnrollInCourse(int courseId, [FromBody] int userId)
        {
            var course = await _context.Courses.FindAsync(courseId);
            if (course == null)
            {
                return NotFound(new { message = "Course not found" });
            }

            var user = await _context.Users.FindAsync(userId);
            if (user == null)
            {
                return NotFound(new { message = "User not found" });
            }

            var userCourse = new UserCourse
            {
                UserId = userId,
                CourseId = courseId,
                EnrolledDate = System.DateTime.UtcNow
            };

            // Check if the user is already enrolled in the course
            var existingEnrollment = await _context.UserCourses
                .FirstOrDefaultAsync(uc => uc.UserId == userId && uc.CourseId == courseId);

            if (existingEnrollment != null)
            {
                return Conflict(new { message = "User is already enrolled in this course" });
            }

            _context.UserCourses.Add(userCourse);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Enrollment successful" });
        }

        private bool CourseExists(int id)
        {
            return _context.Courses.Any(e => e.CourseId == id);
        }
    }
}
