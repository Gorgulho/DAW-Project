import React, {useEffect, useState} from 'react';
import SearchIcon from '@mui/icons-material/Search';
import {alpha, InputBase, styled} from "@mui/material";
import Box from "@mui/material/Box";
import {Link} from "react-router-dom";

const Search = styled('div')(({theme}) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({theme}) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({theme}) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

export default function SearchBar() {

    const [searchInput, setSearchInput] = useState("");

    const [Recipes, setRecipes] = useState([])
    const [filterRecipes, setFilterRecipes] = useState([])
    const [message, setMessage] = useState("")

    function filterRecipe() {
        setFilterRecipes(Recipes.filter(recipe => recipe.name.match(searchInput)))
        if(filterRecipes.length === 0) setMessage("No Recipe matches...")
        else setMessage("")
    }

    useEffect(() => {
        if(Recipes.length > 0){
            if (searchInput.length > 0) {
                filterRecipe()
            } else {
                setMessage("No Recipe Matches")
                setFilterRecipes([])
            }
        } else setMessage("No Recipes")
    }, [searchInput])

    async function fetchRecipes() {
        const response = await fetch("http://localhost:8080/recipes")
        const json = await response.json()
        if (json.message) {
            setMessage(json.message)
            setRecipes([])
        } else setRecipes(json);
    }

    useEffect(() => {
        fetchRecipes().catch(() => alert("Failed connecting to the server"));
    }, []);

    setInterval(fetchRecipes, 30000);
    return (
        <div>
            <Search>
                <SearchIconWrapper>
                    <SearchIcon/>
                </SearchIconWrapper>
                <StyledInputBase
                    placeholder="SearchBar…"
                    inputProps={{'aria-label': 'search'}}
                    value={searchInput}
                    onChange={(newValue) => {
                        setSearchInput(newValue.target.value);
                    }}
                />
            </Search>

            {message ?
                <div>
                    {filterRecipes.map(fil =>
                        <Box key={fil._id}>
                            <Link to={{
                                pathname: '/recipe',
                                search: '?id=' + fil._id
                            }}>{fil.name}</Link>
                        </Box>
                    )}
                </div>
                : <Box>{message}</Box>}


        </div>
    )
};
