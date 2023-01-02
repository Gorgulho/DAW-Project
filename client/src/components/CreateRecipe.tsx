import Navigation from './Navigation'
import Footer from './Footer'
import React, {useState} from "react";
import '../App.css';
import {Button, Card, Container, TextField} from "@mui/material";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CardActions from "@mui/material/CardActions";
import {Simulate} from "react-dom/test-utils";
import contextMenu = Simulate.contextMenu;

function Create() {

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [ingredients, setIngredients] = useState("");
    const [instructions, setInstructions] = useState("");

    const addRecipe = async () => {
        try {
            await fetch("http://localhost:8080/recipes", {
                body: JSON.stringify({
                    name, description, ingredients, instructions
                }),
                headers: {
                    "Content-type": "application/json"
                },
                method: "POST"
            })
            //TODO: Add action after server response
        }
        catch (error) {
            console.error(error)
        }
    }

    return (
        <div className="App">
            <Navigation/>
            <Container component="form" style={{maxWidth:600}}>
                <Card sx={{m:2}}>
                    <CardHeader
                        title="Write your recipe here"
                    />
                    <CardContent>
                        <div>
                            <TextField
                                style={{width:450}}
                                sx={{m:2}}
                                id="fullWidth"
                                value={name}
                                onChange={(newValue) => {
                                    setName(newValue.target.value);
                                    console.log(name)
                                }}
                                label="Title"
                                variant="outlined" />

                        </div>
                        <div>
                            <TextField
                                style={{width:450}}
                                sx={{m:2}}
                                id="fullWidth"
                                value={description}
                                onChange={(newValue) => {
                                    setDescription(newValue.target.value);
                                    console.log(description)
                                }}
                                label="Description"
                                multiline
                                maxRows={4}
                            />
                        </div>
                        <div>
                            <TextField
                                sx={{m:2}}
                                id="outlined-textarea"
                                value={ingredients}
                                onChange={(newValue) => {
                                    setIngredients(newValue.target.value);
                                    console.log(ingredients)
                                }}
                                label="Ingredients"
                                placeholder="Write down what ingredients you need"
                                minRows={4}
                                multiline
                            />
                            <TextField
                                sx={{m:2}}
                                id="outlined-textarea"
                                value={instructions}
                                onChange={(newValue) => {
                                    setInstructions(newValue.target.value);
                                    console.log(instructions)
                                }}
                                label="Instructions"
                                placeholder="Write down the steps to take"
                                minRows={4}
                                multiline
                            />
                        </div>
                        <Button variant="contained" onClick={addRecipe}>Submit</Button>
                    </CardContent>
                </Card>
            </Container>
            <Footer/>
        </div>
    );
}
export default Create;