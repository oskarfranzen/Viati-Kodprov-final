import React, { FunctionComponent } from 'react'
import { ISongDTO } from '../../services/contracts/labelResponse.contract'
import { Table } from 'reactstrap'

interface ISongDetailPanelProps {
    songs: ISongDTO[]
}

export const SongDetailPanel: FunctionComponent<ISongDetailPanelProps> = (props) => {
    const getDateDisplay = (miliseconds: number): string => {
        return new Date(miliseconds).toLocaleTimeString();
    }

    const songsByStartDate = props.songs.sort((first, second) =>
        first.songInfo.startTimeUtc - second.songInfo.startTimeUtc
    );
    return (
        <Table bordered hover responsive>
            <thead>
                <tr>
                    <th>Start time</th>
                    <th>Stop time</th>
                    <th>Title</th>
                    <th>Artist</th>
                    <th>Album</th>
                </tr>
            </thead>
            <tbody>
                {songsByStartDate.map((song, index) =>
                    <tr key={index}>
                        <td>{getDateDisplay(song.songInfo.startTimeUtc)}</td>
                        <td>{getDateDisplay(song.songInfo.stopTimeUtc)}</td>
                        <td>{song.title}</td>
                        <td>{song.artist}</td>
                        <td>{song.songInfo.albumNane}</td>
                    </tr>)}
            </tbody>
        </Table>
    )
}