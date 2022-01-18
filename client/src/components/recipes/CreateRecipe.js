import React, { useState } from "react";
import { Container, Button, Row, Col, Form, Image } from "react-bootstrap";
import { api } from "../../constants/ApiConstants";
import { IoArrowUndoCircle } from "react-icons/all";

export function CreateRecipe() {
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [preparation, setPreparation] = useState("");
    const [people, setPeople] = useState("");
    const [content, setContent] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("https://static.toiimg.com/thumb/53110049.cms?width=1200&height=900");

    function handleImage(e) {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setImage(reader.result)
            }
        }
        reader.readAsDataURL(e.target.files[0])
    }

    function createMyRecipe(e) {
        e.preventDefault();

        const formData = new FormData();
        const imageUpload = document.querySelector('input[type="file"]');

        formData.append("image", imageUpload.files[0]);
        formData.append('title', title);
        formData.append('category', category);
        formData.append('preparation', preparation);
        formData.append('people', people);
        formData.append('content', content);
        formData.append('description', description);

        fetch(`${api.root}/recipes/myrecipes`, {
            method: 'POST',
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
                if (data.err === true) {
                    alert(data.message)
                } else {
                    window.location = "/myrecipes";
                }
            })
            .catch(err => { if (err) { console.log(err) } })
    }
    return (
        <Container>
            <Row>
                <Col><h2 style={{ color: "green" }}>My Recipes</h2></Col>
                <Col style={{ textAlign: "end" }}><a href="/myrecipes"><h2><IoArrowUndoCircle style={{ color: "orange", fontSize: "140%" }} /></h2></a></Col>
            </Row>
            <Form onSubmit={createMyRecipe} >
                <Row style={{ marginTop: "7%" }}>
                    <Col sm={2}>
                        <Row style={{ height: "34%", width: "130%" }} >
                            <Form.Label>Recipe Image</Form.Label>
                            <Image src={image} style={{ height: "100%", width: "100%", borderRadius: "7%" }} />
                            <Button onClick={() => document.getElementById("fileinput").click()} style={{ width: "90%", margin: "auto", marginTop: "10%" }} variant="outline-secondary">UPLOAD IMAGE</Button>
                            <Form.Control type="file" onChange={handleImage} accept="image/*" id="fileinput" style={{ display: "none" }} />
                        </Row>
                    </Col>
                    <Col style={{ marginLeft: "4%", width: "48%" }} sm={5}>
                        <Row className="mb-4">
                            <Form.Label >Recipe Title</Form.Label>
                            <Form.Control required id="inputField"   placeholder="Homemade Pizza" onChange={(e) => setTitle(e.target.value)} value={title} type="text" style={{ width: "96%", margin: "auto" }} />
                        </Row>
                        <Row className="mb-4">
                            <Col>
                                <Form.Label>Category</Form.Label>
                                <Form.Select required value={category} id="inputField" onChange={(e) => setCategory(e.target.value)} aria-label="Default select example">
                                    <option value="">Select</option>
                                    <option value="Breakfast">Breakfast</option>
                                    <option value="Brunch">Brunch</option>
                                    <option value="Lunch">Lunch</option>
                                    <option value="Dinner">Dinner</option>
                                </Form.Select>
                            </Col>
                            <Col>
                                <Form.Label>Preparation Time</Form.Label>
                                <Form.Control required id="inputField" placeholder="45" onChange={(e) => setPreparation(e.target.value)} value={preparation} type="number" />
                            </Col>
                            <Col>
                                <Form.Label>No. People</Form.Label>
                                <Form.Control required id="inputField" placeholder="4" onChange={(e) => setPeople(e.target.value)} value={people} type="number" />
                            </Col>
                        </Row>
                        <Row className="mb-4">
                            <Col>
                                <Form.Label>Short Description</Form.Label>
                                <Form.Control id="inputField"
                                    as="textarea"
                                    placeholder=""
                                    rows="4"
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    required
                                    style={{resize: "none"}}
                                />
                            </Col>
                            <Row style={{ margin: "auto", marginTop: "7%" }} sm={5}>
                                <Button type="submit" variant="success">SAVE</Button>
                            </Row>
                        </Row>
                    </Col>
                    <Col sm={4} style={{ marginLeft: "1%",width:"30%" }}>
                        <Form.Label>Recipe</Form.Label>
                        <Form.Control id="inputField"
                            as="textarea"
                            placeholder=""
                            rows="12"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                            style={{resize: "none"}}
                        />
                    </Col>
                </Row>
            </Form >
        </Container >
    )
}