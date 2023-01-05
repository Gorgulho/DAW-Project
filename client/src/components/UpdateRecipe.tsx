import React, {useEffect, useState} from "react";
import { useLocation } from 'react-router-dom';
//MUI components
import {Button, Card, Container, FormControl, TextField} from "@mui/material";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
//Components
import Message from "./Message";
import Navigation from './Navigation'
import Footer from './Footer'

function Update() {
    //Receives the data received from the URL, via the search parameters
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get('id');

    //All the states used in this component
    const [message, setMessage] = useState("");

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [ingredients, setIngredients] = useState("");
    const [instructions, setInstructions] = useState("");

    const [recipe, setRecipe] = useState([]);

    //Request the server to update the recipe with the ID argument. Send the data to update through the request body.
    const updateRecipe = async (ID : string) => {
        try {
            if(name !== "" && description !== "" && ingredients !== "" && instructions !== "") {
                await fetch("http://localhost:8080/recipes/"+ID, {
                    body: JSON.stringify({
                        name, description, ingredients, instructions
                    }),
                    headers: {
                        "Content-type": "application/json"
                    },
                    method: "PUT"
                }).then(() => {
                    setMessage("Recipe updated successfully")
                })
            } else {
                setMessage("Fill all fields first")
            }
        } catch (error) {
            setMessage("Failed connecting to the server")
        }
    }

    //Requests a specific recipe from the server with the ID argument
    async function fetchRecipe(ID: string) {
        const response = await fetch("http://localhost:8080/recipes/" + ID)
        const json = await response.json()
        if (!json.message) setRecipe(json)
    }

    /**
     * This function it's based in React 'componentDidMount()' that will invoke the functions inside after a component is mounted.
     * In this case, the 'useEffect()' only executes the arrow function after the main component mount, only executing one time.
     * */
    useEffect(() => {
        fetchRecipe(id).catch(() => setMessage("Failed connecting to the server"))
    }, []);

    useEffect(() => {
        if(recipe.length > 0) {
            setName(recipe[0].name)
            setIngredients(recipe[0].ingredients)
            setDescription(recipe[0].description)
            setInstructions(recipe[0].instructions)
        }
    }, [recipe])

    return (
        <div>
            <Navigation/>

            <Message message={message} handleClose={() => setMessage("")}/>


            <Container component="form" style={{maxWidth: 600}}>
                <Card sx={{m: 2}} style={{boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)"}}>
                    <CardHeader sx={{textAlign:"center"}}
                        title="Write your alterations"
                    />
                    <CardContent>
                        <FormControl>
                            <div>
                                <TextField
                                    style={{width: 450}}
                                    sx={{m: 2}}
                                    id="fullWidth"
                                    value={name}
                                    onChange={(newValue) => {
                                        setName(newValue.target.value);
                                        console.log(name)
                                    }}
                                    required
                                    label="Title"
                                    variant="outlined"/>

                            </div>
                            <div>
                                <TextField
                                    style={{width: 450}}
                                    sx={{m: 2}}
                                    id="fullWidth"
                                    value={description}
                                    onChange={(newValue) => {
                                        setDescription(newValue.target.value);
                                        console.log(description)
                                    }}
                                    required
                                    label="Description"
                                    multiline
                                    maxRows={4}
                                />
                            </div>
                            <div>
                                <TextField
                                    sx={{m: 2}}
                                    id="outlined-textarea"
                                    value={ingredients}
                                    onChange={(newValue) => {
                                        setIngredients(newValue.target.value);
                                        console.log(ingredients)
                                    }}
                                    required
                                    label="Ingredients"
                                    placeholder="Write down what ingredients you need"
                                    minRows={4}
                                    multiline
                                />
                                <TextField
                                    sx={{m: 2}}
                                    id="outlined-textarea"
                                    value={instructions}
                                    onChange={(newValue) => {
                                        setInstructions(newValue.target.value);
                                        console.log(instructions)
                                    }}
                                    required
                                    label="Instructions"
                                    placeholder="Write down the steps to take"
                                    minRows={4}
                                    multiline
                                />
                            </div>
                            <Button variant="contained" onClick={() => updateRecipe(id)}>Submit</Button>
                        </FormControl>
                    </CardContent>
                </Card>
            </Container>
            <Footer/>
        </div>
    )
}

export default Update;