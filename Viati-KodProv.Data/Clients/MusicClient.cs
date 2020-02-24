using System;
using System.Net.Http;
using System.Threading.Tasks;
using Viati_KodProv.Data.Contracts;

namespace Viati_KodProv.Data.Clients
{
    public class MusicClient : IMusicClient
    {

        private readonly HttpClient _client;
        public MusicClient(HttpClient client) {
            _client = client ?? throw new ArgumentNullException(nameof(client));
        }

        public async Task<SongList> GetSongList(string channelId, DateTime startTime, int size)
        {          
            string formattedStart = startTime.ToString("yyyy-MM-dd");

            string queryString = $"id={channelId}&startdatetime={formattedStart}&format=json&size={size}";

            var response = await _client.GetAsync($"getplaylistbychannelid?{queryString}");
            response.EnsureSuccessStatusCode();
            
            return Newtonsoft.Json.JsonConvert.DeserializeObject<SongList>(await response.Content.ReadAsStringAsync());
        }
    }
}