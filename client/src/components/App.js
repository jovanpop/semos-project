import React, { useEffect,useState } from "react";
import { Route, Routes,Navigate } from "react-router-dom";
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
import { Loading } from "./partials/Loading";
import { api } from "../constants/ApiConstants";
const token=localStorage.getItem("token");

export function App() {
  const [loading, setLoading] = useState(true);

  function checkDbConnection () {
    fetch(api.root)
      .then(setLoading(false))
      .catch(err => {
        setLoading(false);
        alert("Ooops something went wrong. Please try again later.");
        console.log(err);
      })
  }

  useEffect(() => {
    checkDbConnection();
  } , []);

  return (
    <div id="body">
      <Container  style={{minHeight:"750px"}}>
        <Navigation />
        <Routes >
          <Route path="/" element={loading ? <Loading/> : <Home />} />
          <Route path="/breakfast" element={<Breakfast />} />
          <Route path="/brunch" element={<Brunch />} />
          <Route path="/lunch" element={<Lunch />} />
          <Route path="/dinner" element={<Dinner />} />
          <Route path="/create" element={token ? <CreateRecipe/> : <Navigate to="/login"/>} />
          <Route path="/myrecipes" element={token ? <MyRecipes/> : <Navigate to="/login" />} />
          <Route path="/myrecipes/:id" element={token ? <MyRecipe/> : <Navigate to="/login" />} />
          <Route path="/login" element={token ? <Navigate to="/myprofile"/> : <Login />}/>
          <Route path="/register" element={token ? <Navigate to="/myprofile"/> : <Register />} />
          <Route path="/myprofile" element={token ? <MyProfile/> : <Navigate to="/login" />} />
        </Routes>
      </Container>
      <Footer />
    </div>
  );
}