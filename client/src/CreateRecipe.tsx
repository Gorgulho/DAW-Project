import Navigation from './components/Navigation'
import Footer from './components/Footer'
import React from "react";
import './App.css';
import {Button, Card, Container, TextField} from "@mui/material";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CardActions from "@mui/material/CardActions";

function Create() {
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
                                label="Title"
                                variant="outlined" />

                        </div>
                        <div>
                            <TextField
                                style={{width:450}}
                                sx={{m:2}}
                                id="fullWidth"
                                label="Description"
                                multiline
                                maxRows={4}
                            />
                        </div>
                        <div>
                            <TextField
                                sx={{m:2}}
                                id="outlined-textarea"
                                label="Ingredients"
                                placeholder="Write down what ingredients you need"
                                minRows={4}
                                multiline
                            />
                            <TextField
                                sx={{m:2}}
                                id="outlined-textarea"
                                label="Instructions"
                                placeholder="Write down the steps to take"
                                minRows={4}
                                multiline
                            />
                        </div>
                        <Button variant="contained">Submit</Button>
                    </CardContent>
                </Card>
            </Container>
            <Footer/>
        </div>
    );
}
export default Create;