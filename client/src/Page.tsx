import React, {useState} from 'react';
import Axios from 'axios';
import logo from './logo.svg';
import './App.css';
import Navigation from './components/Navigation'
import Recipes from './components/Recipes'

function Page() {

    let recipess = [];

    const getRecipes = () => {
        Axios.get("http://localhost:8080/recipes").then((response) =>{
            if (!response.data.message) {
                recipess = response.data
            }
            console.log(response.data)
            console.log(recipess)
        })
    }

    return (
        <div className="App">
            <Navigation/>
            <Recipes/>
            {/*<header className="App-header">
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


            </header>*/}
        </div>
    );
}

export default Page;
