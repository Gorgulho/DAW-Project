import React, {useEffect, useState} from 'react';
import {styled} from '@mui/material/styles';
import IconButton, {IconButtonProps} from '@mui/material/IconButton';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import {Container, Grid} from "@mui/material";


interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
    const {expand, ...other} = props;
    return <IconButton {...other} />;
})(({theme, expand}) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

function Recipes() {
    const [expanded, setExpanded] = useState(false);


    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const [recipes, setRecipes] = useState([]);
    const [message, setMessage] = useState("");

    async function fetchData() {
        const response = await fetch("http://localhost:8080/recipes")
        const json = await response.json()
        console.log(json)
        if(json.message) setMessage(json.message)
        else setRecipes(json);
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>

            {message ? <Container>
                <Card  sx={{m:3}} style={{boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)"}}>
                    <CardContent>
                        <Typography variant="h5">
                            {message}
                        </Typography>
                    </CardContent>
                </Card>
            </Container> : null}


            <Grid container spacing={6}>
                {recipes.map(recipe =>
                    <Grid item xs="auto" key={recipe._id}>
                        <Card sx={{maxWidth: 345, m: 5}}>
                            <CardHeader
                                action={
                                    <IconButton aria-label="settings">
                                        <MoreVertIcon/>
                                    </IconButton>
                                }
                                title={recipe.name}
                            />
                            <CardContent>
                                <Typography variant="body2" color="text.secondary">
                                    {recipe.description}
                                </Typography>
                            </CardContent>
                            <CardActions disableSpacing>
                                <IconButton aria-label="add to favorites">
                                    <FavoriteIcon/>
                                </IconButton>
                                <IconButton aria-label="share">
                                    <ShareIcon/>
                                </IconButton>
                                <ExpandMore
                                    expand={expanded}
                                    onClick={handleExpandClick}
                                    aria-expanded={expanded}
                                    aria-label="show more"
                                >
                                    <ExpandMoreIcon/>
                                </ExpandMore>
                            </CardActions>
                            <Collapse in={expanded} timeout="auto" unmountOnExit>
                                <CardContent>
                                    <Typography paragraph>Ingredients:</Typography>
                                    <Typography paragraph>
                                        {recipe.ingredients}
                                    </Typography>
                                    <Typography paragraph>Method:</Typography>
                                    <Typography>
                                        {recipe.instructions}
                                    </Typography>
                                </CardContent>
                            </Collapse>
                        </Card>
                    </Grid>
                )}


                {/**/}
            </Grid>
        </div>
    );
}

export default Recipes;