import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

export default function CustomCard(props) {
  const { image, name, maxWidth, description, category, onClick } = props;
  const useStyles = makeStyles({
    root: {
      maxWidth: maxWidth ?? null,
      alignSelf: "center",
    },
  });
  const classes = useStyles();

  return (
    <Card className={classes.root} onClick={onClick}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="140"
          image={image}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {name}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            style={{ fontWeight: "bold" }}
          >
            {category}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

CustomCard.propTypes = {
  image: PropTypes.object,
  name: PropTypes.string,
  category: PropTypes.string,
  description: PropTypes.string,
  onClick: PropTypes.func,
  maxWidth: PropTypes.number,
};
