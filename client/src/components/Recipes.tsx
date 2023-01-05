import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
//MUI components
import IconButton from '@mui/material/IconButton';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import {Grid, InputAdornment, OutlinedInput} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import SearchIcon from "@mui/icons-material/Search";
//Components
import DeleteDialog from "./DeleteDialog";
import MenuDialog from "./MenuDialog";
import Navigation from "./Navigation";
import Footer from "./Footer";
import Message from "./Message";

function Recipes() {

    //All the states used in this component
    const [recipes, setRecipes] = useState([]);
    const [message, setMessage] = useState("");

    const [recipeID, setRecipeID] = useState("");
    const [recipeDialog, setRecipeDialog] = useState([])

    const [openMenu, setOpenMenu] = React.useState(false);
    const [openDelete, setOpenDelete] = React.useState(false);

    const [searchInput, setSearchInput] = useState("");
    const [filterRecipes, setFilterRecipes] = useState([])

    //Handles the open of the DeleteDialog component
    const handleClickOpenDelete = (ID: string) => {
        setRecipeID(ID)
        fetchRecipe(ID).catch(() => setMessage("Failed connecting to the server"));
        setOpenDelete(true);
    };

    //Handles the open of the MenuDialog component
    const handleClickOpenMenu = (ID: string) => {
        setRecipeID(ID)
        fetchRecipe(ID).catch(() => setMessage("Failed connecting to the server"));
        setOpenMenu(true);
    };

    //Requests a specific recipe from the server with the ID argument
    async function fetchRecipe(ID: string) {
        const response = await fetch("http://localhost:8080/recipes/" + ID)
        const json = await response.json()
        if (!json.message) setRecipeDialog(json)
    }

    //Requests the server to delete a specific recipe with the ID argument
    async function deleteRecipe(ID: string) {
        if (ID !== "") {
            await fetch("http://localhost:8080/recipes/" + ID, {
                method: "DELETE"
            })
        }
    }

    //Applies a filter in all the recipes, to filter with what is written in the searchInput.
    //All letters are changed to lower case to remove the key-sensitive search.
    function filterRecipe() {
        setFilterRecipes(recipes.filter(recipe => recipe.name.toLowerCase().match(searchInput.toLowerCase())))
    }

    //Requests all the recipes from the server, setting the states needed for the rest of the page.
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

    /**
     * This function it's based in React 'componentDidMount()' that will invoke the functions inside after a component is mounted.
     * In this case, the 'useEffect()' is looking for changes in a specific component 'searchInput' running the arrow function inside every time the component has some changes.
     * */
    useEffect(() => {
        if (searchInput.length > 0) {
            filterRecipe()
        } else {
            setFilterRecipes(recipes)
        }
    }, [searchInput])

    /**
     * This function it's based in React 'componentDidMount()' that will invoke the functions inside after a component is mounted.
     * In this case, the 'useEffect()' only executes the arrow function after the main component mount, only executing one time.
     * */
    useEffect(() => {
        fetchRecipes().catch(() => setMessage("Failed connecting to the server"));
    }, []);


    return (
        <div>
            <Navigation/>

            <Message message={message} handleClose={() => setMessage("")}/>

            {/*Search bar*/}
            {recipes.length > 0 ?
                <div style={{display: "flex", justifyContent: "center", marginTop: 5}}>
                    <OutlinedInput
                        startAdornment={<InputAdornment position="start"><SearchIcon/></InputAdornment>}
                        value={searchInput}
                        onChange={(newValue) => {
                            setSearchInput(newValue.target.value);
                        }}
                    />
                </div>
                : null}


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

            {/*Display all the recipes*/}
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

            <Footer/>
        </div>
    );
}

export default Recipes;