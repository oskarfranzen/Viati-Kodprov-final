import React from 'react'
import { Container } from 'reactstrap'

export const About: React.FunctionComponent = () => {
    return <Container className='p-5'>
        <h1><strong>Hello!</strong></h1>
        <p>This page let you view songs that were played by SR P3 for a selected date</p>
        <p>Built using .NET Core 3.1 and React 16.0</p>
    </Container>
}