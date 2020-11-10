import React, { useState, useEffect } from "react";
// nodejs library that concatenates classes
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import TextField from "@material-ui/core/TextField";
import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
// core components
import Header from "components/Header/HeaderLogin.js";
import Footer from "components/Footer/FooterLogin.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import HeaderLinks from "components/Header/HeaderLinksProfileEdit.js";
import Parallax from "components/Parallax/Parallax.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import CategoriesDropdown from "components/CustomDropdown/CategoriesDropdown.js";
import CustomModal from "components/Modal/CreateCourseModal.js";
import Button from "components/CustomButtons/Button.js";

import styles from "assets/jss/material-kit-react/views/profilePage.js";

import api from "services/api";

import image1 from "assets/img/background/1.jpg";

const useStyles = makeStyles(styles);

export default function CoursesNew(props) {
  const classes = useStyles();
  const history = useHistory();
  const { ...rest } = props;
  const userLogged = useSelector((state) => state.user.profile);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [openError, setOpenError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [classType, setClassType] = useState("ONLINE");
  const [name, setName] = useState();
  const [description, setDescription] = useState();

  const [categoryID, setCategoryID] = useState(0);
  const [categories, setCategories] = useState(null);

  const [maxStudents, setMaxStudents] = useState();
  const [periods, setPeriods] = useState();
  const [place, setPlace] = useState();
  const [price, setPrice] = useState();
  const [payment, setPayment] = useState();
  const [classesTotal, setClassesTotal] = useState();
  const [startDay, setStartDay] = useState();
  const [allowStudentsAfterStart, setAllowStudentsAfterStart] = useState("sim");

  const [modalOpen, setModalOpen] = useState(false);
  const [createdId, setCreatedId] = useState(null);

  const handleClassType = (event) => {
    setClassType(event.target.value);
  };

  const handleAfterClassStart = (event) => {
    setAllowStudentsAfterStart(event.target.value);
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

  async function handleSave(e) {
    e.preventDefault();
    var unixTimestamp = new Date(startDay).getTime() / 1000;

    const formData = {
      name: name,
      description: description,
      categoryID: categoryID,
      maxStudents: parseInt(maxStudents, 10),
      periods: periods,
      place: place,
      price: parseFloat(price, 10),
      classes: parseInt(classesTotal, 10),
      startDay: "" + unixTimestamp + "",
      allowStudentsAfterStart: allowStudentsAfterStart === "sim",
      type: classType,
      payment: payment,
    };
    try {
      if (
        !name ||
        !description ||
        !categoryID ||
        !maxStudents ||
        !periods ||
        !price ||
        !startDay ||
        !allowStudentsAfterStart ||
        !payment
      ) {
        setErrorMessage("Preencha todos os campos obrigatórios");
        setOpenError(true);
      } else {
        const response = await api.post("courses/create", formData, {
          headers: { Authorization: "Bearer " + userLogged.jwt },
        });

        setModalOpen(true);
        setCreatedId(response.data.id);
      }
    } catch (err) {
      setErrorMessage("Tente novamente");
      setOpenError(true);
    }
  }

  useEffect(() => {
    async function getCategoriesReq() {
      const response = await api.get("courses/categories", {
        headers: { Authorization: "Bearer " + userLogged.jwt },
      });

      setCategories(response.data);
    }

    if (userLogged.register !== 1) {
      history.push("/home");
    }
    getCategoriesReq();
  }, []);

  return (
    <div>
      <Header
        color="transparent"
        brand="Material Kit React"
        rightLinks={
          <HeaderLinks
            handleSave={handleSave}
            handleCancel={() => history.push("/courses")}
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
            <GridContainer>
              <GridItem xs={12} sm={12} md={12}>
                <h2 className={classes.title}>Adicionar novo Curso</h2>
                <h4>
                  Preencha corretamente as informações do curso e mostre aos
                  interessados o máximo de informações possíveis.
                </h4>
              </GridItem>
            </GridContainer>
          </div>
          <div className={classes.container}>
            <form onSubmit={handleSave} style={{ width: "100%" }}>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12} lg={12}>
                  <CustomInput
                    labelText="Nome do Curso"
                    id="name"
                    value={name}
                    onChange={(event) => {
                      setName(event.target.value);
                    }}
                    formControlProps={{
                      fullWidth: true,
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={12} lg={12}>
                  <CustomInput
                    labelText="Faça uma descrição sobre o curso..."
                    id="description"
                    formControlProps={{
                      fullWidth: true,
                      className: classes.textArea,
                    }}
                    value={description}
                    onChange={(event) => {
                      setDescription(event.target.value);
                    }}
                    inputProps={{
                      multiline: true,
                      rows: 5,
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={12} lg={12}>
                  <CustomInput
                    labelText="Horários para as aulas."
                    id="hour"
                    value={periods}
                    onChange={(event) => {
                      setPeriods(event.target.value);
                    }}
                    formControlProps={{
                      fullWidth: true,
                      className: classes.textArea,
                    }}
                    inputProps={{
                      multiline: true,
                      rows: 5,
                    }}
                  />
                </GridItem>
                <GridItem
                  xs={12}
                  sm={12}
                  md={6}
                  lg={6}
                  style={{ marginBottom: "20px" }}
                >
                  <CustomInput
                    labelText="Limite de Alunos"
                    id="maxStudents"
                    value={maxStudents}
                    onChange={(event) => {
                      setMaxStudents(event.target.value);
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
                      style={{ paddingTop: "15px", fontSize: "14px" }}
                    >
                      Tipo de Aula
                    </FormLabel>
                    <RadioGroup
                      row
                      aria-label="classType"
                      name="classType"
                      value={classType}
                      onChange={handleClassType}
                      style={{
                        paddingLeft: "20px",
                        justifyContent: "center",
                      }}
                    >
                      <FormControlLabel
                        value="PRESENCIAL"
                        control={<Radio color="primary" />}
                        label="Presencial"
                        style={{ fontSize: "14px" }}
                      />
                      <FormControlLabel
                        value="ONLINE"
                        control={<Radio color="primary" />}
                        label="Online"
                        style={{ fontSize: "14px" }}
                      />
                    </RadioGroup>
                  </FormGroup>
                </GridItem>
                {classType === "PRESENCIAL" ? (
                  <GridItem xs={12} sm={12} md={12} lg={12}>
                    <CustomInput
                      labelText="Onde será o local de encontro?"
                      id="local"
                      value={place}
                      onChange={(event) => {
                        setPlace(event.target.value);
                      }}
                      formControlProps={{
                        fullWidth: true,
                        className: classes.textArea,
                      }}
                      inputProps={{
                        multiline: true,
                        rows: 5,
                      }}
                    />
                  </GridItem>
                ) : null}
                <GridItem
                  xs={12}
                  sm={12}
                  md={4}
                  lg={4}
                  style={{ marginBottom: "20px" }}
                >
                  <CustomInput
                    labelText="Número de Aulas (opcional)"
                    id="classes"
                    value={classesTotal}
                    onChange={(event) => {
                      setClassesTotal(event.target.value);
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
                <GridItem
                  xs={12}
                  sm={12}
                  md={4}
                  lg={4}
                  style={{ marginBottom: "20px" }}
                >
                  <TextField
                    id="date"
                    label="Data de Início"
                    type="date"
                    value={startDay}
                    onChange={(event) => {
                      setStartDay(event.target.value);
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
                  md={4}
                  lg={4}
                  style={{ marginBottom: "20px" }}
                >
                  <FormGroup>
                    <FormLabel
                      component="legend"
                      style={{ paddingTop: "15px", fontSize: "14px" }}
                    >
                      Permitir novos alunos após início das Aulas?
                    </FormLabel>
                    <RadioGroup
                      row
                      aria-label="classType"
                      name="classType"
                      value={allowStudentsAfterStart}
                      onChange={handleAfterClassStart}
                      style={{
                        paddingLeft: "20px",
                        justifyContent: "center",
                      }}
                    >
                      <FormControlLabel
                        value={"sim"}
                        control={<Radio color="primary" />}
                        label="Sim"
                        style={{ fontSize: "14px" }}
                      />
                      <FormControlLabel
                        value={"não"}
                        control={<Radio color="primary" />}
                        label="Não"
                        style={{ fontSize: "14px" }}
                      />
                    </RadioGroup>
                  </FormGroup>
                </GridItem>
                <GridItem
                  xs={12}
                  sm={12}
                  md={6}
                  lg={6}
                  style={{ marginBottom: "20px" }}
                >
                  <CustomInput
                    labelText="Valor (10.99)"
                    id="value"
                    value={price}
                    onChange={(event) => {
                      setPrice(event.target.value);
                    }}
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "number",
                      step: ".01",
                      autoComplete: "off",
                    }}
                  />
                </GridItem>
                <GridItem
                  xs={12}
                  sm={12}
                  md={6}
                  lg={6}
                  style={{ marginBottom: "20px" }}
                >
                  <CategoriesDropdown
                    setCategoryID={setCategoryID}
                    categoryID={categoryID}
                    categories={categories}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={12} lg={12}>
                  <CustomInput
                    labelText="Forma de pagamento (informe como deve ser feito o pagamento, dados bancários, etc...)"
                    id="payment"
                    value={payment}
                    onChange={(event) => {
                      setPayment(event.target.value);
                    }}
                    formControlProps={{
                      fullWidth: true,
                      className: classes.textArea,
                    }}
                    inputProps={{
                      multiline: true,
                      rows: 5,
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={8} lg={8}></GridItem>
                <GridItem
                  xs={12}
                  sm={12}
                  md={4}
                  lg={4}
                  style={{ marginTop: 50, marginBottom: 50 }}
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
                    onClick={() => history.push(`/courses`)}
                    className={classes.navLinkLogout}
                  >
                    Cancelar
                  </Button>
                </GridItem>
              </GridContainer>
            </form>
          </div>
        </div>
      </div>

      <CustomModal open={modalOpen} id={createdId} />

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
      <Footer />
    </div>
  );
}
