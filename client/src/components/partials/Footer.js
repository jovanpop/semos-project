import React from "react";
import { Nav,Navbar, Container, Image} from 'react-bootstrap';
import {AiOutlineCopyrightCircle,VscCircleFilled} from "react-icons/all"
import logo from "./logo.svg";

export function Footer() {
    return (
        <Navbar bg="dark" style={{marginTop:"10%",height:"13rem"}} >
            <Container>
                <Navbar.Brand href="/">
                <Image style={{height:"2.5rem"}} src={logo}/>
                </Navbar.Brand>
                <Nav style={{alignItems: "baseline" ,fontSize:"14px",width:"40%" }}>
                    <Nav.Link style={{color:"white"}} href="/breakfast">BREAKFAST</Nav.Link><VscCircleFilled style={{ alignSelf: "center", color: "white",marginLeft:"2%",marginRight:"2%" }} />
                    <Nav.Link  style={{color:"white"}} href="/brunch">BRUNCH</Nav.Link><VscCircleFilled style={{ alignSelf: "center", color: "white",marginLeft:"2%",marginRight:"2%" }} />
                    <Nav.Link  style={{color:"white"}} href="lunch">LUNCH</Nav.Link><VscCircleFilled style={{ alignSelf: "center", color: "white",marginLeft:"2%",marginRight:"2%" }} />
                    <Nav.Link  style={{color:"white"}} href="dinner">DINNER</Nav.Link>
                </Nav>
                <span style={{color:"white",textAlign:"end",fontWeight:"normal"}}>Baby's Food Place<br/> copyright <sup><AiOutlineCopyrightCircle/></sup> 2021</span>
            </Container>
        </Navbar>
    )
}