import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import styles from './styles.module.css';
import features from "../../data/features";

const TITLE = 'Matic Developer';
const DESCRIPTION =
  'Welcome to the Matic Developer Documentation';
export default function ImageCard() {
  return (
    <Card className={styles.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="cards"
          height="140"
          image="../../../img/cards/landing/blockchain"
        //   image="{features.imageUrl}"
          title="cards"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {features.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {features.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        {/* <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button> */}
      </CardActions>
    </Card>
  );
}