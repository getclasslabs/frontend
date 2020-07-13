import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons
import BookmarksIcon from "@material-ui/icons/Bookmarks";
import VoiceChatIcon from "@material-ui/icons/VoiceChat";
import RateReviewIcon from "@material-ui/icons/RateReview";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import InfoArea from "components/InfoArea/InfoArea.js";

import styles from "assets/jss/material-kit-react/views/landingPageSections/productStyle.js";

const useStyles = makeStyles(styles);

export default function ProductSection() {
  const classes = useStyles();
  return (
    <div className={classes.section}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={8}>
          <h2 className={classes.title}>Vamos Falar Sobre o Produto</h2>
          <h5 className={classes.description}>
            O ... surgiu com a intenção de ajudar aqueles que tem uma enorme
            vontade de aprender à encontrar alguém com a mesma vontade para
            ensinar! Nossa intenção é conectar pessoas com intuito de
            compartilhar conhecimento sobre qualquer assunto, desde aulas
            acadêmicas até aulas de música, esportes e qualquer coisa que você
            tiver interesse.
          </h5>
        </GridItem>
      </GridContainer>
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title="Busque e Agende Aulas"
              description="Busque pelo assunto desejado e encontre por alguém que esteja disposta a te ensinar sobre ele. Após isso é só agendar um horário!"
              icon={BookmarksIcon}
              iconColor="info"
              vertical
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title="Tenha Aulas Sem Sair de Casa"
              description="Disponibilizamos em nossa plataforma uma opção para aulas à distância para facilitar e aumentar mais ainda as possibilidades de aulas!"
              icon={VoiceChatIcon}
              iconColor="info"
              vertical
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title="Avalie e Seja Avaliado"
              description="Avalie o professor ao fim de cada aula, com um breve comentário para que mais pessoas saibam sobre ele, e teste o que foi ensinado com um breve questionário!"
              icon={RateReviewIcon}
              iconColor="info"
              vertical
            />
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}
