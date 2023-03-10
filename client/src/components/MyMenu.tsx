import {Link} from "react-router-dom";
import React, {useEffect, useState} from "react";
//MUI components
import {CardActions, Card, CardContent, Typography, IconButton, Container, CardHeader} from "@mui/material";
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
//Components
import Message from "./Message";
import DeleteDialogMenu from "./DeleteDialogMenu";
import Navigation from "./Navigation";
import Footer from "./Footer";

function Menu() {
    const [menu, setMenu] = useState([]);
    const [menus, setMenus] = useState([]);
    const [message, setMessage] = useState("");

    const [openDelete, setOpenDelete] = React.useState(false);
    const [menuID, setMenuID] = useState("");

    //Requests a specific menu from the server with the ID argument
    async function fetchMenu(ID: string) {
        console.log(ID)
        const response = await fetch("http://localhost:8080/menus/" + ID)
        const json = await response.json()
        if (!json.message) {
            setMenu(json)
            console.log(json)
        }
    }

    //Requests the server to delete a specific menu with the ID argument
    async function deleteMenu(ID: string) {
        if (ID !== "") {
            await fetch("http://localhost:8080/menus/" + ID, {
                method: "DELETE"
            })
        }
    }

    //Handles the open of the DeleteDialogMenu component
    const handleClickOpenDelete = (ID: string) => {
        setMenuID(ID)
        fetchMenu(ID).catch(() => setMessage("Failed connecting to the server"));
        setOpenDelete(true);
    };

    //Requests all the menus from the server, setting the states needed for the rest of the page.
    async function fetchMenus() {
        const response = await fetch("http://localhost:8080/menus")
        const json = await response.json()
        if (json.message) {
            setMessage(json.message)
            setMenus([])
        }
        else setMenus(json);
    }

    /**
     * This function it's based in React 'componentDidMount()' that will invoke the functions inside after a component is mounted.
     * In this case, the 'useEffect()' only executes the arrow function after the main component mount, only executing one time.
     * */
    useEffect(() => {
        fetchMenus().catch(() => setMessage("Can't connect to the server"));
    }, []);

    return (
        <div>
            <Navigation/>

            <Message message={message} handleClose={() => setMessage("")}/>

            <DeleteDialogMenu
                open={openDelete}
                menu={menu}
                handleClose={() => {
                    setOpenDelete(false)
                }} handleDelete={() => {
                setOpenDelete(false)
                deleteMenu(menuID).then(() => {
                    fetchMenus().catch(() => setMessage("Failed connecting to the server"))
                    setMessage("Menu was concluded successfully")
                }).catch(() => setMessage("Failed connecting to the server"))
            }}
            />

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
                                search: '?id=' + menu.recipeID
                            }}>
                                <IconButton aria-label="delete" size="large" sx={{
                                    "&:hover": {
                                        color: "green",
                                    }
                                }}>
                                    <OpenInNewIcon/>
                                </IconButton>
                            </Link>
                            <IconButton aria-label="done" sx={{
                                "&:hover": {
                                    color: "green",
                                }
                            }} onClick={() => handleClickOpenDelete(menu._id)}>
                                <TaskAltIcon/>
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