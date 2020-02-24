using System;
using System.Threading.Tasks;
using System.Linq;
using Viati_KodProv.Data.Clients;
using Viati_KodProv.Data.Contracts;

namespace Viati_KodProv.Data.Services {
    public class RadioService : IRadioService {
        private readonly IMusicClient _musicClient;

        public RadioService(IMusicClient musicClient) {
            _musicClient = musicClient;
        }

        public async Task<SongList> GetSongList(DateTime startDate) {
            return await _musicClient.GetSongList("164", startDate, 100);
        }
    }
}