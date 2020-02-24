using System;
using System.Threading.Tasks;
using Viati_KodProv.Data.Contracts;

namespace Viati_KodProv.Data.Services {
    public interface IRadioService {
        Task<SongList> GetSongList(DateTime startDate);
    }
}