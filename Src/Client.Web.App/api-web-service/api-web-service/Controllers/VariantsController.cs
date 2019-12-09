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
    public class VariantsController : ControllerBase
    {
        private readonly WebServiceContext _context;

        public VariantsController(WebServiceContext context)
        {
            _context = context;
        }

        // GET: api/Variants
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Variant>>> GetVariant()
        {
            return await _context.Variant.ToListAsync();
        }

        // GET: api/Variants/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Variant>> GetVariant(long id)
        {
            var variant = await _context.Variant.FindAsync(id);

            if (variant == null)
            {
                return NotFound();
            }

            return variant;
        }

        // PUT: api/Variants/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutVariant(long id, Variant variant)
        {
            if (id != variant.VariantId)
            {
                return BadRequest();
            }

            _context.Entry(variant).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!VariantExists(id))
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

        // POST: api/Variants
        [HttpPost]
        public async Task<ActionResult<Variant>> PostVariant(Variant variant)
        {
            _context.Variant.Add(variant);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetVariant", new { id = variant.VariantId }, variant);
        }

        // DELETE: api/Variants/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Variant>> DeleteVariant(long id)
        {
            var variant = await _context.Variant.FindAsync(id);
            if (variant == null)
            {
                return NotFound();
            }

            _context.Variant.Remove(variant);
            await _context.SaveChangesAsync();

            return variant;
        }

        private bool VariantExists(long id)
        {
            return _context.Variant.Any(e => e.VariantId == id);
        }
    }
}
