import React, { useEffect, useState } from "react";
import { Alert, Modal, Spinner } from "react-bootstrap";
import PropTypes from "prop-types";

export function PopAlert(props) {

    const [showAlert, setShowAlert] = useState(false);
    const [AlertMsg, setAlertMsg] = useState("");
    const [error, setError] = useState(false);

    useEffect(() => {
        setAlertMsg(props.alertMsg);
        setShowAlert(props.Alert);
        setError(props.error);
    }, [props.alertMsg, props.Alert, props.error])

    function reload() {
        window.location.reload();
    }
    return (
        <div>
            {showAlert && !error ?
                <Modal style={{ transition: "opacity .5s ease" }} show={showAlert} backdrop={false} onEntered={() => setTimeout(reload, 700)}>
                    <Alert variant="success" id="alert">{AlertMsg}<Spinner animation="grow" id="spinner" /></Alert>
                </Modal>
                : null
            }
            {showAlert && error && AlertMsg !== "Token" && AlertMsg !== "Password" && AlertMsg !== "Email" && AlertMsg !== "Invalid credentials !" ?
                <Modal style={{ transition: "opacity .5s ease" }} show={showAlert} backdrop={true} onHide={reload}>
                    <Alert variant="danger" id="alert" dismissible onClose={reload}>{AlertMsg}</Alert>
                </Modal>
                : null
            }
            {showAlert && error && AlertMsg === "Token" ?
                <Modal style={{ transition: "opacity .5s ease" }} show={showAlert} backdrop={`static`} onEntered={() => setTimeout(reload, 800)}>
                    <Alert variant="info" id="alert" >Token has expired. Redirecting... <Spinner animation="border" id="spinner" /></Alert>
                </Modal> : null
            }
            {showAlert && error && AlertMsg === "Password" ?
                <Modal style={{ transition: "opacity .3s ease" }} show={showAlert} backdrop={false}>
                    <Alert variant="warning" id="alert" >Passwords don't match !</Alert>
                </Modal> : null
            }
            {showAlert && error && AlertMsg === "Email" ?
                <Modal style={{ transition: "opacity .3s ease" }} show={showAlert} backdrop={false}>
                    <Alert variant="warning" id="alert" >This email is already taken !</Alert>
                </Modal> : null
            }
            {showAlert && error && AlertMsg === "Invalid credentials !" ?
                <Modal style={{ transition: "opacity .3s ease" }} show={showAlert} backdrop={false}>
                    <Alert variant="warning" id="alert" >{AlertMsg}</Alert>
                </Modal> : null
            }
        </div>
    )
}

PopAlert.propTypes = {
    Alert: PropTypes.bool.isRequired,
    alertMsg: PropTypes.string.isRequired,
    error: PropTypes.bool.isRequired
}