import React from "react";
import { Route, Routes } from "react-router-dom";
import { Navigation } from './partials/Nav';
import { Footer } from "./partials/Footer";
import { Home } from './recipes/Home';
import { Breakfast } from "./recipes/Breakfast";
import { Brunch } from "./recipes/Brunch";
import { Lunch } from "./recipes/Lunch";
import { Dinner } from "./recipes/Dinner";
import { MyRecipe } from "./recipes/MyRecipe";
import { CreateRecipe } from "./recipes/CreateRecipe";
import { MyRecipes } from "./recipes/MyRecipes";
import { Login } from "./users/Login";
import { Register } from "./users/Register";
import { MyProfile } from './users/MyProfile';
import { Container } from "react-bootstrap";

function App() {
  return (
    <div style={{backgroundColor:"rgb(240, 240 , 225)"}}>
    <Container >
        <Navigation/>
        <Routes >
          <Route path="/" element={<Home />} />
          <Route path="/breakfast" element={<Breakfast />} />
          <Route path="/brunch" element={<Brunch />} />
          <Route path="/lunch" element={<Lunch />} />
          <Route path="/dinner" element={<Dinner />} />
          <Route path="/create" element={<CreateRecipe/>} />
          <Route path="/myrecipes" element={<MyRecipes />} />
          <Route path="/myrecipes/:id" element={<MyRecipe />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/myprofile" element={<MyProfile />} />
        </Routes>
      </Container>
      <Footer/>
      </div>
  );
}

export default App;
