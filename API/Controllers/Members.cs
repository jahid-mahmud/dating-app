using System.Collections.Generic;
using System.Threading.Tasks;
using API.Data;
using API.DTOS;
using API.Entities;
using API.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class MembersController : BaseApiController
    {
        public DataContext _context { get; }
        private readonly TokenService _tokenService;
        public MembersController(DataContext context, TokenService tokenService)
        {
            _tokenService = tokenService;
            _context = context;

        }



        [HttpPost("addMember")]
        public async Task<ActionResult<MemberDto>> Resister(MemberDto memberDto)
        {


            var member = new Members
            {
                Name = memberDto.Name,
                Hobby = memberDto.Hobby
            };
            await _context.Members.AddAsync(member);

            await _context.SaveChangesAsync();
            return new MemberDto
            {
                Name = memberDto.Name,
                Hobby = memberDto.Hobby
            };

        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Members>>> getMembers()
        {

            return await _context.Members.ToListAsync();

        }

    }
}