import React, {useEffect, useState} from 'react';
import IconButton from '@mui/material/IconButton';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { Container, DialogContentText, Grid, Select, FormControl, MenuItem, InputLabel, useMediaQuery, useTheme } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Box from "@mui/material/Box";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {MobileDatePicker} from "@mui/x-date-pickers/MobileDatePicker";
import dayjs, {Dayjs} from "dayjs";
import TextField from "@mui/material/TextField";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';


function Recipes() {

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const [recipes, setRecipes] = useState([]);
    const [message, setMessage] = useState("");
    const [recipeMenu, setRecipeMenu] = useState([]);

    const [meal, setMeal] = useState("");
    const date = new Date();

    const [data, setData] = React.useState<Dayjs | null>(
        dayjs(date),
    );

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = (ID: string) => {
        fetchRecipe(ID).then((response) => console.log(response))
        setOpen(true);
    };

    const handleClose = () => {
        setData(dayjs(date))
        setMeal("")
        setOpen(false);
    };

    async function addMenu(recipeID: string, recipeName: string) {
        try {
            if (meal !== "") {
                let date = dayjs(data).format('MMMM DD, YYYY') //To format the date like January 1, 2023
                await fetch("http://localhost:8080/menus", {
                    body: JSON.stringify({
                        meal, date, recipeName, recipeID
                    }),
                    headers: {
                        "Content-type": "application/json"
                    },
                    method: "POST"
                }).then(() => {
                    setMessage("Menu added successfully!")
                    handleClose()
                })
            } else {
                setMessage("Meal was not chosen, Menu wasn't added!")
            }

        } catch (error) {
            console.error(error)
        }
    }

    async function fetchRecipe(ID: string) {
        const response = await fetch("http://localhost:8080/recipes/" + ID)
        const json = await response.json()
        console.log(json)
        setRecipeMenu(json);
    }

    async function fetchRecipes() {
        const response = await fetch("http://localhost:8080/recipes")
        const json = await response.json()
        console.log(json)
        if (json.message) setMessage(json.message)
        else setRecipes(json);
    }

    useEffect(() => {
        fetchRecipes().then((response) => console.log(response));
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


            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
            >

                {recipeMenu.map(rec =>
                    <DialogContent key={rec._id}>
                        <DialogTitle>Add {rec.name} to a Menu</DialogTitle>
                        <DialogContentText>
                            Choose the meal and the day you want to schedule this recipe
                        </DialogContentText>
                        <Box
                            noValidate
                            component="form"
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                m: 'auto',
                                width: 'fit-content',
                            }}
                        >
                            <FormControl sx={{mt: 2, minWidth: 120}}>
                                <InputLabel htmlFor="meal">Meal</InputLabel>
                                <Select
                                    sx={{mb: 2}}
                                    label="Choose Meal"
                                    value={meal}
                                    required
                                    onChange={(newValue) => {
                                        setMeal(newValue.target.value);
                                    }}
                                    inputProps={{
                                        name: 'meal',
                                        id: 'meal',
                                    }}
                                >
                                    <MenuItem value="Breakfast">Breakfast</MenuItem>
                                    <MenuItem value="Lunch">Lunch</MenuItem>
                                    <MenuItem value="Snack">Snack</MenuItem>
                                    <MenuItem value="Dinner">Dinner</MenuItem>
                                </Select>

                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <MobileDatePicker
                                        label="Pick a Date"
                                        inputFormat="DD/MM/YYYY"
                                        value={data}
                                        onChange={(newValue) => {
                                            setData(newValue);
                                            console.log(dayjs(data).format('MMMM DD YYYY')) //place this in the input to convert the date
                                            console.log(data)
                                        }}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </LocalizationProvider>

                                <DialogActions>
                                    <Button onClick={handleClose}>Cancel</Button>
                                    <Button
                                        onClick={() => addMenu(rec._id, rec.name)}
                                    >
                                        Add
                                    </Button>
                                </DialogActions>
                            </FormControl>
                        </Box>

                    </DialogContent>
                )}
            </Dialog>


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
                                        onClick={() => handleClickOpen(recipe._id)}>
                                    Add to Menu
                                </Button>

                                <IconButton aria-label="delete" size="large" sx={{
                                    "&:hover": {
                                        color: "green",
                                    }
                                }}>
                                    <OpenInNewIcon/>
                                </IconButton>

                                <Button color="secondary">Update</Button>

                                <IconButton aria-label="delete" size="large" sx={{
                                    "&:hover": {
                                        color: "red",
                                    }
                                }}>
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