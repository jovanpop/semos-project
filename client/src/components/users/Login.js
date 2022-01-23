import React, { useState } from "react";
import { Container, Button, Row, Col, Form } from "react-bootstrap";
import { api } from "../../constants/ApiConstants";
const bcrypt = require("bcryptjs");

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
            .then(data => {
                if (bcrypt.compareSync(password, `${data.userPW}`) && data.err === false) {
                    localStorage.setItem("token", data.token);
                    const redirect = () => {
                        window.location = "/myrecipes"
                    };
                    redirect();
                } else {
                    alert("Invalid credentials")
                }
            }
            )
            .catch(err => alert(err))
    }
    return (
        <Container id="container">
            <Row><h2 id="pageTitle">Log in</h2></Row>
            <Row style={{ marginTop: "7%" }}>
                <Col style={{ marginRight: "10%" }}>
                    <h1 style={{ fontWeight: "bold" }}>Welcome to <span id="container" style={{ color: "graytext", fontWeight: "600" }}>Baby's</span></h1>
                    <div style={{ color: "darkgray", fontWeight: "normal", fontSize: "18px", marginTop: "4%" }}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestias aut, repellat ipsum facere voluptate dicta obcaecati deserunt nobis suscipit eaque?
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestias aut, repellat ipsum facere voluptate dicta obcaecati deserunt nobis suscipit eaque?
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestias aut, repellat ipsum facere voluptate dicta obcaecati deserunt nobis suscipit eaque?
                    </div>
                </Col>
                <Col xs={4}>
                    <Form onSubmit={postLogin} style={{ width: "70%" }} >
                        <Form.Group className="mb-4">
                            <Form.Label id="inputLabel">Email </Form.Label>
                            <Form.Control placeholdertextcolor="red" id="inputField" required onChange={(e) => setEmail(e.target.value)} value={email} type="email" placeholder="user@domain.com" />
                        </Form.Group>
                        <Form.Group className="mb-4" >
                            <Form.Label id="inputLabel">Password</Form.Label>
                            <Form.Control required id="inputField" value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="*****" />
                        </Form.Group>
                        <Col>
                            <Button id="greenButton" style={{ marginTop: "4%", width: "40%" }} type="submit" variant="success"><b>LOG IN</b></Button>
                        </Col>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}