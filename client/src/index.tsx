import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './css/index.css';
import 'normalize.css'
import Create from './components/CreateRecipe'
import Menu from './components/MyMenu'
import Recipe from './components/Recipe'
import Update from './components/UpdateRecipe'
import Recipes from "./components/Recipes";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
/**
 * Creation of all the Routes needed with the help of the react-router-dom.
 * The react-router-dom is a popular library that provides routing functionality for React applications.
 * */
root.render(
  <React.StrictMode>
      <Router>
          <Routes>
              <Route path="/" element={<Recipes />} />
              <Route path="/createRecipe" element={<Create />} />
              <Route path="/myMenu" element={<Menu />} />
              <Route path="/recipe" element={<Recipe />}/>
              <Route path="/update" element={<Update />}/>
          </Routes>
      </Router>
  </React.StrictMode>
);
