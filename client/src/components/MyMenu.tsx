import Navigation from "./Navigation";
import Footer from "./Footer";
import React, {useEffect, useState} from "react";
import '../App.css';
import {CardActions, Card, CardContent, Typography, IconButton, Container, CardHeader} from "@mui/material";
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import Message from "./Message";
import {Link} from "react-router-dom";
function Menu(){

    const [menus, setMenus] = useState([]);
    const [message, setMessage] = useState("");

    async function fetchMenus() {
        const response = await fetch("http://localhost:8080/menus")
        const json = await response.json()
        console.log(json)
        if(json.message) setMessage(json.message)
        else setMenus(json);
    }

    useEffect(() => {
        fetchMenus().catch(() =>setMessage("Can't connect to the server"));
    }, []);

    return(
        <div className="App">
            <Navigation/>

            <Message message={message}/>

            {menus.map(menu =>
                <Container key={menu._id}>
                    <Card sx={{mt: 3}} style={{boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)"}}>
                        <CardHeader
                            title={menu.date}
                        />
                        <CardContent>
                            <Typography variant="body2" color="text.secondary">
                                {menu.meal} : {menu.recipeName}
                            </Typography>
                        </CardContent>
                        <CardActions disableSpacing style={{display: "flex", justifyContent: "flex-end"}}>
                            <Link to={{
                                pathname: '/recipe',
                                search: '?id='+menu.recipeID
                            }}>
                                <IconButton aria-label="delete" size="large" sx={{
                                    "&:hover": {
                                        color: "green",
                                    }
                                }}>
                                    <OpenInNewIcon/>
                                </IconButton>
                            </Link>
                            <IconButton aria-label="done">
                                <TaskAltIcon/> {/*add dialog to delete menu and project done*/}
                            </IconButton>
                        </CardActions>
                    </Card>
                </Container>
            )}
            <Footer/>
        </div>
    );
}
export default Menu;