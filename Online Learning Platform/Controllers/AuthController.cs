using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Online_Learning_Platform.Models;
using OnlineLearningPlatform.DTOs;    // DTOs for Registration and Login
using System.Linq;
using System.Threading.Tasks;
using BCrypt.Net;  // For hashing passwords
using Online_Learning_Platform.Data;

namespace OnlineLearningPlatform.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly LearningPlatformContext _context;

        public AuthController(LearningPlatformContext context)
        {
            _context = context;
        }

        // POST: api/auth/register
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] UserRegisterDto request)
        {
            // Check if user with same email exists
            if (_context.Users.Any(u => u.Email == request.Email))
            {
                return BadRequest(new { message = "User already exists with the given email." });
            }

            // Create new user and hash the password
            var user = new User
            {
                Username = request.Username,
                Email = request.Email,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(request.Password)
            };

            // Add user to the database
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return Ok(new { message = "User registered successfully." });
        }

        // POST: api/auth/login
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] UserLoginDto request)
        {
            // Find user by email
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == request.Email);

            if (user == null || !BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash))
            {
                return BadRequest(new { message = "Invalid credentials" });
            }

            // Normally, you would return a JWT token here for further authentication
            return Ok(new { message = "Success" });
        }
    }
}
