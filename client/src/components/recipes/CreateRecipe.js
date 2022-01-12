import React, { useState } from "react";
import { Container, Button, Row, Col, Form } from "react-bootstrap";
import { api } from "../../constants/ApiConstants";

export function CreateRecipe() {
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [preparation, setPreparation] = useState("");
    const [people, setPeople] = useState("");
    const [content, setContent] = useState("");
    const [description, setDescription] = useState("");
    function createMyRecipe() {
        let recipe = {
            title: title,
            category: category,
            preparation: preparation,
            people: people,
            content: content,
            description: description
        }
        fetch(`${api.root}/recipes/myrecipes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify(recipe)
        })
            .then(res => res.json())
            .then(data => {
                if (data.err === true) {
                    alert(data.message)
                } else {
                    const redirect = () => { window.location = "http://localhost:3000/myrecipes" }
                    redirect();
                }
            })
            .catch(err => alert(err))
    }
    return (
        <Container>
            <Row><h3 style={{ color: "green" }}>My Recipes</h3></Row>
            <Row style={{ marginTop: "7%" }}>
                <Col>
                    <Form style={{ width: "80%" }} >
                        <Row className="mb-3">
                            <Col>
                                <Form.Label>Recipe Title</Form.Label>
                                <Form.Control placeholder="Homemade Pizza" onChange={(e) => setTitle(e.target.value)} value={title} type="text" />
                            </Col>
                            <Col>
                                <Form.Label>Category</Form.Label>
                                <Form.Select value={category} onChange={(e) => setCategory(e.target.value)} aria-label="Default select example">
                                    <option>Select</option>
                                    <option value="Breakfast">Breakfast</option>
                                    <option value="Brunch">Brunch</option>
                                    <option value="Lunch">Lunch</option>
                                    <option value="Dinner">Dinner</option>
                                </Form.Select>
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col>
                                <Form.Label>Preparation Time</Form.Label>
                                <Form.Control placeholder="45" onChange={(e) => setPreparation(e.target.value)} value={preparation} type="number" />
                            </Col>
                            <Col>
                                <Form.Label>No. People</Form.Label>
                                <Form.Control placeholder="4" onChange={(e) => setPeople(e.target.value)} value={people} type="number" />
                            </Col>
                        </Row>
                        <Row className="mb-4">
                            <Col>
                                <Form.Label>Short Description</Form.Label>
                                <Form.Control placeholder="Content" onChange={(e) => setContent(e.target.value)} value={content} type="text" />
                            </Col>
                            <Col>
                                <Form.Label>Recipe</Form.Label>
                                <Form.Control placeholder="Description" onChange={(e) => setDescription(e.target.value)} value={description} type="text" />
                            </Col>
                        </Row>
                        <Button type="button" onClick={createMyRecipe} variant="success">Create</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}