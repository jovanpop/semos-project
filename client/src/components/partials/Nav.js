import React from "react";
import { Nav, Navbar, Container, Image, Button } from 'react-bootstrap';
import { api } from "../../constants/ApiConstants";
import logo from "./logo.svg";
import {VscCircleFilled} from "react-icons/all";

export function Navigation() {
    const token = localStorage.getItem("token")
    // const logOut = () => {
    //     fetch(`${api.root}/users/logout`, {
    //         method: "PUT",
    //         headers: {
    //             Authorization: `Bearer ${token}`,
    //             'Content-Type': 'application/json'
    //         }
    //     })
    //         .then(res => res.json())
    //         .then(data=>console.log(data.message))
    //         .catch(err => alert(err))
    //     localStorage.removeItem("token")
    // }
    return (
        <Navbar style={{ paddingTop:"3%",marginBottom: "4%", fontWeight: "bold" }} variant="light">
            <Container>
                <Navbar.Brand href="/" >
                    <Image style={{ height: "3rem" }} src={logo} ></Image>
                </Navbar.Brand>
                <Nav style={{alignItems: "baseline" ,fontSize:"16px",width:"35%"}}>
                    <Nav.Link href="/breakfast" style={window.location.href === "http://localhost:3000/breakfast" ? {color:"orange"}:{color:"darkgray"}}>BREAKFAST</Nav.Link>
                    <VscCircleFilled style={{ alignSelf: "center", color: "orange",marginLeft:"2%",marginRight:"2%" }} />
                    <Nav.Link style={window.location.href === "http://localhost:3000/brunch" ? {color:"orange"}:{color:"darkgray"}} href="/brunch">BRUNCH</Nav.Link>
                    <VscCircleFilled style={{ alignSelf: "center", color: "orange",marginLeft:"2%",marginRight:"2%" }} />
                    <Nav.Link style={window.location.href === "http://localhost:3000/lunch" ? {color:"orange"}:{color:"darkgray"}} href="/lunch">LUNCH</Nav.Link>
                    <VscCircleFilled style={{ alignSelf: "center", color: "orange",marginLeft:"2%",marginRight:"2%" }} />
                    <Nav.Link style={window.location.href === "http://localhost:3000/dinner" ? {color:"orange"}:{color:"darkgray"}} href="/dinner">DINNER</Nav.Link>
                </Nav>
                {!token 
                    ?<Nav style={{width:"23.8%"}}>
                        <Nav.Link href="/login"><Button variant="outline-secondary" style={{fontWeight:"bold", backgroundColor:"transparent",border:"1px solid darkgray",width:"135%",marginLeft:"-35%",fontSize:"15px",color:"darkgray"}}>LOG IN</Button></Nav.Link> 
                        <span style={{ alignSelf: "center", margin:"2%", fontSize: "15px", color: "orange" }}>or</span> 
                        <Nav.Link href="/register"><Button id="greenButton"  style={{fontWeight:"bold",fontSize:"15px"}}>CREATE ACCOUNT</Button></Nav.Link>
                    </Nav>
                    
                    :<Nav style={{ textDecoration: "underline",textUnderlineOffset:"15%",textDecorationThickness:"2px",fontSize:"17px"}}>
                        <Nav.Link href="/myrecipes" style={{color:"rgb(171, 216, 8)", alignSelf:"center",textDecorationColor:"gray" }}>MY RECIPES</Nav.Link><VscCircleFilled style={{ alignSelf: "center", color: "gray" }} />
                        <Nav.Link href="/myprofile" style={{ color: "orange",textDecorationColor:"gray" }}>MY PROFILE</Nav.Link><VscCircleFilled style={{ alignSelf: "center", color: "gray" }} />
                        <Nav.Link href="/" onClick={()=>localStorage.removeItem("token")}>LOG OUT</Nav.Link>
                    </Nav>
                }
            </Container>
        </Navbar>
    )
}