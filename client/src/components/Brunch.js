import React, { useEffect, useState } from "react";
import { Container, Card, Button, Row, Col } from "react-bootstrap";
import { Clock, EggFried, ChevronDoubleRight, Star } from "react-bootstrap-icons";
import { api } from "../constants/ApiConstants";

export function Brunch() {
    const [Brunch, setBrunch] = useState([]);
    function getBrunch() {
        fetch(`${api.root}/recipes/Brunch`)
            .then(res => res.json())
            .then(data => {
                setBrunch(data.recipes)
            })
            .catch(err => alert(err));
    }
    useEffect(() => {
        getBrunch();
    }, []);
    return (
        <Container>
            <Row>
                <Row><h3 style={{ color: "green", marginBottom: "3%" }}>Brunch</h3></Row>
                {Brunch.map(recipe => {
                    return (
                        <Col xs={4} key={recipe._id} style={{ marginBottom: "4%" }} >
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
                                    <Button href={`${api.root}/recipes/${recipe._id}`} style={{ position: "absolute", right: "2%", bottom: "2%" }} variant="success"><ChevronDoubleRight /></Button>
                                </Card.Body>
                            </Card>
                        </Col>)
                })}
            </Row>
        </Container>
    )
}