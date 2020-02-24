import React from 'react'
import { Route } from 'react-router';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';

export const BreadCrumbPath: React.FunctionComponent = () => {
    return (
        <Route path='/' render={({ location }) => {
            return (
                <Breadcrumb>
                    <Link to='/'>
                        <BreadcrumbItem>Home</BreadcrumbItem>
                    </Link>
                    {location.pathname.split('/').map((path, index) =>
                        <BreadcrumbItem key={index}>{path}</BreadcrumbItem>)}
                </Breadcrumb>)
        }} />
    )
}