import React, { useEffect, useState } from "react";
import { Container, Button, Row, Col, Form,Image } from "react-bootstrap";
import { api } from "../../constants/ApiConstants";

export function MyProfile() {
    const [first_name, setFirst_name] = useState("");
    const [last_name, setLast_name] = useState("");
    const [email, setEmail] = useState("");
    const [birthday, setBirthday] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPW, setConfirmPW] = useState("");
    function getUser() {
        fetch(`${api.root}/users`,{
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then(res => res.json())
            .then(data => {
                setFirst_name(data.user.first_name)
                setLast_name(data.user.last_name)
                setEmail(data.user.email)
                setBirthday(data.user.birthday)
                setPassword(data.user.password)
                setConfirmPW(data.user.password)
            }
            )
    }
    useEffect(() => {
        getUser();
    }, [])
    function updateUser() {
        let user = {
            first_name: first_name,
            last_name: last_name,
            email: email,
            birthday: birthday,
            password: password,
            confirmPW: confirmPW
        }
        fetch(`${api.root}/users/update`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => alert(data.message))
            .catch(err => alert(err))
    }
    return (
        <Container>
            <Row><h3 style={{ color: "green" }}>My Profile</h3></Row>
            <Row style={{ marginTop: "7%" }}>
                <Col style={{margin:"auto",marginTop:"0",marginRight:"5%"}} sm={2}>
                    <Image src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png" style={{width:"70%",margin:"auto"}} roundedCircle />
                    <Row>
                    <Button style={{width:"70%",marginTop:"10%"}} variant="outline-secondary">Change Avatar</Button>
                    </Row>
                </Col>
                <Col>
                    <Form onSubmit={updateUser} style={{ width: "100%" }} >
                        <Row sm={3} className="mb-3" >
                            <Col>
                                <Form.Label>First Name</Form.Label>
                                <Form.Control onChange={(e) => setFirst_name(e.target.value)} value={first_name} type="text" />
                            </Col>
                            <Col>
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control onChange={(e) => setLast_name(e.target.value)} value={last_name} type="text" />
                            </Col>
                        </Row>
                        <Row sm={3} className="mb-3">
                            <Col>
                                <Form.Label>Email</Form.Label>
                                <Form.Control onChange={(e) => setEmail(e.target.value)} value={email} type="email" />
                            </Col>
                            <Col>
                                <Form.Label>Birthday</Form.Label>
                                <Form.Control onChange={(e) => setBirthday(e.target.value)} value={birthday} type="date" />
                            </Col>
                        </Row>
                        <Row sm={3} className="mb-4">
                            <Col>
                                <Form.Label>Password</Form.Label>
                                <Form.Control onChange={(e) => setPassword(e.target.value)} value={password} type="password" />
                            </Col>
                            <Col>
                                <Form.Label>Repeat password</Form.Label>
                                <Form.Control onChange={(e) => setConfirmPW(e.target.value)} value={confirmPW} type="password" />
                            </Col>
                        </Row>
                        <Button type="submit" variant="success">Save</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}