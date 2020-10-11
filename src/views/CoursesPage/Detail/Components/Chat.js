/* eslint-disable react/prop-types */
import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import CustomInput from "components/CustomInput/CustomInput.js";

import styles from "assets/jss/material-kit-react/views/landingPageSections/productStyle.js";

const useStyles = makeStyles(styles);

export default function Chat({ isLong }) {
  const classes = useStyles();
  return (
    <GridContainer justify="center">
      <GridItem xs={12} sm={12} md={isLong ? 12 : 8}>
        <h2 className={classes.title}>Mural de Comentários</h2>
        <div
          style={{
            backgroundColor: "RGB(0, 0, 0, 0.1)",
            borderRadius: 4,
            textAlign: "left",
            marginBottom: 20,
            padding: 5,
          }}
        >
          <p style={{ marginLeft: 10, fontSize: 18 }}>
            <b>Professor</b> - <i style={{ fontSize: 12 }}>23/09/2020 19:30</i>
          </p>
          <p style={{ marginLeft: 10, fontSize: 16 }}>
            Alunos hoje atrasarei 5 minutos para a aula. Peço desculpas desde
            já!
          </p>
        </div>
        <div
          style={{
            backgroundColor: "RGB(0, 0, 0, 0.1)",
            borderRadius: 4,
            textAlign: "left",
            marginBottom: 20,
            padding: 5,
          }}
        >
          <p style={{ marginLeft: 10, fontSize: 18 }}>
            <b>André</b> - <i style={{ fontSize: 12 }}>23/09/2020 19:32</i>
          </p>
          <p style={{ marginLeft: 10, fontSize: 16 }}>blz</p>
        </div>
        <div
          style={{
            backgroundColor: "RGB(0, 0, 0, 0.1)",
            borderRadius: 4,
            textAlign: "left",
            marginBottom: 20,
            padding: 5,
          }}
        >
          <p style={{ marginLeft: 10, fontSize: 18 }}>
            <b>Matheus</b> - <i style={{ fontSize: 12 }}>23/09/2020 19:33</i>
          </p>
          <p style={{ marginLeft: 10, fontSize: 16 }}>
            Acha que eu tenho tempo pra atraso???
          </p>
        </div>

        <GridContainer alignItems="alignItems">
          <GridItem xs={12} sm={12} md={isLong ? 8 : 10}>
            <CustomInput
              labelText="Digite seu comentário"
              id="search"
              white
              // value={email}
              // onChange={(event) => {
              //   setEmail(event.target.value);
              // }}
              formControlProps={{
                fullWidth: true,
              }}
              style={{
                paddingLeft: "10px",
              }}
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={2}>
            <Button color="primary" size="lg" rel="noopener noreferrer">
              Publicar
            </Button>
          </GridItem>
        </GridContainer>
      </GridItem>
    </GridContainer>
  );
}
