import React, { useEffect, useState } from "react";
import { Container, Card, Row, Col, Image } from "react-bootstrap";
import { BsClock, BsStar } from "react-icons/bs";
import { GiMeal } from "react-icons/gi";
import { api } from "../../constants/ApiConstants";
import { ModalWindow } from './Modal';
import { Loading } from "../partials/Loading";

export function Dinner() {
    const [loading, setLoading] = useState(true);
    const [Dinner, setDinner] = useState([]);
    function getDinner() {
        fetch(`${api.root}/recipes/Dinner`)
            .then(res => res.json())
            .then(data => {
                setLoading(false);
                setDinner(data.recipes)
            })
            .catch(err => {
                console.log(err);
                alert("Ooops something went wrong. Please try again later.");
            });
    }
    useEffect(() => {
        getDinner();
    }, []);

    if (loading) {
        return <Loading/>
    }

    return (
        <Container fluid="true">
            <Row><h2 id="pageTitle" style={{ marginBottom: "4%" }}>Dinner</h2></Row>
            <Row style={{ width: "105%" }} xs={1} md={3} className="g-5">
                {Dinner.map(recipe => (
                    <Col key={recipe._id} >
                        <Card id="card" >
                            <Card.Img /><Image id="cardImage" variant="top" src={`${api.root}/${recipe.image}`} />
                            <Card.Body id="cardBody">
                                <h6 id="categoryText">{recipe.category.toLowerCase()}</h6>
                                <Card.Title > <textarea id="cardTitle" disabled rows={1} value={recipe.title}></textarea></Card.Title>
                                <Card.Text id="cardText">
                                    <textarea value={recipe.content} disabled rows={4} id="textarea"></textarea>
                                </Card.Text>
                                <Card.Footer id="cardFooter">
                                    <span style={{ fontSize: "13px", marginRight: "2%" }}> <BsClock id="cardIcons" /> {recipe.preparation} min </span>
                                    <span style={{ fontSize: "13px", marginRight: "2%" }}> <GiMeal id="cardIcons" /> {recipe.people} persons </span>
                                    <span style={{ fontSize: "13px" }}> <BsStar id="cardIcons" /> {recipe.views} </span>
                                    <ModalWindow recipe={recipe} />
                                </Card.Footer>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    )
}