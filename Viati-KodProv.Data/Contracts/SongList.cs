namespace Viati_KodProv.Data.Contracts {
    using Newtonsoft.Json;

    public partial class SongList {
        [JsonProperty("copyright")]
        public string Copyright { get; set; }

        [JsonProperty("song")]
        public Song[] Song { get; set; }
    }

    public partial class Song {
        [JsonProperty("title")]
        public string Title { get; set; }

        [JsonProperty("description")]
        public string Description { get; set; }

        [JsonProperty("artist")]
        public string Artist { get; set; }

        [JsonProperty("composer")]
        public string Composer { get; set; }

        [JsonProperty("albumname")]
        public string Albumname { get; set; }

        [JsonProperty("recordlabel")]
        public string Recordlabel { get; set; }

        [JsonProperty("starttimeutc")]
        public string Starttimeutc { get; set; }

        [JsonProperty("stoptimeutc")]
        public string Stoptimeutc { get; set; }
    }
}