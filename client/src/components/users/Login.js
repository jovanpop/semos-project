import React, { useState } from "react";
import { Container, Button, Row, Col, Form } from "react-bootstrap";
import { api } from "../../constants/ApiConstants";

export function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    function postLogin() {
        let user = {
            email: email,
            password: password
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
                if (data.err === false) {
                    localStorage.setItem("token", data.token);
                    const redirect=()=>{window.location="http://localhost:3000/myrecipes"};
                    redirect();
                }else{
                alert(data.message)
                }
            })
            .catch(err => alert(err))
    }
    return (
        <Container>
            <Row><h3 style={{ color: "green" }}>Login</h3></Row>
            <Row style={{ marginTop: "7%" }}>
                <Col style={{ paddingRight: "15%" }}>
                    <h1>Welcome to Pizza's</h1>
                    <div>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestias aut, repellat ipsum facere voluptate dicta obcaecati deserunt nobis suscipit eaque?
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestias aut, repellat ipsum facere voluptate dicta obcaecati deserunt nobis suscipit eaque?
                    </div>
                </Col>
                <Col xs={4}>
                    <Form style={{ width: "70%" }} >
                        <Form.Group className="mb-3" controlId="formGroupEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control onChange={(e) => setEmail(e.target.value)} value={email} type="email" placeholder="user@domain.com" />
                        </Form.Group>
                        <Form.Group className="mb-4" controlId="formGroupPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="*****" />
                        </Form.Group>
                        <Button type="button" onClick={postLogin} variant="success">Log In</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}