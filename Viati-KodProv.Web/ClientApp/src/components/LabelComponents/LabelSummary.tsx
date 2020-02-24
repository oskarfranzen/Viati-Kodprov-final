import React from 'react'
import { Row, Col, Alert, Container } from "reactstrap"
import { SearchBar } from '../GenericComponents/SearchBar'
import { ILabelDTO } from '../../services/contracts/labelResponse.contract'
import { LabelExpander } from './LabelExpander'
import { IMusicServiceFilter } from '../../services/musicService'
import ScrollTopButton from '../GenericComponents/ScrollTopButton'

interface ILabelSummaryProps {
    labels: ILabelDTO[],
    filter: IMusicServiceFilter
    onUpdateSearchString: (searchString: string) => void
    onUpdateStartDate: (date: Date) => void;
    onSetSort: (setDescending: boolean) => void;
}
export const LabelSummary: React.FunctionComponent<ILabelSummaryProps> = ({ labels, onUpdateSearchString, onUpdateStartDate, onSetSort, filter }: ILabelSummaryProps) => {
    let currentLetter = '';

    return (<>
        <div className='sticky-top p-2 bg-light border-bottom'>
            <SearchBar
                onUpdateSearchString={onUpdateSearchString}
                onUpdateStartDate={onUpdateStartDate}
                onSetSort={onSetSort}
                filter={filter} />
        </div>
        <Container className="p-2">
            <Row>
                <Col xs={12} md={{ size: 8, offset: 2 }}>
                    {labels.length === 0 &&
                        <Alert color='primary' className='m-4'>No labels found :(</Alert>
                    }
                    {labels.map((label, index) => {
                        const firstLetter = label.labelName.substring(0, 1).toUpperCase();
                        let headerText = null;
                        if (currentLetter !== firstLetter) {
                            currentLetter = firstLetter;
                            headerText = <h3>#{currentLetter}</h3>
                        }
                        return (
                            <div key={label.labelName + index + label.songs.length}>
                                {headerText}
                                <LabelExpander label={label} />
                            </div>
                        )
                    }
                    )}
                </Col>
            </Row>
            <ScrollTopButton />
        </Container>
    </>)
}