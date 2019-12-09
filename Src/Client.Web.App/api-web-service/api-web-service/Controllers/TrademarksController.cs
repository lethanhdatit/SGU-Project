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
    public class TrademarksController : ControllerBase
    {
        private readonly WebServiceContext _context;

        public TrademarksController(WebServiceContext context)
        {
            _context = context;
        }

        // GET: api/Trademarks
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Trademark>>> GetTrademark()
        {
            return await _context.Trademark.ToListAsync();
        }

        // GET: api/Trademarks/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Trademark>> GetTrademark(long id)
        {
            var trademark = await _context.Trademark.FindAsync(id);

            if (trademark == null)
            {
                return NotFound();
            }

            return trademark;
        }

        // PUT: api/Trademarks/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTrademark(long id, Trademark trademark)
        {
            if (id != trademark.TrademarkId)
            {
                return BadRequest();
            }

            _context.Entry(trademark).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TrademarkExists(id))
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

        // POST: api/Trademarks
        [HttpPost]
        public async Task<ActionResult<Trademark>> PostTrademark(Trademark trademark)
        {
            _context.Trademark.Add(trademark);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTrademark", new { id = trademark.TrademarkId }, trademark);
        }

        // DELETE: api/Trademarks/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Trademark>> DeleteTrademark(long id)
        {
            var trademark = await _context.Trademark.FindAsync(id);
            if (trademark == null)
            {
                return NotFound();
            }

            _context.Trademark.Remove(trademark);
            await _context.SaveChangesAsync();

            return trademark;
        }

        private bool TrademarkExists(long id)
        {
            return _context.Trademark.Any(e => e.TrademarkId == id);
        }
    }
}
