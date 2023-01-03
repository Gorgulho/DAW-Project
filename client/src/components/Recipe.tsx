import Navigation from "./Navigation";
import Footer from "./Footer";
import React from "react";
import {Card, CardContent, CardHeader, Container, Typography} from "@mui/material";

function Recipe(){
    return(
        <div >
        <Navigation/>
        <Container sx={{mt: 5}}>
            <Card style={{boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)"}}>
                <CardHeader
                    title="Papas de Aveia"
                />
                <CardContent>
                    <Typography paragraph sx={{whiteSpace: 'pre-line'}}>
                        Receita super fácil de fazer. Pronta em 5 minutos.
                    </Typography>
                    <Container style={{display: "flex"}}>
                        <Container >
                            <Typography sx={{ fontWeight: 'bold' }}>Ingredients:</Typography>
                            <Typography paragraph sx={{whiteSpace: 'pre-line'}}>
                                200 ml de leite
                                30 g de flocos de aveia
                                10 g de açúcar
                                1 pau de canela
                                raspas de limão (a gosto)
                                mel (a gosto)
                            </Typography>
                        </Container>

                        <Container>
                            <Typography sx={{ fontWeight: 'bold' }}>Instructions:</Typography>
                            <Typography paragraph sx={{whiteSpace: 'pre-line'}}>
                                Num tacho, juntar o leite, a aveia, o açúcar, o pau de canela e as raspas de limão a lume brando.
                                Mexer com uma espátula até obter a consistência desejada. Servir com canela em pó e mel a gosto.
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