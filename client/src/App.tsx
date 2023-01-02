import React, {useState} from 'react';
import Axios from 'axios';
import logo from './logo.svg';
import './App.css';
import Navigation from './components/Navigation'
import dayjs, {Dayjs} from 'dayjs';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {MobileDatePicker} from '@mui/x-date-pickers/MobileDatePicker';

function App() {

    let recipes = [];

    const getRecipes = () => {
        Axios.get("http://localhost:8080/recipes").then((response) => {
            if (!response.data.message) {
                recipes = response.data
            }
            console.log(response.data)
            console.log(recipes)
        })
    }


    const date = new Date();

    const [value, setValue] = React.useState<Dayjs | null>(
        dayjs(date),
    );

    const handleChange = (newValue: Dayjs | null) => {
        setValue(newValue);
        console.log(dayjs(value).format('MMMM DD YYYY')) //place this in the input to convert the date
        console.log(value)
    };

    return (
        <div className="App">
            <Navigation/>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <MobileDatePicker
                    label="Date mobile"
                    inputFormat="DD/MM/YYYY"
                    value={value}
                    onChange={(newValue) => {
                        setValue(newValue);
                        console.log(dayjs(value).format('MMMM DD YYYY')) //place this in the input to convert the date
                        console.log(value)
                    }}
                    renderInput={(params) => <TextField {...params} />}
                />
            </LocalizationProvider>

        </div>
    );
}

export default App;
