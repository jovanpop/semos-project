import React, { useState } from "react";
import { Container, Button, Row, Col, Form } from "react-bootstrap";
import { api } from "../../constants/ApiConstants";
import { PopAlert } from "../partials/Alert";
const bcrypt = require("bcryptjs");

export function Register() {
    const [first_name, setFirst_name] = useState("");
    const [last_name, setLast_name] = useState("");
    const [email, setEmail] = useState("");
    const [birthday, setBirthday] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPW, setConfirmPW] = useState("");
    const [Alert, setAlert] = useState(false);
    const [alertMsg, setAlertMsg] = useState("");
    const [error, setError] = useState(false);

    function postUser(e) {
        e.preventDefault();
        let user = {
            first_name: first_name,
            last_name: last_name,
            email: email,
            birthday: birthday,
            password: bcrypt.hashSync(password)
        }
        if (password === confirmPW) {
            fetch(`${api.root}/users/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            })
                .then(res => res.json())
                .then(data => {
                    if (data.err === false) {
                        setError(false);
                        setAlert(true);
                        setAlertMsg(data.message);
                        const redirect = () => {
                            window.location = "/login"
                        }
                        setTimeout(() => { redirect() }, 500)
                    } else {
                        if (data.message === "This email is already taken !") {
                            setError(true);
                            setAlert(true);
                            setAlertMsg("Email");
                            setTimeout(() => { setAlert(false); setError(false) }, 1500);
                        } else {
                            setError(true);
                            setAlert(true);
                            setAlertMsg(data.message);
                        }
                    }
                })
                .catch(err => {
                    setError(true);
                    setAlert(true);
                    setAlertMsg(err);
                })
        } else {
            setError(true);
            setAlert(true);
            setAlertMsg("Password");
            setTimeout(() => { setAlert(false); setError(false) }, 1500);
        }
    }
    
    return (
        <Container fluid="true" id="container">
            <PopAlert Alert={Alert} alertMsg={alertMsg} error={error} />
            <style>{` @media(max-width: 992px){ .row{ flex-direction: column} .col-5{ padding-right: 0 !important; width:100% !important;} .col{margin-top:15px !important; width: 91% !important;}} }  `}</style>
            <Row ><h2 id="pageTitle">Create Account</h2></Row>
            <Row fluid="true" style={{ marginTop: "7%" }}>
                <Col style={{ paddingRight: "8%" }} xs={5}>
                    <h1 style={{ fontWeight: "bold" }}>Create your <div style={{ color: "graytext", fontWeight: "600" }}>account</div></h1>
                    <div style={{ color: "darkgray", fontWeight: "normal", fontSize: "18px", marginTop: "5%" }}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestias aut, repellat ipsum facere voluptate dicta obcaecati deserunt nobis suscipit eaque?
                        Lorem, ipsum dolor sit ametaaaaa asd asd consectetur aaaaaaaaaa aaaaaaaa adipisicing elit. Molestias aut, repellat ipsum facere voluptate dicta obcaecati deserunt nobis suscipit eaque?
                    </div>
                </Col>
                <Col>
                    <Form onSubmit={postUser} style={{ width: "80%" }} >
                        <Row className="mb-4">
                            <Col>
                                <Form.Label id="inputLabel">First Name</Form.Label>
                                <Form.Control id="inputFieldFN" required onChange={(e) => setFirst_name(e.target.value)} value={first_name} placeholder="John" type="text" />
                            </Col>
                            <Col>
                                <Form.Label id="inputLabel">Last Name</Form.Label>
                                <Form.Control id="inputFieldLN" required onChange={(e) => setLast_name(e.target.value)} value={last_name} placeholder="Smith" type="text" />
                            </Col>
                        </Row>
                        <Row className="mb-4">
                            <Col>
                                <Form.Label id="inputLabel">Email</Form.Label>
                                <Form.Control id="inputFieldEmail" required onChange={(e) => setEmail(e.target.value)} value={email} type="email" placeholder="john@smith.com" />
                            </Col>
                            <Col>
                                <Form.Label id="inputLabel">Birthday</Form.Label>
                                <Form.Control id="inputFieldBD" required onChange={(e) => setBirthday(e.target.value)} value={birthday} type="date" />
                            </Col>
                        </Row>
                        <Row className="mb-4">
                            <Col>
                                <Form.Label id="inputLabel">Password</Form.Label>
                                <Form.Control id="inputFieldPW" autoComplete="new-password" required onChange={(e) => setPassword(e.target.value)} value={password} type="password" placeholder="*****" />
                            </Col>
                            <Col>
                                <Form.Label id="inputLabel">Repeat password</Form.Label>
                                <Form.Control id="confirmPW" required onPaste={(e)=> e.preventDefault()} onChange={(e) => setConfirmPW(e.target.value)} value={confirmPW} type="password" placeholder="*****" />
                            </Col>
                        </Row>
                        <Button type="submit" style={{ fontSize: "13px", width: "32%", marginTop: "4%" }} id="greenButton" variant="success">CREATE ACCOUNT</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}