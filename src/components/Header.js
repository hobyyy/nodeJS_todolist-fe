import React from 'react'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const Header = ({user, handleLogout}) => {
  return (
    <Navbar className="navbar-style">
      <div className="container-fluid">
        <Nav.Link className="navbar-headText" href="/">TodoApp</Nav.Link>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          {user ? (<Nav.Link href="/login" onClick={handleLogout}>Logout</Nav.Link>) : (
            <>
              <Nav.Link href="/login">Login</Nav.Link>
              <Nav.Link href="/register" className="nav-item">Register</Nav.Link>
            </> 
          )}
          
        </Navbar.Collapse>
      </div>
    </Navbar>
  )
}

export default Header