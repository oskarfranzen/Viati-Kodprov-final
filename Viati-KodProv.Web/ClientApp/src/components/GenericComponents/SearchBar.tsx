import React from 'react'
import { Input, InputGroup, Button, ButtonGroup, Container, InputGroupAddon, Col, Row } from 'reactstrap'
import { IMusicServiceFilter } from '../../services/musicService'
import { StartDatePicker } from './StartDatePicker'

interface ISearchBarProps {
    onUpdateSearchString: (searchString: string) => void
    onUpdateStartDate: (newDate: Date) => void
    onSetSort: (setDescending: boolean) => void
    filter: IMusicServiceFilter
}

export const SearchBar: React.FunctionComponent<ISearchBarProps> = (props: ISearchBarProps) => {
    return (
        <Container>
            <Row>
                <InputGroup>
                    <Col xs={12} md={2} className='pb-1 pb-sm-0'>
                        <StartDatePicker
                            startDate={props.filter.startDate}
                            onUpdateStartDate={props.onUpdateStartDate}
                            className='form-control'
                        />
                    </Col>
                    <Col xs={12} md={{ size: 6, offset: 1 }} className='d-flex'>
                        <Input
                            type='text'
                            value={props.filter.searchString}
                            placeholder='Filter labels/titles/artists'
                            onChange={(event) => {
                                props.onUpdateSearchString(event.currentTarget.value)
                            }}
                        />
                        <InputGroupAddon
                            addonType='append'
                            disabled={props.filter.searchString.length === 0}
                            onClick={() => props.onUpdateSearchString('')
                            }
                        >
                            <Button color='secondary' disabled={props.filter.searchString.length === 0}>
                                x
                            </Button>
                        </InputGroupAddon>
                    </Col>
                    <Col xs={12} md={{ size: 2, offset: 1 }} className='pt-1 pt-sm-0 d-flex'>
                        <ButtonGroup>
                            <Button
                                onClick={() => props.onSetSort(false)}
                                className={!props.filter.sortDescending ? 'active' : ''}>
                                &uarr;
                            </Button>
                            <Button
                                onClick={() => props.onSetSort(true)}
                                className={props.filter.sortDescending ? 'active' : ''}>
                                &darr;
                            </Button>
                        </ButtonGroup>
                    </Col>
                </InputGroup>
            </Row>
        </Container>
    )
}