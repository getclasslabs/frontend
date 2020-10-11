import React from "react";
import { useHistory } from "react-router-dom";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Header from "components/Header/HeaderLogin.js";
import Footer from "components/Footer/FooterLogin.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import HeaderLinks from "components/Header/HeaderLinksUser.js";
import Parallax from "components/Parallax/Parallax.js";
import CardTeacher from "components/CustomCard/CardTeacher.js";
import Button from "components/CustomButtons/Button.js";

import styles from "assets/jss/material-kit-react/views/profilePage.js";

import image1 from "assets/img/background/1.jpg";
import quimicaImage from "assets/img/category/quimica.jpg";

import Chat from "./Components/Chat.js";
import Students from "./Components/Students.js";

const useStyles = makeStyles(styles);

export default function TeacherDetail(props) {
  const classes = useStyles();
  const history = useHistory();
  const { ...rest } = props;

  return (
    <div>
      <Header
        color="transparent"
        brand="Material Kit React"
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{
          height: 200,
          color: "white",
        }}
        {...rest}
      />
      <Parallax small filter image={image1} />
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container} style={{ paddingBottom: 30 }}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
              <h2 className={classes.title}>Curso de Violão</h2>
            </GridItem>
            <GridItem xs={12} sm={12} md={12}>
              <h5 style={{ fontSize: 20 }}>
                O ... surgiu com a intenção de ajudar aqueles que tem uma enorme
                vontade de aprender à encontrar alguém com a mesma vontade para
                ensinar! Nossa intenção é conectar pessoas com intuito de
                compartilhar conhecimento sobre qualquer assunto, desde aulas
                acadêmicas até aulas de música, esportes e qualquer coisa que
                você tiver interesse.
              </h5>
            </GridItem>
            <GridItem xs={12} sm={12} md={12}>
              <p style={{ fontSize: 16, fontStyle: "italic" }}>
                Aulas de terça e quinta das 19hrs às 21 horas.
              </p>
            </GridItem>
            <GridItem cs={12} sm={12} md={6} style={{ margin: "30px" }}>
              <p style={{ fontSize: 12, fontStyle: "italic" }}>Professor:</p>
              <CardTeacher image={quimicaImage} name="Matheus" />
            </GridItem>
            <GridItem cs={12} sm={12} md={4} style={{ margin: "30px" }}>
              <p style={{ fontSize: 12, fontStyle: "italic" }}>
                Sua aula fica disponível aqui:
              </p>
              <Button
                color="primary"
                className={classes.navLinkLogout}
                style={{ height: 80, width: "80%" }}
                onClick={() =>
                  history.push({
                    pathname: "/courses/view",
                    state: { id: 123 },
                  })
                }
              >
                Acessar aula
              </Button>
            </GridItem>
            <GridItem cs={12} sm={12} md={6}>
              <Chat isLong />
            </GridItem>
            <GridItem cs={12} sm={12} md={6}>
              <Students />
            </GridItem>
          </GridContainer>
        </div>
      </div>
      <Footer />
    </div>
  );
}
