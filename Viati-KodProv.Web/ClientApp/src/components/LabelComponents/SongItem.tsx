import React, { FunctionComponent } from 'react'
import { ISongDTO } from '../../services/contracts/labelResponse.contract'

export const SongItem: FunctionComponent<ISongDTO> = (songItem: ISongDTO) => {
    return (
        <div>
            <span>{songItem.artist}</span> - <span>{songItem.title}</span>
        </div>

    )
}