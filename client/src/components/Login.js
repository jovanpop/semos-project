import React from "react";
import { Container, Button, Row, Col, Form } from "react-bootstrap";

export function Login() {
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
                            <Form.Control type="email" placeholder="user@domain.com" />
                        </Form.Group>
                        <Form.Group className="mb-4" controlId="formGroupPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="*****" />
                        </Form.Group>
                        <Button variant="success">Log In</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}