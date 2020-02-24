using System.Collections.Generic;

namespace Viati_KodProv.Web.DTOs {
    public class LabelDTO {
        public string LabelName { get; set; }
        public IEnumerable<SongDTO> Songs {get ;set; }
    }
}