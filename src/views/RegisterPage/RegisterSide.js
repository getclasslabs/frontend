import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";

import image1 from "assets/img/background/1.jpg";
import image2 from "assets/img/background/2.jpg";
import image3 from "assets/img/background/3.jpg";
import image4 from "assets/img/background/4.jpg";
import image5 from "assets/img/background/5.jpg";

const pictureArray = [image1, image2, image3, image4, image5];
const randomIndex = Math.floor(Math.random() * pictureArray.length);
const selectedPicture = pictureArray[randomIndex];

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/"></Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: "url(" + selectedPicture + ")",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(6, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignInSide() {
  const history = useHistory();
  const classes = useStyles();
  const [gender, setGender] = React.useState("masculino");
  const [register, setRegister] = React.useState("masculino");

  const handleGender = (event) => {
    setGender(event.target.value);
  };

  const handleRegister = (event) => {
    setRegister(event.target.value);
  };

  const navigateLogin = (event) => {
    event.preventDefault();
    history.push("/login-side");
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fname"
                  name="firstName"
                  variant="outlined"
                  fullWidth
                  id="firstName"
                  label="Nome"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  fullWidth
                  id="lastName"
                  label="Sobrenome"
                  name="lastName"
                  autoComplete="lname"
                />
              </Grid>
              <Grid item xs={12}>
                <FormGroup row>
                  <FormLabel component="legend" style={{ paddingTop: "15px" }}>
                    Gênero
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-label="gender"
                    name="gender"
                    value={gender}
                    onChange={handleGender}
                    style={{ paddingLeft: "20px" }}
                  >
                    <FormControlLabel
                      value="masculino"
                      control={<Radio color="primary" />}
                      label="Masculino"
                    />
                    <FormControlLabel
                      value="feminino"
                      control={<Radio color="primary" />}
                      label="Feminino"
                    />
                    <FormControlLabel
                      value="outro"
                      control={<Radio color="primary" />}
                      label="Outro"
                    />
                  </RadioGroup>
                </FormGroup>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  variant="outlined"
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="date"
                  label="Data de Nascimento"
                  type="date"
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  style={{ width: "100%" }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  fullWidth
                  name="password"
                  label="Senha"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  fullWidth
                  name="password"
                  label="Confirme sua Senha"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
              </Grid>
              <Grid item xs={12}>
                <FormGroup row>
                  <FormLabel component="legend" style={{ paddingTop: "15px" }}>
                    Você está se registrando como...
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-label="register"
                    name="register"
                    value={register}
                    onChange={handleRegister}
                    style={{ paddingLeft: "20px" }}
                  >
                    <FormControlLabel
                      value="student"
                      control={<Radio color="primary" />}
                      label="Aluno"
                    />
                    <FormControlLabel
                      value="teacher"
                      control={<Radio color="primary" />}
                      label="Professor"
                    />
                  </RadioGroup>
                </FormGroup>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Registrar
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                Já tem uma conta?{" "}
                <Link
                  href="#"
                  variant="body2"
                  onClick={navigateLogin}
                  style={{ textDecoration: "none" }}
                >
                  Entre agora!
                </Link>
              </Grid>
            </Grid>
          </form>
          <Box mt={5}>
            <Copyright />
          </Box>
        </div>
      </Grid>
    </Grid>
  );
}
