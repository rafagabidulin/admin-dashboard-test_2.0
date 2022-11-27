import React from 'react';
import { NavLink } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function Header() {
  return (
    <Navbar bg='primary' variant='dark'>
      <Container>
        <NavLink className='navbar-brand' to='/'>
          Home
        </NavLink>
        <Nav className='me-auto'>
          <NavLink className='nav-link' to='/posts'>
            Posts
          </NavLink>
          <NavLink className='nav-link' to='/albums'>
            Albums
          </NavLink>
          <NavLink className='nav-link' to='/todos'>
            Todos
          </NavLink>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Header;
