import React, { useEffect, useState } from "react";
import { Container, Card, Row, Col } from "react-bootstrap";
import { BsClock, GiMeal, BsStar } from "react-icons/all";
import { api } from "../../constants/ApiConstants";
import {ModalWindow} from './Modal';

export function Breakfast() {
    const [Breakfast, setBreakfast] = useState([]);
    function getBreakfast() {
        fetch(`${api.root}/recipes/Breakfast`)
            .then(res => res.json())
            .then(data => {
                setBreakfast(data.recipes)
            })
            .catch(err => alert(err));
    }
    useEffect(() => {
        getBreakfast();
    }, []);
    return (
        <Container>
            <Row>
                <Row><h3 style={{ color: "green", marginBottom: "3%" }}>Breakfast</h3></Row>
                {Breakfast.map(recipe => {
                    return (
                        <Col xs={4} style={{ marginBottom: "4%" }} key={recipe._id}>
                            <Card style={{ width: '24rem', borderRadius: "2%" }}>
                                <Card.Img style={{ borderTopLeftRadius: "2%", borderTopRightRadius: "2%" }} variant="top" src="https://media.istockphoto.com/photos/cheesy-pepperoni-pizza-picture-id938742222?k=20&m=938742222&s=612x612&w=0&h=X5AlEERlt4h86X7U7vlGz3bDaDDGQl4C3MuU99u2ZwQ=" />
                                <h6 style={{position:"absolute",left:"5%", top:"4%",backgroundColor:"green",borderRadius:"20%/50%",padding:"1%",color:"white",opacity:"0.8",paddingLeft:"2%",paddingRight:"2%",paddingBottom:"1.5%"}}>{recipe.category.toLowerCase()}</h6>
                                <Card.Body>
                                    <Card.Title>{recipe.title}</Card.Title>
                                    <Card.Text>
                                        {recipe.content}
                                    </Card.Text>
                                    <BsClock /> {recipe.preparation}
                                    <GiMeal /> {recipe.people}
                                    <BsStar /> {recipe.views}
                                    <ModalWindow recipe={recipe}/>
                                </Card.Body>
                            </Card>
                        </Col>)
                })}
            </Row>
        </Container>
    )
}