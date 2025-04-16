import React from "react";
import { Card, Modal, Image, Col, Row,Container} from "react-bootstrap";
import { BsClock, BsStar } from "react-icons/bs";
import { GiMeal } from "react-icons/gi";
import { MdDoubleArrow } from "react-icons/md";

import PropTypes from 'prop-types';
import { api } from "../../constants/ApiConstants";


export function ModalWindow(props) {
    const recipe = props.recipe
    function MyVerticallyCenteredModal(props) {
        return (
            <Modal
            keyboard="true"
            id="modal"
                {...props}
                size="xl"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                style={{
                    backdropFilter: "blur(15px)",
                    transition:"opacity .4s ease",
                    paddingBottom:"0%"
                }}
            >
                <Container fluid="true" style={{padding:"2%",paddingBottom:"0",marginBottom:"0"}}>
                <Modal.Header id="modalHeader" closeButton>
                    <Modal.Title >
                        <h2><textarea  disabled id="modalTitle" rows={1} value={recipe.title}></textarea></h2>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body id="modalBody">
                    <Row>
                        <Col xs={5}>
                            <Card id="cardModal" >
                                <Card.Img /><Image id="modalImage" variant="top" src={`${api.root}/${recipe.image}`} />
                                <Card.Body id="modalCardBody">
                                    <Card.Title id="modalCategory">Best Served For<span>{recipe.category.toLowerCase()}</span></Card.Title>
                                    <Card.Text id="modalText">
                                        <textarea disabled rows={6} value={recipe.content}></textarea>
                                    </Card.Text>
                                    <Card.Footer id="modalFooter">
                                        <span > <BsClock id="modalIcons" /> {recipe.preparation} min </span>
                                        <span > <GiMeal id="modalIcons" /> {recipe.people} persons </span>
                                        <span > <BsStar id="modalIcons" /> {recipe.views} </span>
                                    </Card.Footer>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col id="modalDesc" xs={7}>
                            <div>Recipe Details</div>
                            <textarea disabled style={{width:"100%"}} rows={20} value={recipe.description}></textarea>
                        </Col>
                    </Row>
                </Modal.Body>
                </Container>
            </Modal>
        );
    }
    function updateViews() {
        fetch(`${api.root}/recipes/recipe/${recipe._id}`)
            .then(res => res.json())
            .catch(err => {
                console.log(err);
                alert("Ooops something went wrong. Please try again later.");
            });
    }
    const [modalShow, setModalShow] = React.useState(false);
    return (
        <>
            <MdDoubleArrow id="modalButton" onClick={() => { setModalShow(true); updateViews() }} />
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


