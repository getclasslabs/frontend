import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/CustomCard/Card.js";

import styles from "assets/jss/material-kit-react/views/landingPageSections/workStyle.js";

import violaoImage from "assets/img/category/violao.jpg";
import esportesImage from "assets/img/category/esportes.jpg";
import quimicaImage from "assets/img/category/quimica.jpg";

const useStyles = makeStyles(styles);

export default function Courses() {
  const classes = useStyles();
  return (
    <div className={classes.section}>
      <GridContainer justify="center">
        <GridItem cs={12} sm={12} md={12} style={{ marginBottom: "70px" }}>
          <h2 className={classes.title}>Meus Cursos</h2>

          <GridContainer>
            <GridItem cs={12} sm={12} md={4}>
              <Card image={violaoImage} name="Violão" />
            </GridItem>
            <GridItem cs={12} sm={12} md={4}>
              <Card image={esportesImage} name="Esportes" />
            </GridItem>
            <GridItem cs={12} sm={12} md={4}>
              <Card image={quimicaImage} name="Química" />
            </GridItem>
          </GridContainer>
        </GridItem>
      </GridContainer>
    </div>
  );
}
