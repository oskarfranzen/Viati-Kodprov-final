namespace Viati_KodProv.Web.DTOs {
    public class SongDTO {
        public string Title { get; set; }
        public string Artist { get; set; }
        public SongInfoDTO SongInfo {get; set;}
    }
}