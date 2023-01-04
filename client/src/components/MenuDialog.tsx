import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import {DialogContentText, FormControl, InputLabel, MenuItem, Select, useMediaQuery, useTheme} from "@mui/material";
import Box from "@mui/material/Box";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {MobileDatePicker} from "@mui/x-date-pickers/MobileDatePicker";
import dayjs, {Dayjs} from "dayjs";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import React, {useEffect, useState} from "react";

export default function MenuDialog(props){

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const [recipe, setRecipe] = useState([])

    const [meal, setMeal] = useState("");
    const date = new Date();

    const [data, setData] = React.useState<Dayjs | null>(
        dayjs(date),
    );

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
                    setData(dayjs(date))
                    setMeal("")
                    props.handleAdd()
                })
            } else {

            }

        } catch (error) {
            alert("Failed connecting to the server")
        }
    }

    async function fetchRecipe(ID: string) {
        const response = await fetch("http://localhost:8080/recipes/" + ID);
        const json = await response.json();
        if (!json.message) setRecipe(json);
    }

    useEffect(() => {
        fetchRecipe(props.recipeID).catch(() => alert("Failed connecting"));
    }, [props.open]);

    return (
        <Dialog
            fullScreen={fullScreen}
            open={props.open}
            onClose={props.handleClose}
        >

            {recipe.map(rec =>
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
                                <Button onClick={props.handleClose}>Cancel</Button>
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
    )
}