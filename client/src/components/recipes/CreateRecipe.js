import React, { useState } from "react";
import { Container, Button, Row, Col, Form, Image } from "react-bootstrap";
import { api } from "../../constants/ApiConstants";
import { PopAlert } from "../partials/Alert";
import { IoArrowUndoCircle } from "react-icons/io5";

export function CreateRecipe() {
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [preparation, setPreparation] = useState("");
    const [people, setPeople] = useState("");
    const [content, setContent] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(`${api.root}/images/recipes/recipe.png`);
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
                    setError(true);
                    setAlert(true);
                    setAlertMsg("Token");
                    localStorage.removeItem("token");
                }else{
                return res.json();
            }
            })
            .then(data => {
                if (data){
                if (data.err === false) {
                    setError(false);
                    setAlert(true);
                    setAlertMsg(data.message);
                    setTimeout(() =>{window.location = "/myrecipes"},1000);
                } else {
                    setError(true);
                    setAlert(true);
                    setAlertMsg(data.message);
                }}
            })
            .catch(err => {
                setError(true);
                setAlert(true);
                setAlertMsg(err);
            })
    }
    
    return (
        <Container fluid="true">
            <PopAlert Alert={Alert} alertMsg={alertMsg} error={error} />
            <style>{` @media(max-width: 1199px){ .row .col-sm-1{width: auto !important; } form .row .col-sm-5{margin-left: 3% !important; width: 49% !important;}}
                      @media(max-width: 991px){ form #formRow{flex-direction:column; width:100% !important; margin: 0 !important;} .col-sm-5 .row{flex-direction: column !important;}
                      form .row .col-sm-5{margin-left: 0% !important;margin-top: 1.5rem!important; width: 100% !important;order: 3;} .col-sm-5 .row .col{width: 100% !important; margin-top: 1.5rem!important;} 
                        .mb-4{margin-bottom: 0 !important}
                      form .row .col-sm-4{width: 100% !important; margin-left: 0 !important; order: 2; margin-top: 1.5rem !important;}
                      form .row .col-sm-2{width: 100% !important; order: 1; align-items: center !important; padding: 0;} form .row .col-sm-2 .row{width: 100% !important; margin: 0;}
                      }
             `}</style>
            <Row>
                <Col><h2 style={{marginRight:"-20px"}} id="pageTitle">Create Recipe</h2></Col>
                <Col style={{ textAlign: "end",width:"5%"}} sm={1}><a href="/myrecipes"><IoArrowUndoCircle style={{ color: "orange",fontSize:"310%", marginTop:"-5px"}} /></a></Col>
            </Row>
            <Form onSubmit={createMyRecipe} >
                <Row style={{ marginTop: "7%" }} id="formRow">
                    <Col sm={2}>
                        <Row style={{ height: "34%", width: "130%" }} >
                            <Form.Label id="inputLabel">Recipe Image</Form.Label>
                            <Image src={image} style={{ height: "100%", width: "100%", borderRadius: "7%",objectFit:"cover" }} />
                            <Button  id="uploadButton" onClick={() => document.getElementById("fileinput").click()} style={{ width: "90%", margin: "auto", marginTop: "8%" }} variant="outline-secondary">UPLOAD IMAGE</Button>
                            <Form.Control type="file" onChange={handleImage} accept="image/*" id="fileinput" style={{ display: "none" }} />
                        </Row>
                    </Col>
                    <Col style={{ marginLeft: "4%", width: "48%" }} sm={5}>
                        <Row className="mb-4">
                            <Form.Label id="inputLabel">Recipe Title</Form.Label>
                            <Form.Control required id="inputField"   placeholder="Homemade Pizza" onChange={(e) => setTitle(e.target.value)} value={title} type="text" style={{ width: "96%", margin: "auto" }} />
                        </Row>
                        <Row className="mb-4">
                            <Col>
                                <Form.Label id="inputLabel">Category</Form.Label>
                                <Form.Select required value={category} id="inputField" onChange={(e) => setCategory(e.target.value)} aria-label="Default select example">
                                    <option value="">Select</option>
                                    <option value="Breakfast">Breakfast</option>
                                    <option value="Brunch">Brunch</option>
                                    <option value="Lunch">Lunch</option>
                                    <option value="Dinner">Dinner</option>
                                </Form.Select>
                            </Col>
                            <Col>
                                <Form.Label id="inputLabel">Preparation Time</Form.Label>
                                <Form.Control required id="inputField" placeholder="45" min="1" max="1440" onChange={(e) => setPreparation(e.target.value)} value={preparation} type="number" />
                            </Col>
                            <Col>
                                <Form.Label id="inputLabel">No. People</Form.Label>
                                <Form.Control required id="inputField" placeholder="4" min="1" max="99" onChange={(e) => setPeople(e.target.value)} value={people} type="number" />
                            </Col>
                        </Row>
                        <Row className="mb-4">
                            <Col>
                                <Form.Label id="inputLabel">Short Description</Form.Label>
                                <Form.Control id="inputField"
                                    as="textarea"
                                    rows="4"
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    required
                                    style={{resize: "none"}}
                                    type="text"
                                    maxLength="230"
                                />
                            </Col>
                            <Row style={{ margin: "auto", marginTop: "6%" }}>
                                <Button type="submit" id="greenButton" style={{width:"20%"}}>SAVE</Button>
                            </Row>
                        </Row>
                    </Col>
                    <Col sm={4} style={{ marginLeft: "1%",width:"30%" }}>
                        <Form.Label id="inputLabel">Recipe</Form.Label>
                        <Form.Control id="inputField"
                            as="textarea"
                            rows="12"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                            style={{resize: "none",height:"70%"}}
                            type="text"
                        />
                    </Col>
                </Row>
            </Form >
        </Container >
    )
}