import React from 'react'
import { ILabelDTO } from '../../services/contracts/labelResponse.contract'
import { Container, Row, Col, Button, Alert } from 'reactstrap'
import { SongDetailPanel } from './SongDetailPanel'
import { Link } from 'react-router-dom'
import { BreadCrumbPath } from '../GenericComponents/BreadcrumbPath'

interface ILabelDetailsProps {
    label: ILabelDTO
}

export const LabelDetails: React.FunctionComponent<ILabelDetailsProps> = ({ label }: ILabelDetailsProps) => {
    window.scrollTo(0, 0)

    return (
        <Container className='p-2'>
            <BreadCrumbPath />
            {label &&
                <Row>
                    <Col>
                        <h1>{label.labelName}</h1>
                        <SongDetailPanel songs={label.songs} />
                    </Col>
                </Row>
            }
            {
                !label &&
                <Alert color='warning'>Something went wrong!</Alert>
            }
            <Row>
                <Col xs={6} md={3}>
                    <Link to='/'>
                        <Button color='primary'>
                            Back
                        </Button>
                    </Link>
                </Col>
            </Row>
        </Container >
    )
}
