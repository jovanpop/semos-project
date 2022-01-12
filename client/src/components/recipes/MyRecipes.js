import React, { useEffect, useState } from "react";
import { Container,Table,Row} from "react-bootstrap";
import { api } from "../../constants/ApiConstants";
import { PlusCircleFill } from "react-bootstrap-icons"

export function MyRecipes() {
    const [recipes,setRecipes]=useState([]);
    function getRecipes() {
        fetch(`${api.root}/recipes/myrecipes`,{
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then(res => res.json())
            .then(data => {
                setRecipes(data.recipes)
            }
            )
    }
    useEffect(() => {
        getRecipes();
    }, [])
    function deleteRecipe() {
        fetch(`${api.root}/recipes/myrecipes`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then(res => res.json())
            .then(data => alert(data.message))
            .catch(err => alert(err))
    }

    return (
        <Container>
            <Row><h3 style={{ color: "green" }}>My Recipes<a href="/create"><PlusCircleFill style={{color:"orange"}}/></a></h3></Row>
            <Row style={{ marginTop: "3%" }}>
            <Table>
                <thead>
                    <tr>
                        <th>Recipe Name</th>
                        <th>Category</th>
                        <th>Created On</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody >
                    {
                        recipes.map(recipe=>{
                            return(
                            <tr key={recipe._id}>
                                <td><a href={`/myrecipes/${recipe._id}`}>{recipe.title}</a></td>
                                <td>{recipe.category}</td>
                                <td>{recipe.createdAt.slice(0,10)}</td>
                                <td>asd</td>
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