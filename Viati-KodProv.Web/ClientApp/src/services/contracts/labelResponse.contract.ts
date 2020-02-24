export interface ILabelDTO {
    labelName: string,
    songs: ISongDTO[]
}

export interface ISongDTO {
    title: string,
    artist: string,
    songInfo: ISongInfoDTO
}


export interface ISongInfoDTO {
    description: string,
    albumNane: string,
    startTimeUtc: number,
    stopTimeUtc: number
}