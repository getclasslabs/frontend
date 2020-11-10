/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import ReactLoading from "react-loading";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
// @material-ui/icons
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import Lock from "@material-ui/icons/Lock";
// core components
import Header from "components/Header/HeaderLogin.js";
import Footer from "components/Footer/FooterLogin.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import HeaderLinks from "components/Header/HeaderLinksProfileEdit.js";
import NavPills from "components/NavPills/NavPills.js";
import Parallax from "components/Parallax/Parallax.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import PhotoUploader from "components/Upload/Photo";
import Button from "components/CustomButtons/Button.js";

import { updateProfileSuccess } from "store/modules/user/actions";
import { signOut } from "store/modules/auth/actions";

import api from "services/api";

import styles from "assets/jss/material-kit-react/views/profilePage.js";

import image1 from "assets/img/background/1.jpg";

const useStyles = makeStyles(styles);

export default function ProfilePageEdit(props) {
  const classes = useStyles();
  const history = useHistory();
  const userLogged = useSelector((state) => state.user.profile);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [openError, setOpenError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [openSuccess, setOpenSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const [passLoad, setPassLoad] = useState(false);
  const [password, setPassword] = useState("");
  const [passConfirm, setPassConfirm] = useState("");
  const [oldPass, setOldPass] = useState("");

  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [photo, setPhoto] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [gender, setGender] = useState("" + "");

  const [twitter, setTwitter] = useState("");
  const [facebook, setFacebook] = useState("");
  const [instagram, setInstagram] = useState("");

  const [location, setLocation] = useState("");
  const [phone, setPhone] = useState("");
  const [description, setDescription] = useState("");

  const [formation, setFormation] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [workingTime, setWorkingTime] = useState("");

  function updateInfo(data) {
    setEmail(data.email);
    setNickname(data.nickname);
    setPhoto(
      data.photo_path !== "" && data.photo_path !== null
        ? `http://localhost:3000/user/images/${data.photo_path}`
        : null
    );
    setPassword("");
    setPassConfirm("");
    setFirstName(data.first_name);
    setLastName(data.last_name);
    setBirthDate(data.birthDate);
    setGender(`${data.gender}`);
    setTwitter(data.twitter);
    setFacebook(data.facebook);
    setInstagram(data.instagram);
    setLocation(data.address);
    setPhone(data.telephone);
    setDescription(data.description);
    setFormation(data.formation);
    setSpecialization(data.specialization);
    setWorkingTime(`${data.working_time}`);
  }

  const dispatch = useDispatch();

  useEffect(() => {
    async function getUserByNickname() {
      const response = await api.get(`user/u/${userLogged.nickname}`, {
        headers: { Authorization: `Bearer ${userLogged.jwt}` },
      });

      updateInfo(response.data);
      console.log(response.data);
      if (Object.keys(response.data).length === 0) {
        history.push("");
        dispatch(signOut(history));
      }
    }

    getUserByNickname();
  }, []);

  const { ...rest } = props;

  const handleGender = (event) => {
    setGender(event.target.value);
  };

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenError(false);
  };

  const handleSave = async () => {
    const formData = {
      email: email,
      nickname: nickname,
      firstName: firstName,
      lastName: lastName,
      birthDate: birthDate,
      gender: parseInt(gender, 10),
      twitter: twitter,
      facebook: facebook,
      instagram: instagram,
      description: description,
      telephone: phone,
      address: location,
      formation: formation,
      specialization: specialization,
      workingTime: parseInt(workingTime, 10),
    };
    try {
      if (password !== passConfirm) {
        setErrorMessage("Senhas diferentes");
        setOpenError(true);
      } else {
        const response = await api.put("user/edit", formData, {
          headers: { Authorization: "Bearer " + userLogged.jwt },
        });

        dispatch(
          updateProfileSuccess({
            ...userLogged,
            ...response.data,
            gender: gender,
            first_name: firstName,
            last_name: lastName,
            working_time: workingTime,
          })
        );
        history.push(`/me/${userLogged.nickname}`, { submitSuccess: true });
      }
    } catch (err) {
      history.push(`/me/${userLogged.nickname}`, { submitError: true });
    }
  };

  const handlePass = async () => {
    setPassLoad(true);

    const formData = {
      oldPass: oldPass,
      newPass: password,
      newPassConfirmation: passConfirm,
    };
    try {
      if (password !== passConfirm) {
        setErrorMessage("Senhas diferentes");
        setOpenError(true);
        setPassLoad(false);
      } else if (!oldPass && !password && !passConfirm) {
        setErrorMessage("Preencha todos os campos");
        setOpenError(true);
        setPassLoad(false);
      } else {
        await api.put("user/password", formData, {
          headers: { Authorization: "Bearer " + userLogged.jwt },
        });

        setSuccessMessage("Sua senha foi alterada!");
        setOpenSuccess(true);
        setPassLoad(false);
      }
    } catch (err) {
      setErrorMessage("Tente novamente");
      setOpenError(true);
      setPassLoad(false);
    }
  };

  return (
    <div>
      <Header
        color="transparent"
        brand="Material Kit React"
        rightLinks={
          <HeaderLinks
            handleSave={handleSave}
            handleCancel={() => history.push(`/me/${userLogged.nickname}`)}
          />
        }
        fixed
        changeColorOnScroll={{
          height: 200,
          color: "white",
        }}
        {...rest}
      />
      <Parallax small filter image={image1} />
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div>
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={6}>
                <div className={classes.profile}>
                  <div>
                    <PhotoUploader image={photo} />
                  </div>
                </div>
              </GridItem>
            </GridContainer>
            <GridContainer>
              <GridItem xs={12} sm={12} md={12} className={classes.navWrapper}>
                <NavPills
                  alignCenter
                  color="primary"
                  tabs={[
                    {
                      tabButton: "Informações pessoais",
                      tabIcon: AccountCircleIcon,
                      tabContent: (
                        <form onSubmit={handleSave} style={{ width: "100%" }}>
                          <GridContainer>
                            <GridItem xs={12} sm={12} md={6} lg={6}>
                              <CustomInput
                                labelText="Email"
                                id="email"
                                value={email}
                                readOnly
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
                                labelText="Nick"
                                id="nickname"
                                value={nickname}
                                onChange={(event) => {
                                  setNickname(event.target.value);
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
                            <GridItem xs={12} sm={12} md={6} lg={6}>
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
                            <GridItem xs={12} sm={12} md={6} lg={6}>
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
                            <GridItem
                              xs={12}
                              sm={12}
                              md={6}
                              lg={6}
                              style={{ marginBottom: "20px" }}
                            >
                              <FormGroup>
                                <FormLabel
                                  component="legend"
                                  style={{
                                    paddingTop: "15px",
                                    fontSize: "14px",
                                  }}
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
                            <GridItem xs={12} sm={12} md={6} lg={6}></GridItem>
                            <GridItem
                              xs={12}
                              sm={12}
                              md={6}
                              lg={6}
                              style={{ marginTop: 50 }}
                            >
                              <Button
                                color="primary"
                                onClick={handleSave}
                                className={classes.navLinkLogout}
                                type="submit"
                              >
                                Salvar
                              </Button>
                              <Button
                                color="danger"
                                onClick={() =>
                                  history.push(`/me/${userLogged.nickname}`)
                                }
                                className={classes.navLinkLogout}
                              >
                                Cancelar
                              </Button>
                            </GridItem>
                          </GridContainer>
                        </form>
                      ),
                    },
                    {
                      tabButton: "Informações Adicionais",
                      tabIcon: LibraryBooks,
                      tabContent: (
                        <form onSubmit={handleSave} style={{ width: "100%" }}>
                          <GridContainer>
                            <GridItem xs={12} sm={12} md={4} lg={4}>
                              <CustomInput
                                labelText="Twitter"
                                id="twitter"
                                value={twitter}
                                onChange={(event) => {
                                  setTwitter(event.target.value);
                                }}
                                formControlProps={{
                                  fullWidth: true,
                                }}
                              />
                            </GridItem>
                            <GridItem xs={12} sm={12} md={4} lg={4}>
                              <CustomInput
                                labelText="Facebook"
                                id="facebook"
                                value={facebook}
                                onChange={(event) => {
                                  setFacebook(event.target.value);
                                }}
                                formControlProps={{
                                  fullWidth: true,
                                }}
                              />
                            </GridItem>
                            <GridItem xs={12} sm={12} md={4} lg={4}>
                              <CustomInput
                                labelText="Instagram"
                                id="instagram"
                                value={instagram}
                                onChange={(event) => {
                                  setInstagram(event.target.value);
                                }}
                                formControlProps={{
                                  fullWidth: true,
                                }}
                              />
                            </GridItem>
                            <GridItem xs={12} sm={12} md={6} lg={6}>
                              <CustomInput
                                labelText="Localidade"
                                id="location"
                                value={location}
                                onChange={(event) => {
                                  setLocation(event.target.value);
                                }}
                                formControlProps={{
                                  fullWidth: true,
                                }}
                              />
                            </GridItem>
                            <GridItem xs={12} sm={12} md={6} lg={6}>
                              <CustomInput
                                labelText="Telefone"
                                id="phone"
                                value={phone}
                                onChange={(event) => {
                                  setPhone(event.target.value);
                                }}
                                formControlProps={{
                                  fullWidth: true,
                                }}
                                inputProps={{
                                  type: "phone",
                                }}
                              />
                            </GridItem>
                            <GridItem xs={12} sm={12} md={12} lg={12}>
                              <CustomInput
                                labelText="Descrição"
                                id="description"
                                multiline
                                value={description}
                                onChange={(event) => {
                                  setDescription(event.target.value);
                                }}
                                formControlProps={{
                                  fullWidth: true,
                                }}
                              />
                            </GridItem>

                            {userLogged.register === 1 ? (
                              <>
                                <GridItem xs={12} sm={12} md={4} lg={4}>
                                  <CustomInput
                                    labelText="Formação"
                                    id="graduation"
                                    value={formation}
                                    onChange={(event) => {
                                      setFormation(event.target.value);
                                    }}
                                    formControlProps={{
                                      fullWidth: true,
                                    }}
                                  />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={4} lg={4}>
                                  <CustomInput
                                    labelText="Especialização"
                                    id="area"
                                    value={specialization}
                                    onChange={(event) => {
                                      setSpecialization(event.target.value);
                                    }}
                                    formControlProps={{
                                      fullWidth: true,
                                    }}
                                  />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={4} lg={4}>
                                  <CustomInput
                                    labelText="Tempo de atuação"
                                    id="time-working"
                                    multiline
                                    value={workingTime}
                                    onChange={(event) => {
                                      setWorkingTime(event.target.value);
                                    }}
                                    formControlProps={{
                                      fullWidth: true,
                                    }}
                                    inputProps={{
                                      type: "number",
                                      autoComplete: "off",
                                    }}
                                  />
                                </GridItem>
                              </>
                            ) : null}

                            <GridItem xs={12} sm={12} md={6} lg={6}></GridItem>
                            <GridItem
                              xs={12}
                              sm={12}
                              md={6}
                              lg={6}
                              style={{ marginTop: 50 }}
                            >
                              <Button
                                color="primary"
                                onClick={handleSave}
                                className={classes.navLinkLogout}
                                type="submit"
                              >
                                Salvar
                              </Button>
                              <Button
                                color="danger"
                                onClick={() =>
                                  history.push(`/me/${userLogged.nickname}`)
                                }
                                className={classes.navLinkLogout}
                              >
                                Cancelar
                              </Button>
                            </GridItem>
                          </GridContainer>
                        </form>
                      ),
                    },
                    {
                      tabButton: "Segurança",
                      tabIcon: Lock,
                      tabContent: (
                        <form onSubmit={handlePass} style={{ width: "100%" }}>
                          <GridContainer>
                            <GridItem xs={12} sm={12} md={6} lg={6}>
                              <CustomInput
                                labelText="Nova Senha"
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
                                labelText="Confirme a nova senha"
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
                            <GridItem xs={12} sm={12} md={6} lg={6}>
                              <CustomInput
                                labelText="Senha Atual"
                                id="old-pass"
                                value={oldPass}
                                onChange={(event) => {
                                  setOldPass(event.target.value);
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
                              <Button
                                color="primary"
                                size="lg"
                                type="submit"
                                onClick={handlePass}
                              >
                                {passLoad ? (
                                  <ReactLoading
                                    type="spin"
                                    color="#fff"
                                    height={"20%"}
                                    width={"20%"}
                                  />
                                ) : (
                                  `Atualizar Senha`
                                )}
                              </Button>
                            </GridItem>
                          </GridContainer>
                        </form>
                      ),
                    },
                  ]}
                />
              </GridItem>
            </GridContainer>
          </div>
        </div>
      </div>
      <Snackbar
        open={openError}
        autoHideDuration={3000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert onClose={handleCloseAlert} severity="error">
          Ocorreu um erro! {errorMessage}
        </Alert>
      </Snackbar>

      <Snackbar
        open={openSuccess}
        autoHideDuration={3000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert onClose={handleCloseAlert} severity="success">
          Sucesso! {successMessage}
        </Alert>
      </Snackbar>

      <Footer />
    </div>
  );
}
