using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Online_Learning_Platform.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
using Online_Learning_Platform.Data;
using Online_Learning_Platform.Models;

namespace Online_Learning_Platform.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RecommendationController : ControllerBase
    {
        private readonly LearningPlatformContext _context;

        public RecommendationController(LearningPlatformContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<CourseRecommendation>>> GetRecommendations()
        {
            return await _context.CourseRecommendations.ToListAsync();
        }

        [HttpPost]
        public async Task<ActionResult<CourseRecommendation>> CreateRecommendation(CourseRecommendation recommendation)
        {
            _context.CourseRecommendations.Add(recommendation);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetRecommendations), new { id = recommendation.RecommendationId }, recommendation);
        }
    }
}
