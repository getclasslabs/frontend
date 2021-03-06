import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";

export default function CustomCard(props) {
  const { image, name, description, maxWidth, onClick } = props;
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
        <CardContent>
          <GridContainer>
            <GridItem xs={12} sm={12} md={4}>
              <img
                src={image}
                style={{
                  height: "100px",
                  width: "100px",
                  borderRadius: "50%",
                }}
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={8}>
              <Typography
                gutterBottom
                variant="h5"
                component="h2"
                style={{ fontSize: 16 }}
              >
                {name}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {description}
              </Typography>
            </GridItem>
          </GridContainer>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

CustomCard.propTypes = {
  image: PropTypes.object,
  name: PropTypes.string,
  description: PropTypes.string,
  onClick: PropTypes.func,
  maxWidth: PropTypes.number,
};
