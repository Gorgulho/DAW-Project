import React, {useState} from 'react';
import Axios from 'axios';
import logo from './logo.svg';
import './App.css';
import Navigation from './components/Navigation'

function App() {

    let recipes = [];

    const getRecipes = () => {
        Axios.get("http://localhost:8080/recipes").then((response) =>{
            if (!response.data.message) {
                recipes = response.data
            }
            console.log(response.data)
            console.log(recipes)
        })
    }

  return (
    <div className="App">
      <Navigation/>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
          <button
          onClick={getRecipes}
          ></button>


      </header>
    </div>
  );
}

export default App;
