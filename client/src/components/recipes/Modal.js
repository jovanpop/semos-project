import React from "react";
import { Card, Button, Modal } from "react-bootstrap";
import { Clock, EggFried, ChevronDoubleRight, Star } from "react-bootstrap-icons";
import PropTypes from 'prop-types';
import { api } from "../../constants/ApiConstants";

export function ModalWindow(props) {
    const recipe = props.recipe
    function MyVerticallyCenteredModal(props) {
        return (
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                style={{
                    backdropFilter: "blur(5px)"
                }}
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {recipe.title}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Card style={{ width: '24rem', borderRadius: "2%" }}>
                        <Card.Img style={{ borderTopLeftRadius: "2%", borderTopRightRadius: "2%" }} variant="top" src="https://media.istockphoto.com/photos/cheesy-pepperoni-pizza-picture-id938742222?k=20&m=938742222&s=612x612&w=0&h=X5AlEERlt4h86X7U7vlGz3bDaDDGQl4C3MuU99u2ZwQ=" />
                        <Card.Body >
                            <Card.Title>Best Served For <span>{recipe.category}</span></Card.Title>
                            <Card.Text>
                                {recipe.content}
                            </Card.Text>
                            <Clock /> <span>{recipe.preparation}</span>
                            <EggFried /> <span>{recipe.people}</span>
                            <Star /> <span>{recipe.views}</span>
                        </Card.Body>
                    </Card>
                </Modal.Body>
            </Modal>
        );
    }
    function updateViews() {
        fetch(`${api.root}/recipes/recipe/${recipe._id}`)
            .then(res => res.json())
            .catch(err => alert(err))
    }
    const [modalShow, setModalShow] = React.useState(false);
    return (
        <>
            <Button style={{ position: "absolute", right: "2%", bottom: "2%" }} variant="success" onClick={() => { setModalShow(true); updateViews() }}>
                <ChevronDoubleRight />
            </Button>

            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </>
    );
}

ModalWindow.propTypes = {
    recipe: PropTypes.object.isRequired
}


