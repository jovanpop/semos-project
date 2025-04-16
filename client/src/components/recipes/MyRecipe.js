import React, { useEffect, useState } from "react";
import { Container, Button, Row, Col, Form, Image } from "react-bootstrap";
import { IoArrowUndoCircle } from "react-icons/io5";
import { api } from "../../constants/ApiConstants";
import { useParams } from "react-router-dom";
import { PopAlert } from "../partials/Alert";

export function MyRecipe() {

    const { id } = useParams();
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [preparation, setPreparation] = useState("");
    const [people, setPeople] = useState("");
    const [content, setContent] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);
    const [Alert, setAlert] = useState(false);
    const [alertMsg, setAlertMsg] = useState("");
    const [error, setError] = useState(false);

    function handleImage(e) {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setImage(reader.result)
            }
        }
        reader.readAsDataURL(e.target.files[0])
    }

    function getRecipe(id) {
        fetch(`${api.root}/recipes/myrecipes/${id}`, {
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
                    return res.json()
                }
            })
            .then(data => {
                if(data) {
                if (data.err === false){
                setTitle(data.recipe.title)
                setCategory(data.recipe.category)
                setPreparation(data.recipe.preparation)
                setPeople(data.recipe.people)
                setContent(data.recipe.content)
                setDescription(data.recipe.description)
                setImage(`${api.root}/${data.recipe.image}`)}
            }else {
                setError(true);
                setAlert(true);
                setAlertMsg(data.message);
            }
        }
            )
            .catch(err => {
                setError(true);
                setAlert(true);
                setAlertMsg(err);
            });
    }
    useEffect(() => {
        getRecipe(id);
    }, [id])

    function updateRecipe(e) {
        e.preventDefault();

        const formData = new FormData();
        const imageUpload = document.querySelector('input[type="file"]');

        formData.append('title', title);
        formData.append('image', imageUpload.files[0]);
        formData.append('category', category);
        formData.append('preparation', preparation);
        formData.append('people', people);
        formData.append('content', content);
        formData.append('description', description);
        try {
            fetch(`${api.root}/recipes/myrecipes/${id}`, {
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
                    }
                    return res.json();
                })
                .then(data => {
                    if (data){
                    if (data.err === false) {
                        setAlert(true);
                        setError(false);
                        setAlertMsg(data.message);
                    } else {
                        setError(true);
                        setAlert(true);
                        setAlertMsg(data.message);
                    }
                }
                })
                .catch(err=>{
                    setError(true);
                    setAlert(true);
                    setAlertMsg(err);
                })
        }
        catch { 
            setAlert(true);
            setError(true);
            setAlertMsg("Ooops something went wrong. Please try again later.")}
    }

    return (
        <Container fluid="true">
            <PopAlert Alert={Alert} alertMsg={alertMsg} error={error} />
            <Row>
                <Col><h2 style={{ marginRight: "-20px" }} id="pageTitle">My Recipes</h2></Col>
                <Col style={{ textAlign: "end", width: "5%" }} sm={1}><a href="/myrecipes"><IoArrowUndoCircle style={{ color: "orange", fontSize: "310%", marginTop: "-5px" }} /></a></Col>
            </Row>
            <Form onSubmit={updateRecipe} >
                <Row style={{ marginTop: "7%" }}>
                    <Col sm={2}>
                        <Row style={{ height: "34%", width: "130%" }} >
                            <Form.Label id="inputLabel">Recipe Image</Form.Label>
                            <Image src={image} style={{ height: "100%", width: "100%", borderRadius: "7%", objectFit: "cover" }} />
                            <Button id="uploadButton" onClick={() => document.getElementById("fileinput").click()} style={{ width: "90%", margin: "auto", marginTop: "8%", fontSize: "14px" }} variant="outline-secondary">UPLOAD IMAGE</Button>
                            <Form.Control type="file" onChange={handleImage} accept="image/*" id="fileinput" style={{ display: "none" }} />
                        </Row>
                    </Col>
                    <Col style={{ marginLeft: "4%", width: "48%" }} sm={5}>
                        <Row className="mb-4">
                            <Form.Label id="inputLabel">Recipe Title</Form.Label>
                            <Form.Control id="inputField" required onChange={(e) => setTitle(e.target.value)} value={title} type="text" style={{ width: "96%", margin: "auto" }} />
                        </Row>
                        <Row className="mb-4">
                            <Col>
                                <Form.Label id="inputLabel">Category</Form.Label>
                                <Form.Select id="inputField" value={category} required onChange={(e) => setCategory(e.target.value)} aria-label="Default select example">
                                    <option value="Breakfast">Breakfast</option>
                                    <option value="Brunch">Brunch</option>
                                    <option value="Lunch">Lunch</option>
                                    <option value="Dinner">Dinner</option>
                                </Form.Select>
                            </Col>
                            <Col>
                                <Form.Label id="inputLabel">Preparation Time</Form.Label>
                                <Form.Control id="inputField" required min="1" max="1440" onChange={(e) => setPreparation(e.target.value)} value={preparation} type="number" />
                            </Col>
                            <Col>
                                <Form.Label id="inputLabel">No. People</Form.Label>
                                <Form.Control id="inputField" required onChange={(e) => setPeople(e.target.value)} value={people} type="number" min="1" max="99" />
                            </Col>
                        </Row>
                        <Row className="mb-4">
                            <Col>
                                <Form.Label id="inputLabel">Short Description</Form.Label>
                                <Form.Control id="inputField"
                                    as="textarea"
                                    rows="4"
                                    value={content}
                                    style={{ resize: "none" }}
                                    onChange={(e) => setContent(e.target.value)}
                                    type="text"
                                    maxLength="230"
                                    required
                                />
                            </Col>
                            <Row style={{ margin: "auto", marginTop: "6%" }} sm={5}>
                                <Button style={{ width: "20%" }} type="submit" id="greenButton" variant="success">SAVE</Button>
                            </Row>
                        </Row>
                    </Col>
                    <Col sm={4} style={{ marginLeft: "1%", width: "30%" }}>
                        <Form.Label id="inputLabel">Recipe</Form.Label>
                        <Form.Control id="inputField"
                            as="textarea"
                            rows="12"
                            value={description}
                            style={{ resize: "none", height: "68%" }}
                            onChange={(e) => setDescription(e.target.value)}
                            type="text"
                            required
                        />
                    </Col>
                </Row>
            </Form >
        </Container >
    )
}