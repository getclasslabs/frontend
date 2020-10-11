/* eslint-disable react/prop-types */
import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";

import styles from "assets/jss/material-kit-react/views/landingPageSections/productStyle.js";

const useStyles = makeStyles(styles);

export default function Chat() {
  const classes = useStyles();
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <h2 className={classes.title}>Alunos e Solicitações</h2>
        <div
          style={{
            textAlign: "left",
            marginBottom: 20,
            padding: 5,
          }}
        >
          <p style={{ marginLeft: 10, fontSize: 18 }}>
            <b>Matheus</b> - <i style={{ fontSize: 12 }}>Aprovado</i>
          </p>
          <a href="https://google.com" style={{ marginLeft: 10, fontSize: 16 }}>
            Ver comprovante
          </a>
        </div>
        <div
          style={{
            textAlign: "left",
            marginBottom: 20,
            padding: 5,
          }}
        >
          <p style={{ marginLeft: 10, fontSize: 18 }}>
            <b>André</b> - <i style={{ fontSize: 12 }}>Aprovado</i>
          </p>
          <a href="https://google.com" style={{ marginLeft: 10, fontSize: 16 }}>
            Ver comprovante
          </a>
        </div>
        <div
          style={{
            backgroundColor: "RGB(255, 0, 0, 0.2)",
            textAlign: "left",
            marginBottom: 20,
            padding: 5,
          }}
        >
          <GridContainer alignItems="alignItems">
            <GridItem xs={12} sm={12} md={8}>
              <p style={{ marginLeft: 10, fontSize: 18 }}>
                <b>Lucas</b>
              </p>
              <a
                href="https://google.com"
                style={{ marginLeft: 10, fontSize: 16 }}
              >
                Ver comprovante
              </a>
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
              <Button color="primary" rel="noopener noreferrer">
                Aprovar
              </Button>
            </GridItem>
          </GridContainer>
        </div>
      </GridItem>
    </GridContainer>
  );
}
