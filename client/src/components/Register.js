import React from "react";
import { Container, Button, Row, Col, Form } from "react-bootstrap";

export function Register() {
    return (
        <Container>
            <Row><h3 style={{ color: "green" }}>Login</h3></Row>
            <Row style={{ marginTop: "7%" }}>
                <Col style={{ paddingRight: "10%" }} xs={5}>
                    <h1>Create Your Account</h1>
                    <div>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestias aut, repellat ipsum facere voluptate dicta obcaecati deserunt nobis suscipit eaque?
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestias aut, repellat ipsum facere voluptate dicta obcaecati deserunt nobis suscipit eaque?
                    </div>
                </Col>
                <Col>
                    <Form style={{ width: "80%" }} >
                        <Row className="mb-3">
                            <Col>
                                <Form.Label>First Name</Form.Label>
                                <Form.Control placeholder="John" type="text" />
                            </Col>
                            <Col>
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control placeholder="Smith" type="text"/>
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col>
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" placeholder="john@smith.com" />
                            </Col>
                            <Col>
                                <Form.Label>Birthday</Form.Label>
                                <Form.Control type="date" />
                            </Col>
                        </Row>
                        <Row className="mb-4">
                            <Col>
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="*****" />
                            </Col>
                            <Col>
                                <Form.Label>Repeat password</Form.Label>
                                <Form.Control type="password" placeholder="*****" />
                            </Col>
                        </Row>
                        <Button variant="success">Create Account</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}