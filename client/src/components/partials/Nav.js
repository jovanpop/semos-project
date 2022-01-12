import React from "react";
import { Nav, Navbar, Container, Image, Button } from 'react-bootstrap';
import { api } from "../../constants/ApiConstants";
import { CircleFill } from "react-bootstrap-icons";

export function Navigation() {
    const token = localStorage.getItem("token")
    const logOut = () => {
        fetch(`${api.root}/users/logout`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .catch(err => alert(err))
        localStorage.removeItem("token")
    }
    return (
        <Navbar style={{ marginBottom: "2%", fontSize: "20px", fontWeight: "bold" }} variant="light">
            <Container>
                <Navbar.Brand href="/" >
                    <Image style={{ height: "7rem" }} src="https://i.pinimg.com/550x/0a/56/f2/0a56f2c7cc665815b19fc6c79c22b5d4.jpg" />
                </Navbar.Brand>
                <Nav style={{ margin: "auto", alignItems: "baseline" }}>
                    <Nav.Link href="/breakfast">Breakfast</Nav.Link><CircleFill style={{ alignSelf: "center", color: "orange", height: "10px" }} />
                    <Nav.Link href="/brunch">Brunch</Nav.Link><CircleFill style={{ alignSelf: "center", color: "orange", height: "10px" }} />
                    <Nav.Link href="/lunch">Lunch</Nav.Link><CircleFill style={{ alignSelf: "center", color: "orange", height: "10px" }} />
                    <Nav.Link href="/dinner">Dinner</Nav.Link>
                </Nav>
                {!token ?
                    <Nav>
                        <Nav.Link href="/login"><Button variant="outline-secondary">Log in</Button></Nav.Link>
                        <span style={{ alignSelf: "center", fontSize: "15px", color: "orange" }}> or </span>
                        <Nav.Link href="/register"><Button variant="success">Create Account</Button></Nav.Link>
                    </Nav>
                    :
                    <Nav style={{ textDecoration: "underline" }}>
                        <Nav.Link href="/myrecipes" style={{ color: "green" }}>My Recipes</Nav.Link><CircleFill style={{ alignSelf: "center", color: "gray", height: "10px" }} />
                        <Nav.Link href="/myprofile" style={{ color: "orange" }}>My Profile</Nav.Link><CircleFill style={{ alignSelf: "center", color: "gray", height: "10px" }} />
                        <Nav.Link href="/" onClick={logOut}>Log out</Nav.Link>
                    </Nav>
                }
            </Container>
        </Navbar>
    )
}