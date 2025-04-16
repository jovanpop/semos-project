import React from "react";
import { Nav, Navbar, Container, Image, Button } from 'react-bootstrap';
// import { api } from "../../constants/ApiConstants";
import logo from "../../assets/images/logo.svg";
import { VscCircleFilled } from "react-icons/vsc";

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
        <Navbar style={{ paddingTop:"3%",marginBottom: "5%",marginLeft:"-1%"}} variant="light">
            <Container >
                <Navbar.Brand href="/" >
                    <Image style={{ height: "3.5rem" }} src={logo} ></Image>
                </Navbar.Brand>
                <Nav id="links" style={{alignItems: "baseline" ,width:"40%",marginLeft:"5%"}}>
                    <Nav.Link  href="/breakfast" style={window.location.href === "http://localhost:3000/breakfast" ? {color:"orange"}:{color:"darkgray"}}>BREAKFAST</Nav.Link>
                    <VscCircleFilled style={{ alignSelf: "center", color: "orange",marginLeft:"2%",marginRight:"2%",fontSize:"18px",marginTop:"-2px" }} />
                    <Nav.Link style={window.location.href === "http://localhost:3000/brunch" ? {color:"orange"}:{color:"darkgray",marginTop:"-2px"}} href="/brunch">BRUNCH</Nav.Link>
                    <VscCircleFilled style={{ alignSelf: "center", color: "orange",marginLeft:"2%",marginRight:"2%",fontSize:"18px",marginTop:"-2px"  }} />
                    <Nav.Link style={window.location.href === "http://localhost:3000/lunch" ? {color:"orange"}:{color:"darkgray"}} href="/lunch">LUNCH</Nav.Link>
                    <VscCircleFilled style={{ alignSelf: "center", color: "orange",marginLeft:"2%",marginRight:"2%",fontSize:"18px",marginTop:"-2px" }} />
                    <Nav.Link style={window.location.href === "http://localhost:3000/dinner" ? {color:"orange"}:{color:"darkgray"}} href="/dinner">DINNER</Nav.Link>
                </Nav>
                {!token 
                    ?<Nav id="links"  style={{width:"23.8%"}}>
                        <Nav.Link href="/login"><Button id="loginButton">LOG IN</Button></Nav.Link> 
                        <span style={{ alignSelf: "center", margin:"2.5%", color: "orange",fontSize:"15px"}}>or</span> 
                        <Nav.Link href="/register"><Button id="greenButton" style={{fontSize:"15px",height: "106%"}}>CREATE ACCOUNT</Button></Nav.Link>
                    </Nav>
                    
                    :<Nav id="links" style={{textDecoration: "underline",textUnderlineOffset:"18%",textDecorationThickness:"2px",fontSize:"16px",marginRight:"-1.5%"}}>
                        <Nav.Link href="/myrecipes" style={{color:"rgb(171, 216, 8)", alignSelf:"center",textDecorationColor:"darkgray" }}>MY RECIPES</Nav.Link><VscCircleFilled style={{ alignSelf: "center", color:"GrayText" }} />
                        <Nav.Link href="/myprofile" style={{ color: "orange",textDecorationColor:"darkgray" }}>MY PROFILE</Nav.Link><VscCircleFilled style={{ alignSelf: "center", color:"GrayText" }} />
                        <Nav.Link href="/" onClick={()=>localStorage.removeItem("token")} style={{color:"darkgray"}}>LOG OUT</Nav.Link>
                    </Nav>
                }
            </Container>
        </Navbar>
    )
}