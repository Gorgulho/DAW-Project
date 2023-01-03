import Navigation from './Navigation'
import Footer from './Footer'
import React, {useState} from "react";
import '../App.css';
import {Button, Card, Container, FormControl, TextField} from "@mui/material";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";

function Update() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [ingredients, setIngredients] = useState("");
    const [instructions, setInstructions] = useState("");

    return (
        <div className="App">
            <Navigation/>
            <Container component="form" style={{maxWidth: 600}}>
                <Card sx={{m: 2}} style={{boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)"}}>
                    <CardHeader
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
                            <Button type="submit" variant="contained">Submit</Button>
                        </FormControl>
                    </CardContent>
                </Card>
            </Container>
            <Footer/>
        </div>
    )
        ;
}

export default Update;