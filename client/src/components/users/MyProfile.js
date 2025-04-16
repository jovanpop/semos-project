import React, { useEffect, useState } from "react";
import { Container, Button, Row, Col, Form, Image } from "react-bootstrap";
import { api } from "../../constants/ApiConstants";
import { PopAlert } from "../partials/Alert";
const bcrypt = require("bcryptjs");

export function MyProfile() {
    const [first_name, setFirst_name] = useState("");
    const [last_name, setLast_name] = useState("");
    const [email, setEmail] = useState("");
    const [birthday, setBirthday] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPW, setConfirmPW] = useState("");
    const [image, setImage] = useState(null);
    const [Alert, setAlert] = useState(false);
    const [alertMsg, setAlertMsg] = useState("");
    const [error, setError] = useState(false);

    window.onload = () => {
        const pastedText = document.getElementById("confirmPW");
        pastedText.onpaste = (e) => { e.preventDefault() }
    }

    function handleImage(e) {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setImage(reader.result)
            }
        }
        reader.readAsDataURL(e.target.files[0])
    }

    function getUser() {
        fetch(`${api.root}/users`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then(res => {
                if (res.status === 401) {
                    setError(true);
                    setAlert(true);
                    setAlertMsg("Token");
                    localStorage.removeItem("token");
                } else {
                    return res.json();
                }
            })
            .then(data => {
                if (data) {
                    if (data.err === false) {
                        setFirst_name(data.user.first_name);
                        setLast_name(data.user.last_name);
                        setEmail(data.user.email);
                        setBirthday(data.user.birthday);
                        setImage(`${api.root}/${data.user.image}`);
                    } else {
                        setError(true);
                        setAlert(true);
                        setAlertMsg(data.message);
                    }
                }
            }
            )
            .catch(err => {
                setError(true);
                setAlert(true);
                setAlertMsg(err);
            })
    }
    useEffect(() => {
        getUser();
    }, [])

    function updateUser(e) {
        e.preventDefault();

        const formData = new FormData();
        const imageUpload = document.querySelector('input[type="file"]');

        formData.append('first_name', first_name);
        formData.append('image', imageUpload.files[0]);
        formData.append('last_name', last_name);
        formData.append('email', email);
        formData.append('birthday', birthday);
        if (confirmPW === password) {
            if (password !== "") {
                formData.append('password', bcrypt.hashSync(password));
            }
            try {
                fetch(`${api.root}/users/update`, {
                    method: 'PATCH',
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    },
                    body: formData
                })
                    .then(res => {
                        if (res.status === 401) {
                            setError(true);
                            setAlert(true);
                            setAlertMsg("Token");
                            localStorage.removeItem("token");
                        } else {
                            return res.json();
                        }
                    })
                    .then(data => {
                        if (data) {
                            if (data.err === false) {
                                setAlert(true);
                                setError(false);
                                setAlertMsg(data.message);
                            } else {
                                if (data.message.slice(0,37) === "E11000 duplicate key error collection") {
                                    setError(true);
                                    setAlert(true);
                                    setAlertMsg("Email");
                                    setTimeout(() => { setAlert(false); setError(false) }, 1500);
                                }
                                else {
                                    setError(true);
                                    setAlert(true);
                                    setAlertMsg(data.message);
                                }
                            }
                        }
                    })
                    .catch(err => {
                        setError(true);
                        setAlert(true);
                        setAlertMsg(err);
                    })
            }
            catch {
                setError(true);
                setAlert(true);
                setAlertMsg("Ooops something went wrong. Please try again later.");
            }
        } else {
            setError(true);
            setAlert(true);
            setAlertMsg("Password");
            setTimeout(() => { setAlert(false); setError(false) }, 1500)
        }
    }

    return (
        <Container fluid="true" >
            <PopAlert Alert={Alert} alertMsg={alertMsg} error={error} />
            <Row><h2 id="pageTitle">My Profile</h2></Row>
            <Form onSubmit={updateUser} >
                <Row style={{ marginTop: "7%" }} >
                    <Col sm={2}>
                        <Row style={{ height: "35%", width: "75%", marginLeft: "2%", marginTop: "-3%" }} >
                            <Form.Label></Form.Label>
                            <Image src={image} style={{ height: "100%", width: "100%", objectFit: "cover" }} roundedCircle />
                        </Row>
                        <Row style={{ margin: "21%  0  0  -3%", width: "85%", height: "40%" }}>
                            <Button id="uploadButton" onClick={() => document.getElementById("fileinput").click()} variant="outline-secondary">CHANGE AVATAR</Button>
                            <Form.Control id="fileinput" onChange={handleImage} type="file" accept="image/*" style={{ display: "none" }} />
                        </Row>
                    </Col>
                    <Col style={{ marginLeft: "4%", width: "53%" }} sm={6}>
                        <Row className="mb-4" >
                            <Col  >
                                <Form.Label id="inputLabel">First Name</Form.Label>
                                <Form.Control required id="inputFieldFN" onChange={(e) => setFirst_name(e.target.value)} value={first_name} type="text" />
                            </Col>
                            <Col  >
                                <Form.Label id="inputLabel">Last Name</Form.Label>
                                <Form.Control id="inputFieldLN" required onChange={(e) => setLast_name(e.target.value)} value={last_name} type="text" />
                            </Col>
                        </Row>
                        <Row className="mb-4">
                            <Col  >
                                <Form.Label id="inputLabel">Email</Form.Label>
                                <Form.Control id="inputFieldEmail" required onChange={(e) => setEmail(e.target.value)} value={email} type="email" />
                            </Col>
                            <Col   >
                                <Form.Label id="inputLabel">Birthday</Form.Label>
                                <Form.Control id="inputFieldBD" required onChange={(e) => setBirthday(e.target.value)} value={birthday} type="date" />
                            </Col>
                        </Row>
                        <Row className="mb-4">
                            <Col  >
                                <Form.Label id="inputLabel">Password</Form.Label>
                                <Form.Control id="inputFieldPW" autoComplete="new-password" onChange={(e) => setPassword(e.target.value)} placeholder="******" value={password} type="password" />
                            </Col>
                            <Col  >
                                <Form.Label id="inputLabel">Repeat password</Form.Label>
                                <Form.Control id="confirmPW" onChange={(e) => setConfirmPW(e.target.value)} value={confirmPW} placeholder="******" type="password" />
                            </Col>
                            <Row style={{ margin: "auto", marginTop: "5%" }} sm={5}>
                                <Button type="submit" id="greenButton" style={{ width: "20%" }} variant="success">SAVE</Button>
                            </Row>
                        </Row>
                    </Col>
                </Row>
            </Form>
        </Container>
    )
}