import React, { useState } from 'react'
import { ILabelDTO } from "../../services/contracts/labelResponse.contract";
import { SongItem } from "./SongItem";
import { Collapse, CardHeader, CardBody, Alert, Card, CardFooter } from 'reactstrap'
import { Link } from 'react-router-dom';
import commons from '../../commons/commons'

interface ILabelExpanderProps {
    label: ILabelDTO,
}

export const LabelExpander: React.FunctionComponent<ILabelExpanderProps> = ({ label }: ILabelExpanderProps) => {
    const [isOpen, setIsOpen] = useState(true);

    const sortedSongs = label.songs && label.songs.sort((f, s) => f.artist.localeCompare(s.artist));

    return (
        <>
            <Card>
                <CardHeader onClick={() => setIsOpen(!isOpen)}>
                    <h5>{label.labelName}</h5>
                </CardHeader>
                <Collapse isOpen={isOpen}>
                    {label.songs &&
                        <>
                            <CardBody>
                                {sortedSongs.map((song, index) =>
                                    <SongItem key={index} {...song} />
                                )}
                            </CardBody>
                            <CardFooter>
                                <Link to={commons.constants.labelPath + encodeURIComponent(label.labelName)}>Details</Link>
                            </CardFooter>
                        </>
                    }
                    {sortedSongs.length === 0 &&
                        <Alert color='warning'>No songs were loaded for this label</Alert>}
                </Collapse>
            </Card>
        </>
    )
}