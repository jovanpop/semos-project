import React from "react";
import { Card, Button, Modal } from "react-bootstrap";
import { BsClock, GiMeal, BsStar,HiChevronDoubleRight } from "react-icons/all";
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
                            <Card.Title>Best Served For<span style={{backgroundColor:"green",borderRadius:"20%/50%",padding:"1%",color:"white",opacity:"0.8",paddingLeft:"2%",paddingRight:"2%",paddingBottom:"1.5%"}}>{recipe.category.toLowerCase()}</span></Card.Title>
                            <Card.Text>
                                {recipe.content}
                            </Card.Text>
                            <BsClock /> <span>{recipe.preparation}</span>
                            <GiMeal /> <span>{recipe.people}</span>
                            <BsStar /> <span>{recipe.views}</span>
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
            <Button style={{ position: "absolute", right: "3%", bottom: "3%" }} variant="success" onClick={() => { setModalShow(true); updateViews() }}>
                <HiChevronDoubleRight/>
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


