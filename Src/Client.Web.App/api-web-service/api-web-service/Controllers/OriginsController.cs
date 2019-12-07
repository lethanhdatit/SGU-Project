using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using api_web_service.Models;

namespace api_web_service.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OriginsController : ControllerBase
    {
        private readonly WebServiceContext _context;

        public OriginsController(WebServiceContext context)
        {
            _context = context;
        }

        // GET: api/Origins
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Origin>>> GetOrigin()
        {
            return await _context.Origin.ToListAsync();
        }

        // GET: api/Origins/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Origin>> GetOrigin(long id)
        {
            var origin = await _context.Origin.FindAsync(id);

            if (origin == null)
            {
                return NotFound();
            }

            return origin;
        }

        // PUT: api/Origins/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutOrigin(long id, Origin origin)
        {
            if (id != origin.OriginId)
            {
                return BadRequest();
            }

            _context.Entry(origin).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OriginExists(id))
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

        // POST: api/Origins
        [HttpPost]
        public async Task<ActionResult<Origin>> PostOrigin(Origin origin)
        {
            _context.Origin.Add(origin);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetOrigin", new { id = origin.OriginId }, origin);
        }

        // DELETE: api/Origins/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Origin>> DeleteOrigin(long id)
        {
            var origin = await _context.Origin.FindAsync(id);
            if (origin == null)
            {
                return NotFound();
            }

            _context.Origin.Remove(origin);
            await _context.SaveChangesAsync();

            return origin;
        }

        private bool OriginExists(long id)
        {
            return _context.Origin.Any(e => e.OriginId == id);
        }
    }
}
