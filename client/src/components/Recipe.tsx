import Navigation from "./Navigation";
import Footer from "./Footer";
import React, {useEffect, useState} from "react";
import {Card, CardContent, CardHeader, Container, Typography} from "@mui/material";
import {useLocation} from "react-router-dom";
import Message from "./Message";

function Recipe() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get('id');

    const [message, setMessage] = useState("");

    const [recipe, setRecipe] = useState([]);

    async function fetchRecipe(ID: string) {
        const response = await fetch("http://localhost:8080/recipes/" + ID)
        const json = await response.json()
        if (json.message) setMessage(json.message)
        else setRecipe(json)
    }

    useEffect(() => {
        fetchRecipe(id).catch(() => setMessage("Failed connecting to the server"))
    }, []);

    return (
        <div>
            <Navigation/>

            <Message message={message}/>

            {recipe.map(rec =>
            <Container key={rec._id} sx={{mt: 5}}>
                <Card style={{boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)"}}>
                    <CardHeader
                        title={rec.name}
                    />
                    <CardContent>
                        <Typography paragraph sx={{whiteSpace: 'pre-line'}}>
                            {rec.description}
                        </Typography>
                        <Container style={{display: "flex"}}>
                            <Container>
                                <Typography sx={{fontWeight: 'bold'}}>Ingredients:</Typography>
                                <Typography paragraph sx={{whiteSpace: 'pre-line'}}>
                                    {rec.ingredients}
                                </Typography>
                            </Container>

                            <Container>
                                <Typography sx={{fontWeight: 'bold'}}>Instructions:</Typography>
                                <Typography paragraph sx={{whiteSpace: 'pre-line'}}>
                                    {rec.instructions}
                                </Typography>
                            </Container>
                        </Container>

                    </CardContent>
                </Card>
            </Container>
            )}

            <Footer/>
        </div>
    );
}

export default Recipe;