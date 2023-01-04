import React, {useEffect, useState} from 'react';
import IconButton from '@mui/material/IconButton';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import {Container, Grid, InputAdornment, OutlinedInput} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import DeleteDialog from "./DeleteDialog";
import MenuDialog from "./MenuDialog";
import {Link} from "react-router-dom";
import Message from "./Message";
import SearchIcon from "@mui/icons-material/Search";


function Recipes() {

    const [recipes, setRecipes] = useState([]);
    const [message, setMessage] = useState("");

    const [recipeID, setRecipeID] = useState("");
    const [recipeDialog, setRecipeDialog] = useState([])

    const [openMenu, setOpenMenu] = React.useState(false);
    const [openDelete, setOpenDelete] = React.useState(false);

    const [searchInput, setSearchInput] = useState("");
    const [filterRecipes, setFilterRecipes] = useState([])

    const handleClickOpenDelete = (ID: string) => {
        setRecipeID(ID)
        fetchRecipe(ID).catch(() => setMessage("Failed connecting to the server"));
        setOpenDelete(true);
    };

    const handleClickOpenMenu = (ID: string) => {
        setRecipeID(ID)
        fetchRecipe(ID).catch(() => setMessage("Failed connecting to the server"));
        setOpenMenu(true);
    };

    async function fetchRecipe(ID: string) {
        const response = await fetch("http://localhost:8080/recipes/" + ID)
        const json = await response.json()
        if (!json.message) setRecipeDialog(json)
    }

    async function deleteRecipe(ID: string) {
        if (ID !== "") {
            await fetch("http://localhost:8080/recipes/" + ID, {
                method: "DELETE"
            })
        }
    }

    function filterRecipe() {
        setFilterRecipes(recipes.filter(recipe => recipe.name.toLowerCase().match(searchInput.toLowerCase())))
    }

    async function fetchRecipes() {
        const response = await fetch("http://localhost:8080/recipes")
        const json = await response.json()
        console.log(json)
        if (json.message) {
            setMessage(json.message)
            setRecipes([])
            setFilterRecipes([])
        } else {
            setRecipes(json);
            setFilterRecipes(json)
        }
    }

    useEffect(() => {
        if (searchInput.length > 0) {
            filterRecipe()
        } else {
            setFilterRecipes(recipes)
        }
    }, [searchInput])

    useEffect(() => {
        fetchRecipes().catch(() => setMessage("Failed connecting to the server"));
    }, []);


    return (
        <div>
            <Message message={message} handleClose={() => setMessage("")}/>

            <Container>
                <Card sx={{m: 3}} style={{boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)"}}>
                    <CardContent>
                        <OutlinedInput
                            startAdornment={<InputAdornment position="start"><SearchIcon/></InputAdornment>}
                            value={searchInput}
                            onChange={(newValue) => {
                                setSearchInput(newValue.target.value);
                            }}
                        />
                    </CardContent>
                </Card>
            </Container>

            <DeleteDialog
                open={openDelete}
                recipe={recipeDialog}
                handleClose={() => {
                    setOpenDelete(false)
                }} handleDelete={() => {
                setOpenDelete(false)
                deleteRecipe(recipeID).then(() => {
                    fetchRecipes().then((response) => console.log(response));
                    setMessage("Recipe was deleted successfully")
                }).catch(() => setMessage("Failed connecting to the server"))
            }}
            />

            <MenuDialog
                open={openMenu}
                recipe={recipeDialog}
                handleClose={() => {
                    setOpenMenu(false)
                }} handleMessageAdd={() => {
                    setMessage("Menu added successfully!")
                }}
            />


            <Grid container spacing={6}>
                {filterRecipes.map(recipe =>
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
                                    search: '?id=' + recipe._id
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
                                    search: '?id=' + recipe._id
                                }}>
                                    <Button variant="text">Update</Button>
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

            </Grid>
        </div>
    );
}

export default Recipes;