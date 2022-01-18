import React, { useState } from "react";
import { Container, Button, Row, Col, Form } from "react-bootstrap";
import { api } from "../../constants/ApiConstants";
const bcrypt=require("bcryptjs");

export function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
     function postLogin(e) {
         e.preventDefault();
        let user = {
            email: email
        }
         fetch(`${api.root}/users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then ( data => {
                if (bcrypt.compareSync(password,`${data.userPW}`) === true && data.err===false){
                    localStorage.setItem("token",data.token);
                    const redirect=()=>{window.location="/myrecipes"};
                    redirect();
                }else{
                    alert("Invalid credentials")
                }
                }
            )
            .catch(err => alert(err))
    }
    return (
        <Container>
            <Row><h2 id="greenText">Log in</h2></Row>
            <Row style={{ marginTop: "7%" }}>
                <Col style={{ paddingRight: "15%" }}>
                    <h1>Welcome to <span style={{color:"graytext"}}>Baby's</span></h1>
                    <div style={{color:"darkgray",fontWeight:"normal",fontSize:"19px",marginTop:"5%"}}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestias aut, repellat ipsum facere voluptate dicta obcaecati deserunt nobis suscipit eaque?
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestias aut, repellat ipsum facere voluptate dicta obcaecati deserunt nobis suscipit eaque?
                    </div>
                </Col>
                <Col xs={4}>
                    <Form onSubmit={postLogin} style={{ width: "70%" }} >
                        <Form.Group className="mb-3" controlId="formGroupEmail">
                            <Form.Label>Email </Form.Label>
                            <Form.Control required id="inputField" onChange={(e) => setEmail(e.target.value)} value={email} type="email" placeholder="user@domain.com" />
                        </Form.Group>
                        <Form.Group className="mb-4" controlId="formGroupPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control required  id="inputField" value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="*****" />
                        </Form.Group>
                        <Button id="greenButton" style={{width:"40%"}} type="submit" variant="success"><b>LOG IN</b></Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}