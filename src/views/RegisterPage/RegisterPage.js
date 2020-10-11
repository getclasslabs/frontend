/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { signUpRequest } from "store/modules/auth/actions";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import CircularProgress from "@material-ui/core/CircularProgress";

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

const useStyles = makeStyles(styles);

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function RegisterPage(props) {
  const classes = useStyles();
  const history = useHistory();
  const { ...rest } = props;

  const [submited, setSubmited] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [cardAnimaton, setCardAnimation] = useState("cardHidden");
  const [gender, setGender] = useState("0");
  const [register, setRegister] = useState("0");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passConfirm, setPassConfirm] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthDate, setBirthDate] = useState("");

  const dispatch = useDispatch();

  function handleSubmit() {
    if (!email || !password || !passConfirm) {
      setErrorMessage("Preencha todos os dados");
      setOpenError(true);
    } else if (password !== passConfirm) {
      setErrorMessage("Senhas diferentes");
      setOpenError(true);
    } else {
      setSubmited(true);
      dispatch(
        signUpRequest(
          email,
          password,
          passConfirm,
          firstName,
          lastName,
          birthDate,
          gender,
          register,
          history,
          setSubmited
        )
      );
    }
  }

  const handleCloseError = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenError(false);
  };

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

  useEffect(() => {
    if (
      props.history.location.state &&
      props.history.location.state.submitError
    ) {
      setOpenError(true);
      setErrorMessage("Tente novamente mais tarde");
    }
  }, [props]);

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
          backgroundImage: "url(" + image1 + ")",
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
                          value={email}
                          onChange={(event) => {
                            setEmail(event.target.value);
                          }}
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
                          id="password"
                          value={password}
                          onChange={(event) => {
                            setPassword(event.target.value);
                          }}
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
                          value={passConfirm}
                          onChange={(event) => {
                            setPassConfirm(event.target.value);
                          }}
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
                          value={firstName}
                          onChange={(event) => {
                            setFirstName(event.target.value);
                          }}
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
                          value={lastName}
                          onChange={(event) => {
                            setLastName(event.target.value);
                          }}
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
                          value={birthDate}
                          onChange={(event) => {
                            setBirthDate(event.target.value);
                          }}
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
                              value="0"
                              control={<Radio color="primary" />}
                              label="Masculino"
                              style={{ fontSize: "14px" }}
                            />
                            <FormControlLabel
                              value="1"
                              control={<Radio color="primary" />}
                              label="Feminino"
                              style={{ fontSize: "14px" }}
                            />
                            <FormControlLabel
                              value="2"
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
                              value="0"
                              control={<Radio color="primary" />}
                              label="Aluno"
                              style={{ fontSize: "14px" }}
                            />
                            <FormControlLabel
                              value="1"
                              control={<Radio color="primary" />}
                              label="Professor"
                              style={{ fontSize: "14px" }}
                            />
                          </RadioGroup>
                        </FormGroup>
                      </GridItem>
                    </GridContainer>
                  </CardBody>

                  <Snackbar
                    open={openError}
                    autoHideDuration={3000}
                    onClose={handleCloseError}
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  >
                    <Alert onClose={handleCloseError} severity="error">
                      Ocorreu um erro! {errorMessage}
                    </Alert>
                  </Snackbar>

                  <CardFooter className={classes.cardFooter}>
                    {submited ? (
                      <CircularProgress />
                    ) : (
                      <Button
                        simple
                        color="primary"
                        size="lg"
                        onClick={handleSubmit}
                      >
                        Registrar
                      </Button>
                    )}
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
