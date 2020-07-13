import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";

import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";

import styles from "assets/jss/material-kit-react/views/landingPageSections/teamStyle.js";

import image1 from "assets/img/category/matematica.jpg";
import image2 from "assets/img/category/programacao.jpg";
import image3 from "assets/img/category/violao.jpg";
import image4 from "assets/img/category/esportes.jpg";
import image5 from "assets/img/category/quimica.jpg";
import image6 from "assets/img/category/foto.jpg";
import image7 from "assets/img/category/linguagens.jpg";
import image8 from "assets/img/category/ioga.jpg";
import image9 from "assets/img/category/danca.jpg";
import image10 from "assets/img/category/academia.jpg";

const tileData = [
  {
    img: image1,
    title: "Matemática",
  },
  {
    img: image2,
    title: "Programação",
  },
  {
    img: image3,
    title: "Violão",
  },
  {
    img: image4,
    title: "Esportes",
  },
  {
    img: image5,
    title: "Química",
  },
  {
    img: image6,
    title: "Fotografia",
  },
  {
    img: image7,
    title: "Linguagens",
  },
  {
    img: image8,
    title: "Ioga",
  },
  {
    img: image9,
    title: "Dança",
  },
  {
    img: image10,
    title: "Academia",
  },
];

const useStyles = makeStyles(styles);

export default function TeamSection() {
  const classes = useStyles();

  return (
    <div className={classes.section}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={8}>
          <h2 className={classes.title}>Encontre Qualquer Tipo de Aula</h2>
          <h5 className={classes.description}>
            Essas são algumas categorias disponíveis em nosso site. Mas além
            delas há muitas outras para você escolher, e caso não encontre o que
            estava buscando é só nos avisar!
          </h5>
        </GridItem>
      </GridContainer>
      <div style={{ marginTop: "20px" }}>
        <GridContainer>
          <div className={classes.root}>
            <GridList cellHeight={180} className={classes.gridList}>
              {tileData.map((tile) => (
                <GridListTile key={tile.img}>
                  <img src={tile.img} alt={tile.title} />
                  <GridListTileBar title={tile.title} />
                </GridListTile>
              ))}
            </GridList>
          </div>
        </GridContainer>
      </div>
    </div>
  );
}
