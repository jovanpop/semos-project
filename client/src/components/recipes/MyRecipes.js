import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { api } from "../../constants/ApiConstants";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { FaTrashAlt } from "react-icons/fa";
import { PopAlert } from "../partials/Alert";
import { Loading } from "../partials/Loading";

export function MyRecipes() {
    const [loading, setLoading] = useState(true);
    const [recipes, setRecipes] = useState([]);
    const [Alert, setAlert] = useState(false);
    const [alertMsg, setAlertMsg] = useState("");
    const [error, setError] = useState(false);
    function getRecipes() {
        fetch(`${api.root}/recipes/myrecipes`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then(res => {
                if (res.status === 401) {
                    setError(true);
                    setAlert(true);
                    setAlertMsg("Token");
                    localStorage.removeItem("token");
                } else {
                    return res.json()
                }
            })
            .then(data => {
                if (data){
                if (data.err=== false){
                setLoading(false);
                setRecipes(data.recipes)}
                else{
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
    };

    useEffect(() => {
        getRecipes();
    }, [])

    function deleteRecipe(id) {
        fetch(`${api.root}/recipes/myrecipes/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                'Content-Type': 'application/json'
            }
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
                if (data.err === true) {
                    setError(true);
                    setAlert(true);
                    setAlertMsg(data.message);
                } else {
                    window.location.reload();
                }}
            })
            .catch(err => {
                setError(true);
                setAlert(true);
                setAlertMsg(err);
            })
    }
    
    if (loading) {
        return <Loading />
    }

    return (
        <Container fluid="true">
            <PopAlert Alert={Alert} alertMsg={alertMsg} error={error} />
            <Row >
                <PopAlert Alert={Alert} alertMsg={alertMsg} error={error} />
                <Col><h2 id="pageTitle">My Recipes</h2></Col>
                <Col style={{ textAlign: "end", width: "fit-content" }} sm={1}><a href="/create"><BsFillPlusCircleFill style={{ color: "orange", fontSize: "250%" }} /></a></Col>
            </Row>
            <style>{` @media(max-width: 767px){ #recipesTable{ margin-left: 12px !important;} #tableHead{padding: 0 !important} #tableHead .col:nth-child(3) {margin-left:11% !important;}
             #tableRow{padding: 0 !important} #tableRow .col-1{ padding:0 !important } #deleteButton{ margin:0 !important } #tableRow #tableCol:nth-child(3) {margin-left:11% !important;}}`}</style>
            <Row style={{ marginTop: "4%", marginLeft: "1%", height: "100%" }} id="recipesTable">
                {recipes.length !== 0 ? <Row id="tableHead">
                    <Col xs={3} >Recipe Name</Col>
                    <Col xs={2} style={{ marginLeft: "-3%" }}>Category</Col>
                    <Col>Created On</Col>
                    <Col style={{ textAlign: "end" }}>Delete</Col>
                </Row> : null}
                {
                    recipes.reverse().map(recipe => {
                        return (
                            <Row id="tableRow" key={recipe._id}>
                                <Col xs={3} onClick={() => { window.location = `/myrecipes/${recipe._id}` }} id="tableCol"><textarea disabled rows={1} id="recipeTitle" value={recipe.title}></textarea></Col>
                                <Col xs={2} onClick={() => { window.location = `/myrecipes/${recipe._id}` }} id="tableCol"><h6  id="categoryButton"> {recipe.category.toUpperCase()}</h6></Col>
                                <Col onClick={() => { window.location = `/myrecipes/${recipe._id}` }} id="tableCol">{recipe.createdAt.slice(8, 10)}.{recipe.createdAt.slice(5, 7)}.{recipe.createdAt.slice(0, 4)}</Col>
                                <Col xs={1} style={{ textAlign: "center" }} id="tableCol"><FaTrashAlt id="deleteButton" type="button" onClick={() => deleteRecipe(recipe._id)} /></Col>
                            </Row>
                        )
                    })
                }
            </Row>
        </Container>
    )
}