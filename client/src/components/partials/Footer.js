import React from "react";
import { Nav,Navbar, Container, Image} from 'react-bootstrap';

export function Footer() {
    return (
        <Navbar bg="dark" variant="dark" style={{marginTop:"10%",height:"13rem"}} >
            <Container>
                <Navbar.Brand href="/" >
                <Image style={{height:"5rem"}} src="https://i.pinimg.com/550x/0a/56/f2/0a56f2c7cc665815b19fc6c79c22b5d4.jpg"/>
                </Navbar.Brand>
                <Nav style={{margin:"auto"}}>
                    <Nav.Link href="/breakfast">Breakfast</Nav.Link>
                    <Nav.Link href="/brunch">Brunch</Nav.Link>
                    <Nav.Link href="lunch">Lunch</Nav.Link>
                    <Nav.Link href="dinner">Dinner</Nav.Link>
                </Nav>
                <span style={{color:"lightgray",textAlign:"end"}}>Pizza's Place<br/>copyright 2021</span>
            </Container>
        </Navbar>
    )
}