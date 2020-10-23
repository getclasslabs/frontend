/* eslint-disable react/prop-types */
import React from "react";
import { useHistory } from "react-router-dom";
// @material-ui/core components
import { makeStyles, withStyles } from "@material-ui/core/styles";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";

import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";

import styles from "assets/jss/material-kit-react/views/landingPageSections/teamStyle.js";

const useStyles = makeStyles(styles);

export default function TeamSection({ categories }) {
  const classes = useStyles();
  const history = useHistory();

  const customStyles = () => ({
    root: {
      "&:hover": {
        cursor: "pointer",
        transform: "scale(1.01)",
      },
    },
  });
  const CustomGridListTile = withStyles(customStyles)(GridListTile);

  return (
    <div className={classes.section}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={12}>
          <h2 className={classes.title}>
            Busque por alguma das Categorias principais
          </h2>
          <h5 className={classes.description}>
            Essas são algumas das várias categorias disponíveis em nosso site.
          </h5>
        </GridItem>
      </GridContainer>
      <div style={{ marginTop: "20px" }}>
        <GridContainer>
          <div className={classes.root}>
            <GridList cellHeight={180} className={classes.gridList}>
              {categories.map((category) => (
                <CustomGridListTile
                  key={category.id}
                  onClick={() =>
                    history.push({
                      pathname: "/results",
                      state: { search: category.name },
                    })
                  }
                  style={{
                    padding: "10px",
                  }}
                >
                  <img
                    className="image-grid"
                    src={`http://localhost:3000/category/images/${
                      category.image ? category.image : "default.jpg"
                    }`}
                    alt={category.name}
                  />
                  <GridListTileBar title={category.name} />
                </CustomGridListTile>
              ))}
            </GridList>
          </div>
        </GridContainer>
      </div>
    </div>
  );
}
