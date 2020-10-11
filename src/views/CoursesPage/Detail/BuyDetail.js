import React, { useState } from "react";
import { useHistory } from "react-router-dom";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import BackupIcon from "@material-ui/icons/Backup";
// core components
import Header from "components/Header/HeaderLogin.js";
import Footer from "components/Footer/FooterLogin.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import HeaderLinks from "components/Header/HeaderLinksUser.js";
import Parallax from "components/Parallax/Parallax.js";
import CardTeacher from "components/CustomCard/CardTeacher.js";
import Button from "components/CustomButtons/Button.js";
import CustomModal from "components/Modal/CustomModal.js";

import styles from "assets/jss/material-kit-react/views/profilePage.js";

import image1 from "assets/img/background/1.jpg";
import quimicaImage from "assets/img/category/quimica.jpg";

const useStyles = makeStyles(styles);

export default function BuyDetail(props) {
  const classes = useStyles();
  const history = useHistory();
  const { ...rest } = props;

  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(false);

  function openModal(content) {
    setModalContent(content);
    setModalOpen(true);
  }

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
        <div className={classes.container}>
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
            <GridItem xs={12} sm={12} md={12}>
              <h2 className={classes.title}>R$ 50,00</h2>
            </GridItem>
            <GridItem cs={12} sm={12} md={6} style={{ margin: "30px" }}>
              <p style={{ fontSize: 12, fontStyle: "italic" }}>Professor:</p>
              <CardTeacher image={quimicaImage} name="Matheus" />
            </GridItem>
            <GridItem cs={12} sm={12} md={4} style={{ margin: "30px" }}>
              <p style={{ fontSize: 12, fontStyle: "italic" }}>
                obs: Esse curso é pago.
              </p>
              <Button
                color="primary"
                className={classes.navLinkLogout}
                style={{ height: 80, width: "80%" }}
                onClick={() =>
                  openModal(
                    <>
                      <p>
                        Para participar dessa aula faça um depósito de R$ 50,00
                        na conta 00000 agência 0001 banco NuBank para cpf
                        123123123-01 e aguarde a aprovação do pagamento pelo
                        Professor
                      </p>
                      <input
                        accept="image/*"
                        className={classes.input}
                        style={{ display: "none" }}
                        id="comprovante"
                        type="file"
                      />
                      <label htmlFor="comprovante">
                        <Button
                          color=""
                          component="span"
                          style={{ width: "100%" }}
                          className={classes.navLinkLogout}
                        >
                          <BackupIcon size={20} /> Carregar Comprovante
                        </Button>
                      </label>
                      <Button
                        color="primary"
                        component="span"
                        style={{ width: "100%" }}
                        onClick={() =>
                          history.push({
                            pathname: "/courses/detail/123",
                            state: { type: "student" },
                          })
                        }
                        className={classes.navLinkLogout}
                      >
                        Enviar Solicitação
                      </Button>
                    </>
                  )
                }
              >
                Matricule-se já!
              </Button>
            </GridItem>
            <CustomModal open={modalOpen} setOpen={setModalOpen}>
              {modalContent}
            </CustomModal>
          </GridContainer>
        </div>
      </div>
      <Footer />
    </div>
  );
}
