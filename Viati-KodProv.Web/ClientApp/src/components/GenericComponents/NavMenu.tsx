import React, { useState } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';

interface NavMenuState {
  collapsed: boolean
}

const initialState: NavMenuState = {
  collapsed: true
};

export const NavMenu: React.FunctionComponent<any> = () => {

  const [state, setState] = useState(initialState)

  const toggleNavbar = () => {
    setState({
      collapsed: !state.collapsed
    });
  }
  return (
    <header>
      <Navbar className="navbar-expand-sm navbar-toggleable-sm border-bottom box-shadow" light>
        <Container>
          <NavbarBrand tag={Link} to="/">Viari - SR - Kodprov</NavbarBrand>
          <NavbarToggler onClick={toggleNavbar} className="mr-2" />
          <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!state.collapsed} navbar>
            <ul className="navbar-nav flex-grow">
              <NavItem>
                <NavLink tag={Link} className="text-dark" to="/">Home</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} className="text-dark" to="/about">About</NavLink>
              </NavItem>
            </ul>
          </Collapse>
        </Container>
      </Navbar>
    </header>
  );
}
