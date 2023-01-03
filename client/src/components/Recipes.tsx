import React, {useEffect, useState} from 'react';
import IconButton from '@mui/material/IconButton';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import {Container, Grid} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import DeleteDialog from "./DeleteDialog";
import MenuDialog from "./MenuDialog";
import {Link} from "react-router-dom";

function Recipes() {

    const [recipes, setRecipes] = useState([]);
    const [message, setMessage] = useState("");

    const [recipeID, setRecipeID] = useState("");

    const [openMenu, setOpenMenu] = React.useState(false);
    const [openDelete, setOpenDelete] = React.useState(false);

    const handleClickOpenDelete = (ID: string) => {
        setRecipeID(ID)
        setOpenDelete(true);
    };

    const handleClickOpenMenu = (ID: string) => {
        setRecipeID(ID)
        setOpenMenu(true);
    };

    async function deleteRecipe(ID: string) {
        if (ID !== "") {
            await fetch("http://localhost:8080/recipes/" + ID, {
                method: "DELETE"
            })
        }
    }

    async function fetchRecipes() {
        const response = await fetch("http://localhost:8080/recipes")
        const json = await response.json()
        console.log(json)
        if (json.message) {
            setMessage(json.message)
            setRecipes([])
        } else setRecipes(json);
    }

    useEffect(() => {
        fetchRecipes().then((response) => console.log(response)).catch(() =>setMessage("Can't connect to the server"));
    }, []);


    return (
        <div>

            {message ? <Container>
                <Card sx={{m: 3}} style={{boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)"}}>
                    <CardContent>
                        <Typography variant="h5">
                            {message}
                        </Typography>
                    </CardContent>
                </Card>
            </Container> : null}

            <DeleteDialog
                open={openDelete}
                recipeID={recipeID}
                handleClose={() => {
                    setOpenDelete(false)
                }} handleDelete={() => {
                setOpenDelete(false)
                deleteRecipe(recipeID).then(() => {
                    fetchRecipes().then((response) => console.log(response));
                    setMessage("Recipe was deleted successfully")
                })
            }}
            />

            <MenuDialog
                open={openMenu}
                recipeID={recipeID}
                handleClose={() => {
                    setOpenMenu(false)
                }} handleAdd={() => {
                    setOpenMenu(false)
                    setMessage("Menu added successfully!")
                }}
            />


            <Grid container spacing={6}>
                {recipes.map(recipe =>
                    <Grid item xs="auto" key={recipe._id}>
                        <Card sx={{maxWidth: 345, m: 5}}>
                            <CardHeader
                                title={recipe.name}
                            />
                            <CardContent>
                                <Typography variant="body2" color="text.secondary">
                                    {recipe.description}
                                </Typography>
                            </CardContent>
                            <CardActions disableSpacing>
                                <Button variant="contained" endIcon={<AddIcon/>}
                                        onClick={() => handleClickOpenMenu(recipe._id)}>
                                    Add to Menu
                                </Button>

                                <Link to={{
                                    pathname: '/recipe',
                                    search: '?id='+recipe._id
                                }}>
                                    <IconButton aria-label="delete" size="large" sx={{
                                        "&:hover": {
                                            color: "green",
                                        }
                                    }}>
                                        <OpenInNewIcon/>
                                    </IconButton>
                                </Link>

                                <Link style={{textDecoration: 'none'}} to={{
                                    pathname: '/update',
                                    search: '?id='+recipe._id
                                }}>
                                    <Button variant="text" >Update</Button>
                                </Link>
                                <IconButton aria-label="delete" size="large" sx={{
                                    "&:hover": {
                                        color: "red",
                                    }
                                }}
                                            onClick={() => handleClickOpenDelete(recipe._id)}>
                                    <DeleteIcon/>
                                </IconButton>
                            </CardActions>
                        </Card>
                    </Grid>
                )}


                {/**/}
            </Grid>
        </div>
    );
}

export default Recipes;