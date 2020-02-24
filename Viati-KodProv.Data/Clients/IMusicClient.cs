using System;
using System.Threading.Tasks;
using Viati_KodProv.Data.Contracts;

namespace Viati_KodProv.Data.Clients {
    public interface IMusicClient {
        Task<SongList> GetSongList(string channelId, DateTime startTime, int size);
    }
}