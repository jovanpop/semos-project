import React, { useEffect, useState } from "react";
import { Container, Card, Row, Col, Image } from "react-bootstrap";
import { BsClock, GiMeal, BsStar } from "react-icons/all";
import { api } from "../../constants/ApiConstants";
import { ModalWindow } from './Modal';

export function Home() {
    const [NewRecipes, setNewRecipes] = useState([]);
    const [PopularRecipes, setPopularRecipes] = useState([]);
    function getHomePage() {
        fetch(api.root)
            .then(res => res.json())
            .then(data => {
                setPopularRecipes(data.PopularRecipes)
                setNewRecipes(data.NewRecipes)
            })
            .catch(err => alert(err));
    }
    useEffect(() => {
        getHomePage();
    }, [])

    return (
        <Container fluid="true">
            <Row><h2 id="pageTitle" style={{ marginBottom: "4%" }}>Fresh & New</h2></Row>
            <Row style={{ width: "105%" }} xs={1} md={3} className="g-5">
                {NewRecipes.map(recipe => (
                    <Col key={recipe._id}>
                        <Card id="card" >
                            <Card.Img /><Image id="cardImage" variant="top" src={`${api.root}/${recipe.image}`} />
                            <Card.Body id="cardBody">
                                <h6 id="categoryText">{recipe.category.toLowerCase()}</h6>
                                <Card.Title > <textarea id="cardTitle" disabled rows={1} value={recipe.title}></textarea></Card.Title>
                                <Card.Text id="cardText">
                                    <textarea disabled rows={4} id="textarea" value={recipe.content}></textarea>
                                </Card.Text>
                                <Card.Footer id="cardFooter">
                                    <span style={{ fontSize: "13px", marginRight: "2%" }}> <BsClock id="cardIcons" /> {recipe.preparation} min </span>
                                    <span style={{ fontSize: "13px", marginRight: "2%" }}> <GiMeal id="cardIcons" /> {recipe.people} persons </span>
                                    <span style={{ fontSize: "13px", marginRight: "32%" }}> <BsStar id="cardIcons" /> {recipe.views} </span>
                                    <ModalWindow recipe={recipe} />
                                </Card.Footer>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
            <Row><h2 id="pageTitle" style={{ marginBottom: "4%", marginTop: "4%" }}>Most Popular Recipes</h2></Row>
            <Row  style={{ width: "105%"}} xs={2} md={3} className="g-5">
                {PopularRecipes.map(recipe => (
                    <Col key={recipe._id} style={{marginBottom:"1%"}}>
                        <Card id="card" >
                            <Card.Img /><Image id="cardImage" variant="top" src={`${api.root}/${recipe.image}`} />
                            <Card.Body id="cardBody">
                                <h6 id="categoryText">{recipe.category.toLowerCase()}</h6>
                                <Card.Title > <textarea id="cardTitle" disabled rows={1} value={recipe.title}></textarea></Card.Title>
                                <Card.Text id="cardText">
                                    <textarea disabled rows={4} id="textarea" value={recipe.content}></textarea>
                                </Card.Text>
                                <Card.Footer id="cardFooter">
                                    <span style={{ fontSize: "13px", marginRight: "2%" }}> <BsClock id="cardIcons" /> {recipe.preparation} min </span>
                                    <span style={{ fontSize: "13px", marginRight: "2%" }}> <GiMeal id="cardIcons" /> {recipe.people} persons </span>
                                    <span style={{ fontSize: "13px"}}> <BsStar id="cardIcons" /> {recipe.views} </span>
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
