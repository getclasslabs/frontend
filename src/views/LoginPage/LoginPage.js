/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { signInRequest } from "store/modules/auth/actions";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import CircularProgress from "@material-ui/core/CircularProgress";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
// core components
import Header from "components/Header/HeaderLogin.js";
import HeaderLinks from "components/Header/HeaderLinksLogin.js";
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

export default function LoginPage(props) {
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");

  const classes = useStyles();
  const history = useHistory();

  const { ...rest } = props;

  const [submited, setSubmited] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  function handleSubmit() {
    if (!email || !password) {
      setErrorMessage("Preencha todos os dados");
      setOpenError(true);
    } else {
      setSubmited(true);
      dispatch(signInRequest(email, password, history, setSubmited));
    }
  }

  const handleCloseError = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenError(false);
  };

  setTimeout(function () {
    setCardAnimation("");
  }, 700);

  useEffect(() => {
    window.scrollTo(0, 0);
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
            <GridItem xs={12} sm={12} md={4}>
              <Card className={classes[cardAnimaton]}>
                <form className={classes.form} onSubmit={handleSubmit}>
                  <CardHeader className={classes.cardHeader}>
                    <h2>Login</h2>
                  </CardHeader>

                  <CardBody>
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
                        endAdornment: (
                          <InputAdornment position="end">
                            <Email className={classes.inputIconsColor} />
                          </InputAdornment>
                        ),
                      }}
                    />
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
                        endAdornment: (
                          <InputAdornment position="end">
                            <Icon className={classes.inputIconsColor}>
                              lock_outline
                            </Icon>
                          </InputAdornment>
                        ),
                        autoComplete: "off",
                      }}
                    />
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
                        type="submit"
                        onClick={handleSubmit}
                      >
                        Acessar
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
