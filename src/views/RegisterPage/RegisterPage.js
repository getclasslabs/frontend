import React, { useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";

// core components
import Header from "components/Header/HeaderLogin.js";
import HeaderLinks from "components/Header/HeaderLinksRegister.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import CustomInput from "components/CustomInput/CustomInput.js";

import styles from "assets/jss/material-kit-react/views/loginPage.js";

import image1 from "assets/img/background/1.jpg";
import image2 from "assets/img/background/2.jpg";
import image3 from "assets/img/background/3.jpg";
import image4 from "assets/img/background/4.jpg";
import image5 from "assets/img/background/5.jpg";

const pictureArray = [image1, image2, image3, image4, image5];
const randomIndex = Math.floor(Math.random() * pictureArray.length);
const selectedPicture = pictureArray[randomIndex];

const useStyles = makeStyles(styles);

export default function LoginPage(props) {
  const classes = useStyles();
  const { ...rest } = props;

  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  const [gender, setGender] = React.useState("masculino");
  const [register, setRegister] = React.useState("masculino");

  const handleGender = (event) => {
    setGender(event.target.value);
  };

  const handleRegister = (event) => {
    setRegister(event.target.value);
  };

  setTimeout(function () {
    setCardAnimation("");
  }, 700);

  useEffect(() => {
    window.scrollTo(0, 70);
  }, []);

  return (
    <div>
      <Header
        absolute
        color="transparent"
        brand="Material Kit React"
        rightLinks={<HeaderLinks />}
        {...rest}
      />
      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: "url(" + selectedPicture + ")",
          backgroundSize: "cover",
          backgroundPosition: "top center",
        }}
      >
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={6}>
              <Card className={classes[cardAnimaton]}>
                <form className={classes.form}>
                  <CardHeader className={classes.cardHeader}>
                    <h2>Crie sua Conta</h2>
                  </CardHeader>

                  <CardBody>
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={12} lg={12}>
                        <CustomInput
                          labelText="Email"
                          id="email"
                          formControlProps={{
                            fullWidth: true,
                          }}
                          inputProps={{
                            type: "email",
                          }}
                        />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={6} lg={6}>
                        <CustomInput
                          labelText="Senha"
                          id="pass"
                          formControlProps={{
                            fullWidth: true,
                          }}
                          inputProps={{
                            type: "password",
                            autoComplete: "off",
                          }}
                        />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={6} lg={6}>
                        <CustomInput
                          labelText="Confirme a senha"
                          id="pass-confirm"
                          formControlProps={{
                            fullWidth: true,
                          }}
                          inputProps={{
                            type: "password",
                            autoComplete: "off",
                          }}
                        />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={4} lg={4}>
                        <CustomInput
                          labelText="Nome"
                          id="name"
                          formControlProps={{
                            fullWidth: true,
                          }}
                          inputProps={{
                            type: "text",
                          }}
                        />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={4} lg={4}>
                        <CustomInput
                          labelText="Sobrenome"
                          id="second_name"
                          formControlProps={{
                            fullWidth: true,
                          }}
                          inputProps={{
                            type: "text",
                          }}
                        />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={4} lg={4}>
                        <TextField
                          id="date"
                          label="Data de Nascimento"
                          type="date"
                          className={classes.textField}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          style={{ width: "100%", paddingTop: "10px" }}
                        />
                      </GridItem>
                      <GridItem xs={12} style={{ marginBottom: "20px" }}>
                        <FormGroup>
                          <FormLabel
                            component="legend"
                            style={{ paddingTop: "15px", fontSize: "14px" }}
                          >
                            Gênero
                          </FormLabel>
                          <RadioGroup
                            row
                            aria-label="gender"
                            name="gender"
                            value={gender}
                            onChange={handleGender}
                            style={{
                              paddingLeft: "20px",
                              justifyContent: "center",
                            }}
                          >
                            <FormControlLabel
                              value="masculino"
                              control={<Radio color="primary" />}
                              label="Masculino"
                              style={{ fontSize: "14px" }}
                            />
                            <FormControlLabel
                              value="feminino"
                              control={<Radio color="primary" />}
                              label="Feminino"
                              style={{ fontSize: "14px" }}
                            />
                            <FormControlLabel
                              value="outro"
                              control={<Radio color="primary" />}
                              label="Outro"
                              style={{ fontSize: "14px" }}
                            />
                          </RadioGroup>
                        </FormGroup>
                      </GridItem>
                      <GridItem xs={12}>
                        <FormGroup>
                          <FormLabel
                            component="legend"
                            style={{ paddingTop: "15px", fontSize: "14px" }}
                          >
                            Você está se registrando como...
                          </FormLabel>
                          <RadioGroup
                            row
                            aria-label="register"
                            name="register"
                            value={register}
                            onChange={handleRegister}
                            style={{
                              paddingLeft: "20px",
                              justifyContent: "center",
                            }}
                          >
                            <FormControlLabel
                              value="student"
                              control={<Radio color="primary" />}
                              label="Aluno"
                              style={{ fontSize: "14px" }}
                            />
                            <FormControlLabel
                              value="teacher"
                              control={<Radio color="primary" />}
                              label="Professor"
                              style={{ fontSize: "14px" }}
                            />
                          </RadioGroup>
                        </FormGroup>
                      </GridItem>
                    </GridContainer>
                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                    <Button simple color="primary" size="lg">
                      Registrar
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    </div>
  );
}
