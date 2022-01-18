import React, { useEffect, useState } from "react";
import { Container, Table, Row, Button, Col } from "react-bootstrap";
import { api } from "../../constants/ApiConstants";
import { BsFillPlusCircleFill, Trash } from "react-icons/all"

export function MyRecipes() {
    const [recipes, setRecipes] = useState([]);
    function getRecipes() {
        fetch(`${api.root}/recipes/myrecipes`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then(res => {
                if (res.status === 401) {
                    localStorage.removeItem("token");
                    alert("Token expired");
                    window.location = "/login";
                }
                else {
                    return res.json();
                }
            })
            .then(data => {
                setRecipes(data.recipes)
            })
            .catch(err => console.log(err))
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
                    alert("Token expired");
                    localStorage.removeItem("token");
                    window.location = "/login";
                }
                return res.json();
            })
            .then(data => {
                if (data.err === true) {
                    alert(data.message)
                } else {
                    window.location.reload();
                }
            })
            .catch(err => { if (err) { console.log(err) } })
    }

    return (
        <Container>
            <Row>
                <Col><h2 style={{ color: "green" }}>My Recipes</h2></Col>
                <Col style={{ textAlign: "end" }}><a href="/create"><h2><BsFillPlusCircleFill style={{ color: "orange",fontSize:"115%" }} /></h2></a></Col>
            </Row>
            <Row style={{ marginTop: "3%" }}>
                <Table >
                    <thead>
                        <tr >
                            <th>Recipe Name</th>
                            <th>Category</th>
                            <th>Created On</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody  >
                        {
                            recipes.reverse().map(recipe => {
                                return (
                                    <tr key={recipe._id}>
                                        <td><a href={`/myrecipes/${recipe._id}`}>{recipe.title}</a></td>
                                        <td>{recipe.category}</td>
                                        <td>{recipe.createdAt.slice(0, 10)}</td>
                                        <td><Button type="button" href="#" onClick={() => deleteRecipe(recipe._id)}>asd</Button></td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>
            </Row>
        </Container>
    )
}