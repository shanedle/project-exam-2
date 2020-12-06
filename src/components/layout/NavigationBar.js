import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { Nav, Navbar } from "react-bootstrap";
import { IconContext } from "react-icons";
import { MdPerson } from "react-icons/md";
import { AuthContext } from "../../context/AuthContext";
import Logout from "../auth/Logout";

function NavigationBar() {
    const { user } = useContext(AuthContext);
    return (
        <Navbar bg="light" variant="light" expand="lg">
            <NavLink to="/" exact>
                <Navbar.Brand className="navbar__brand">Holidaze</Navbar.Brand>
            </NavLink>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                    <NavLink to="/" exact className="nav-link">Home</NavLink>
                    <NavLink to="/accommodation" exact className="nav-link">Accommodation</NavLink>
                    <NavLink to="/contact" className="nav-link">Contact</NavLink>
                    {user ? (
                        <>

                            <NavLink to="/admin" exact className="nav-link">
                                <IconContext.Provider value={{ style: { marginBottom: '2px' } }}>
                                    <MdPerson /> Admin
                                </IconContext.Provider >
                            </NavLink>
                            <Logout />
                        </>
                    ) : (
                            <NavLink to="/login" exact className="nav-link">Login</NavLink>
                        )}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default NavigationBar;
