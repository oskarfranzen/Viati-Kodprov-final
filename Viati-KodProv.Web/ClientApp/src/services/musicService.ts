import Axios from 'axios'
import { ILabelDTO } from './contracts/labelResponse.contract'

export interface IMusicService {
    getLabelsWithDate: (startDate: Date) => Promise<ILabelDTO[]>
}

export interface IMusicServiceFilter {
    startDate: Date,
    searchString: string,
    sortDescending: boolean
}


export const createMusicService = (): IMusicService => ({
    getLabelsWithDate: async (startDate: Date) => {
        const response = await Axios.get("https://localhost:5001/api/music/labels?startDate=" + startDate.toISOString());
        return response.data;
    }
})