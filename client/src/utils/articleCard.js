import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import {
    Card,
    CardMedia,
    CardActions,
    CardContent,
    IconButton,
    Button,
    Typography
} from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite';

const ArticleCard = ({article}) => {

    return(
    <Card>
        <CardMedia
            style={{height: 0, paddingTop: '56.25%'}}
            image="https://picsum.photos/200"
            title="Some Title"
        />

        <CardContent>
            <Typography variant="h5">
                { article.title }
            </Typography>

            <Typography variant="body" component="p">
                { article.excerpt }
            </Typography>
        </CardContent>

        <CardActions disableSpacing>
            <IconButton> <FavoriteIcon/> </IconButton>

            <Button component={RouterLink} to={`/article/${article._id}`} size="small" color="primary">
                View More
            </Button>
        </CardActions>
    </Card>
    )

}

export default ArticleCard;

