import React from "react";
import { Nav,Navbar, Container, Image, Button } from 'react-bootstrap';

export function Navigation() {

    return (
        <Navbar style={{marginBottom:"2%"}} variant="light">
            <Container>
                <Navbar.Brand href="/" >
                <Image style={{height:"7rem"}} src="https://i.pinimg.com/550x/0a/56/f2/0a56f2c7cc665815b19fc6c79c22b5d4.jpg"/>
                </Navbar.Brand>
                <Nav style={{margin:"auto"}}>
                    <Nav.Link href="/breakfast">Breakfast</Nav.Link>
                    <Nav.Link href="/brunch">Brunch</Nav.Link>
                    <Nav.Link href="/lunch">Lunch</Nav.Link>
                    <Nav.Link href="/dinner">Dinner</Nav.Link>
                </Nav>
                <Nav.Link href="/login"><Button variant="outline-secondary">Log in</Button></Nav.Link>
                    <span style={{alignSelf:"center"}}>or</span> 
                <Nav.Link href="/register"><Button variant="success">Create Account</Button></Nav.Link>
            </Container>
        </Navbar>
    )
}