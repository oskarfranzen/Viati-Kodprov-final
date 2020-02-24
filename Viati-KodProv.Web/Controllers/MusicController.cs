using System;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Viati_KodProv.Data.Services;
using Viati_KodProv.Web.DTOs;

namespace Viati_KodProv.Web.Controllers {

    [Route("api/music")]
    public class MusicController : Controller {
        private readonly IRadioService _radioService;
        private readonly Regex _miliSecondsRegex = new Regex("-?\\d+");

        public MusicController(IRadioService radioService) {
            _radioService = radioService;
        }

        public IActionResult Index() {
            return Ok($"Hello World! Current time is {DateTime.Now}");
        }

        [Route("labels")]
        public async Task<IActionResult> Labels(DateTime startDate) {
            var songList = await _radioService.GetSongList(startDate);

            if (songList == null || songList.Song == null) {
                return Json(Enumerable.Empty<LabelDTO>());
            }

            var dtoResponse = from songItem in songList.Song
            group songItem by!string.IsNullOrEmpty(songItem.Recordlabel) ? songItem.Recordlabel : "[Unknown]"
            into groupedLabels
            select new LabelDTO {
                LabelName = groupedLabels.Key,
                Songs = groupedLabels.Select(x => new SongDTO() {
                Artist = x.Artist,
                Title = x.Title,
                SongInfo = new SongInfoDTO() {
                AlbumNane = x.Albumname,
                Description = x.Description,
                StartTimeUtc = GetMiliseconds(x.Starttimeutc),
                StopTimeUtc = GetMiliseconds(x.Stoptimeutc)
                }
                })
            };
            return Json(dtoResponse);
        }

        [NonAction]
        private long GetMiliseconds(string dateString) {
            var miliSeconds = _miliSecondsRegex.Match(dateString).Captures.FirstOrDefault()?.Value ?? "0";
            return long.TryParse(miliSeconds, out var result) ? result : 0;
        }
    }
}