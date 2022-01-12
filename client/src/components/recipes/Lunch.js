import React, { useEffect, useState } from "react";
import { Container, Card, Row, Col } from "react-bootstrap";
import { Clock, EggFried, Star } from "react-bootstrap-icons";
import { api } from "../../constants/ApiConstants";
import {ModalWindow} from './Modal';

export function Lunch() {
    const [lunch, setLunch] = useState([]);
    function getLunch() {
        fetch(`${api.root}/recipes/Lunch`)
            .then(res => res.json())
            .then(data => {
                setLunch(data.recipes)
            })
            .catch(err => alert(err));
    }
    useEffect(() => {
        getLunch();
    }, []);
    return (
        <Container>
            <Row>
                <Row><h3 style={{ color: "green", marginBottom: "3%" }}>Lunch</h3></Row>
                {lunch.map(recipe => {
                    return (
                        <Col xs={4} style={{ marginBottom: "4%" }} key={recipe._id}>
                            <Card style={{ width: '24rem', borderRadius: "2%" }}>
                                <Card.Img style={{ borderTopLeftRadius: "2%", borderTopRightRadius: "2%" }} variant="top" src="https://media.istockphoto.com/photos/cheesy-pepperoni-pizza-picture-id938742222?k=20&m=938742222&s=612x612&w=0&h=X5AlEERlt4h86X7U7vlGz3bDaDDGQl4C3MuU99u2ZwQ=" />
                                <Card.Body>
                                    <Card.Title>{recipe.title}</Card.Title>
                                    <Card.Text>
                                        {recipe.content}
                                    </Card.Text>
                                    <Clock /> {recipe.preparation}
                                    <EggFried /> {recipe.people}
                                    <Star /> {recipe.views}
                                    <ModalWindow recipe={recipe}/>
                                </Card.Body>
                            </Card>
                        </Col>)
                })}
            </Row>
        </Container>
    )
}