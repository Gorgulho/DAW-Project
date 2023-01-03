import Navigation from "./Navigation";
import Footer from "./Footer";
import React, {useEffect, useState} from "react";
import {Card, CardContent, CardHeader, Container, Typography} from "@mui/material";
import {useLocation} from "react-router-dom";

function Recipe(){
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const [id, setId] = useState(queryParams.get('id'));

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [ingredients, setIngredients] = useState("");
    const [instructions, setInstructions] = useState("");

    const [recipe, setRecipe] = useState([]);

    async function fetchRecipe(ID: string) {
        const response = await fetch("http://localhost:8080/recipes/" + ID)
        const json = await response.json()
        if (!json.message) setRecipe(json)
    }

    useEffect(() => {
        fetchRecipe(id)
    }, []);

    useEffect(() => {
        if(recipe.length > 0) {
            setName(recipe[0].name)
            setIngredients(recipe[0].ingredients)
            setDescription(recipe[0].description)
            setInstructions(recipe[0].instructions)
        }
    }, [recipe])

    return(
        <div >
        <Navigation/>
        <Container sx={{mt: 5}}>
            <Card style={{boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)"}}>
                <CardHeader
                    title={name}
                />
                <CardContent>
                    <Typography paragraph sx={{whiteSpace: 'pre-line'}}>
                        {description}
                    </Typography>
                    <Container style={{display: "flex"}}>
                        <Container >
                            <Typography sx={{ fontWeight: 'bold' }}>Ingredients:</Typography>
                            <Typography paragraph sx={{whiteSpace: 'pre-line'}}>
                                {ingredients}
                            </Typography>
                        </Container>

                        <Container>
                            <Typography sx={{ fontWeight: 'bold' }}>Instructions:</Typography>
                            <Typography paragraph sx={{whiteSpace: 'pre-line'}}>
                                {instructions}
                            </Typography>
                        </Container>
                    </Container>

                </CardContent>
            </Card>
        </Container>

        <Footer/>
        </div>
    );
}
export default Recipe;