import React from "react";
//MUI components
import {CardActions, Container} from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CloseIcon from '@mui/icons-material/Close';
import IconButton from "@mui/material/IconButton";

/**
 * This function receives some stats and functions through props.
 * Every state and function is declared in the component that calls this component.
 * */
export default function Message(props) {

    return(
        <div>
        {props.message ? <Container>
                <Card sx={{m: 3}} style={{boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)"}}>
                    <CardActions disableSpacing style={{display: "flex", justifyContent: "flex-end"}}>
                        <IconButton aria-label="delete" size="large" sx={{
                            "&:hover": {
                                color: "red",
                            }
                        }}
                                    onClick={props.handleClose}>
                            <CloseIcon sx={{ fontSize: "18px" }}/>
                        </IconButton>
                    </CardActions>
                    <CardContent sx={{pt:0, textAlign:"center"}}>
                        <Typography variant="h5">
                            {props.message}
                        </Typography>
                    </CardContent>
                </Card>
            </Container> : null}
        </div>
    )
}