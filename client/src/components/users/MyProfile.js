import React, { useEffect, useState } from "react";
import { Container, Button, Row, Col, Form, Image } from "react-bootstrap";
import { api } from "../../constants/ApiConstants";
const bcrypt = require("bcryptjs");

export function MyProfile() {
    const [first_name, setFirst_name] = useState("");
    const [last_name, setLast_name] = useState("");
    const [email, setEmail] = useState("");
    const [birthday, setBirthday] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPW, setConfirmPW] = useState("");
    const [image, setImage] = useState(null);

    function handleImage(e) {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setImage(reader.result)
            }
            reader.readAsDataURL(e.target.files[0])
        }
    }

    function getUser() {
        fetch(`${api.root}/users`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then(res => {
                if (res.status === 401) {
                    alert("Token expired");
                    localStorage.removeItem("token");
                    window.location = "/login";
                }
                return res.json();
            })
            .then(data => {
                setFirst_name(data.user.first_name)
                setLast_name(data.user.last_name)
                setEmail(data.user.email)
                setBirthday(data.user.birthday)
                setPassword(data.user.password)
                setConfirmPW(data.user.password)
                if (data.user.image === "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png") {
                    setImage("https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png")
                } else {
                    setImage(`${api.root}/${data.user.image}`)
                }
            }
            )
    }
    useEffect(() => {
        getUser();
    }, []);

    function updateUser(e) {
        e.preventDefault();

        const formData = new FormData();
        const imageUpload = document.querySelector('input[type="file"]');

        formData.append('first_name', first_name);
        formData.append('image', imageUpload.files[0]);
        formData.append('last_name', last_name);
        formData.append('email', email);
        formData.append('password', bcrypt.hashSync(password));
        formData.append('birthday', birthday);

        if (confirmPW === password) {
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
                            alert("Token expired");
                            localStorage.removeItem("token");
                            window.location = "/login";
                        }
                        return res.json();
                    })
                    .then(data => {
                        if (data.err === false) {
                            alert(data.message);
                            window.location.reload();
                        } else {
                            alert(data.message);
                        }
                    })
            }
            catch { alert("Ooops something went wrong") }
        } else {
            alert("Passwords don't match");
        }
    }

    return (
        <Container>
            <Row><h2 style={{ color: "green" }}>My Profile</h2></Row>
            <Form onSubmit={updateUser} >
                <Row style={{ marginTop: "7%" }} >
                    <Col sm={2}>
                        <Row style={{ height: "38%", width: "85%" }} >
                            <Image src={image} style={{ height: "100%", width: "100%" }} roundedCircle />
                        </Row>
                        <Row style={{ marginTop: "15%", width: "85%" }}>
                            <Button onClick={() => document.getElementById("fileinput").click()} variant="outline-secondary">CHANGE AVATAR</Button>
                            <Form.Control onChange={handleImage} type="file" accept="image/*" id="fileinput" style={{ display: "none" }} />
                        </Row>
                    </Col>
                    <Col style={{ marginLeft: "4%", width: "55%" }} sm={6}>
                        <Row className="mb-4" >
                            <Col  >
                                <Form.Label>First Name</Form.Label>
                                <Form.Control required onChange={(e) => setFirst_name(e.target.value)} value={first_name} type="text" />
                            </Col>
                            <Col  >
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control required onChange={(e) => setLast_name(e.target.value)} value={last_name} type="text" />
                            </Col>
                        </Row>
                        <Row className="mb-4">
                            <Col  >
                                <Form.Label>Email</Form.Label>
                                <Form.Control required onChange={(e) => setEmail(e.target.value)} value={email} type="email" />
                            </Col>
                            <Col   >
                                <Form.Label>Birthday</Form.Label>
                                <Form.Control required onChange={(e) => setBirthday(e.target.value)} value={birthday} type="date" />
                            </Col>
                        </Row>
                        <Row className="mb-4">
                            <Col  >
                                <Form.Label>Password</Form.Label>
                                <Form.Control required onChange={(e) => setPassword(e.target.value)} value={password} type="password" />
                            </Col>
                            <Col  >
                                <Form.Label>Repeat password</Form.Label>
                                <Form.Control required onChange={(e) => setConfirmPW(e.target.value)} value={confirmPW} type="password" />
                            </Col>
                            <Row style={{ margin: "auto", marginTop: "5%" }} sm={5}>
                                <Button type="submit" variant="success">SAVE</Button>
                            </Row>
                        </Row>
                    </Col>
                </Row>
            </Form>
        </Container>
    )
}