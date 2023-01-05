import React, {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
//MUI components
import {Card, CardContent, CardHeader, Container, Typography} from "@mui/material";
//Components
import Message from "./Message";
import Navigation from "./Navigation";
import Footer from "./Footer";

function Recipe() {
    //Receives the data received from the URL, via the search parameters
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get('id');

    //All the states used in this component
    const [message, setMessage] = useState("");
    const [recipe, setRecipe] = useState([]);

    //Requests a specific recipe from the server with the ID argument
    async function fetchRecipe(ID: string) {
        const response = await fetch("http://localhost:8080/recipes/" + ID)
        const json = await response.json()
        if (json.message) setMessage(json.message)
        else setRecipe(json)
    }

    /**
     * This function it's based in React 'componentDidMount()' that will invoke the functions inside after a component is mounted.
     * In this case, the 'useEffect()' only executes the arrow function after the main component mount, only executing one time.
     * */
    useEffect(() => {
        fetchRecipe(id).catch(() => setMessage("Failed connecting to the server"))
    }, []);

    return (
        <div>
            <Navigation/>

            <Message message={message} handleClose={() => setMessage("")}/>

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