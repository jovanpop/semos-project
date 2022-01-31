import React from "react";
import { Nav,Navbar, Container, Image} from 'react-bootstrap';
import {AiOutlineCopyrightCircle,VscCircleFilled} from "react-icons/all"
import logo from "../../assets/images/footerLogo.svg";

export function Footer() {
    return (
        <Navbar style={{marginTop:"10%",height:"12rem",backgroundColor:"rgb(75, 75, 75)"}} >
            <Container id="footer">
                <Navbar.Brand href="/">
                <Image style={{height:"2.5rem", margin:"5%"}} src={logo}/>
                </Navbar.Brand>
                <Nav id="footerLinks" style={{alignItems: "baseline" ,width:"40%" }}>
                    <Nav.Link style={{color:"white"}} href="/breakfast">BREAKFAST</Nav.Link><VscCircleFilled style={{ alignSelf: "center", color: "white",marginLeft:"1%",marginRight:"1%",fontSize:"15px" }} />
                    <Nav.Link  style={{color:"white"}} href="/brunch">BRUNCH</Nav.Link><VscCircleFilled style={{ alignSelf: "center", color: "white",marginLeft:"1%",marginRight:"1%",fontSize:"15px" }} />
                    <Nav.Link  style={{color:"white"}} href="lunch">LUNCH</Nav.Link><VscCircleFilled style={{ alignSelf: "center", color: "white",marginLeft:"1%",marginRight:"1%",fontSize:"15px" }} />
                    <Nav.Link  style={{color:"white"}} href="dinner">DINNER</Nav.Link>
                </Nav>
                <span style={{color:"white",textAlign:"end"}}>Baby's Food Place<br/> copyright <sup><AiOutlineCopyrightCircle/></sup> 2021</span>
            </Container>
        </Navbar>
    )
}