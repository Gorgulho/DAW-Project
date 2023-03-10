import React, {useState} from "react";
//MUI components
import {Button, Card, Container, FormControl, TextField} from "@mui/material";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
//Components
import Message from "./Message";
import Navigation from './Navigation'
import Footer from './Footer'
function Create() {

    const [message, setMessage] = useState("");

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [ingredients, setIngredients] = useState("");
    const [instructions, setInstructions] = useState("");

    /**
     * Request the server to add a recipe. Send the data to create the recipe through the request body.
     * After sending the request and the server responded with a positive answer, clear all the states from the form, so the user can create another recipe immediately.
     */
    const addRecipe = async () => {
        try {
            if(name !== "" && description !== "" && ingredients !== "" && instructions !== "") {
                await fetch("http://localhost:8080/recipes", {
                    body: JSON.stringify({
                        name, description, ingredients, instructions
                    }),
                    headers: {
                        "Content-type": "application/json"
                    },
                    method: "POST"
                }).then(() => {
                    setMessage("Recipe " + name + " added successfully")
                    setName("");
                    setInstructions("");
                    setIngredients("");
                    setDescription("");
                })
            } else {
                setMessage("Fill all fields first")
            }
        } catch (error) {
            setMessage("Failed connecting to the server")
        }
    }

    return (
        <div>
            <Navigation/>

            <Message message={message} handleClose={() => setMessage("")}/>

            <Container component="form" style={{maxWidth: 600}}>
                <Card sx={{m: 2}} style={{boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)"}}>
                    <CardHeader sx={{textAlign:"center"}}
                        title="Write your recipe here"
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
                                    }}
                                    required
                                    label="Instructions"
                                    placeholder="Write down the steps to take"
                                    minRows={4}
                                    multiline
                                />
                            </div>
                            <Button variant="contained" onClick={addRecipe}>Submit</Button>
                        </FormControl>
                    </CardContent>
                </Card>
            </Container>
            <Footer/>
        </div>
    )
        ;
}

export default Create;