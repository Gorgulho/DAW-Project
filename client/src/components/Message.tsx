import {Container} from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import React from "react";

export default function Message(props) {

    return(
        <div>
        {props.message ? <Container>
                <Card sx={{m: 3}} style={{boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)"}}>
                    <CardContent>
                        <Typography variant="h5">
                            {props.message}
                        </Typography>
                    </CardContent>
                </Card>
            </Container> : null}
        </div>
    )
}