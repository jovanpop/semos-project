import React, { useState } from "react";
import { Container, Button, Row, Col, Form } from "react-bootstrap";
import { api } from "../../constants/ApiConstants";

export function Register() {
    const [first_name,setFirst_name]=useState("");
    const [last_name,setLast_name]=useState("");
    const [email,setEmail]=useState("");
    const [birthday,setBirthday]=useState("");
    const [password,setPassword]=useState("");
    const [confirmPW,setConfirmPW]=useState("");
    function postUser() {
        let user = {
            first_name: first_name,
            last_name: last_name,
            email: email,
            birthday: birthday,
            password: password,
            confirmPW: confirmPW
        }
        fetch(`${api.root}/users/register`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
          })
          .then(res=>res.json())
          .then(data=>alert(data.message))
          .catch(err=>alert(err))
}
const handleSubmit = (event) => {
    postUser();
    event.preventDefault();
}
    return (
        <Container>
            <Row><h3 style={{ color: "green" }}>Create Account</h3></Row>
            <Row style={{ marginTop: "7%" }}>
                <Col style={{ paddingRight: "10%" }} xs={5}>
                    <h1>Create Your Account</h1>
                    <div>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestias aut, repellat ipsum facere voluptate dicta obcaecati deserunt nobis suscipit eaque?
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestias aut, repellat ipsum facere voluptate dicta obcaecati deserunt nobis suscipit eaque?
                    </div>
                </Col>
                <Col>
                    <Form onSubmit={handleSubmit} style={{ width: "80%" }} >
                        <Row className="mb-3">
                            <Col>
                                <Form.Label>First Name</Form.Label>
                                <Form.Control  onChange={(e)=>setFirst_name(e.target.value)} value={first_name} placeholder="John" type="text" />
                            </Col>
                            <Col>
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control onChange={(e)=>setLast_name(e.target.value)} value={last_name} placeholder="Smith" type="text"/>
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col>
                                <Form.Label>Email</Form.Label>
                                <Form.Control onChange={(e)=>setEmail(e.target.value)} value={email} type="email" placeholder="john@smith.com" />
                            </Col>
                            <Col>
                                <Form.Label>Birthday</Form.Label>
                                <Form.Control onChange={(e)=>setBirthday(e.target.value)} value={birthday} type="date" />
                            </Col>
                        </Row>
                        <Row className="mb-4">
                            <Col>
                                <Form.Label>Password</Form.Label>
                                <Form.Control onChange={(e)=>setPassword(e.target.value)} value={password} type="password" placeholder="*****" />
                            </Col>
                            <Col>
                                <Form.Label>Repeat password</Form.Label>
                                <Form.Control onChange={(e)=>setConfirmPW(e.target.value)} value={confirmPW} type="password" placeholder="*****" />
                            </Col>
                        </Row>
                        <Button type="submit" variant="success">Create Account</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}