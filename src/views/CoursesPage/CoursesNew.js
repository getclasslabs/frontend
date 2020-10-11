import React, { useState } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";

// core components
import Header from "components/Header/HeaderLogin.js";
import Footer from "components/Footer/FooterLogin.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import HeaderLinks from "components/Header/HeaderLinksProfileEdit.js";
import Parallax from "components/Parallax/Parallax.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import CategoriesDropdown from "components/CustomDropdown/CategoriesDropdown.js";
import ImageUploader from "components/Upload/Image";

import styles from "assets/jss/material-kit-react/views/profilePage.js";

import image1 from "assets/img/background/1.jpg";

const useStyles = makeStyles(styles);

export default function CoursesNew(props) {
  const classes = useStyles();
  const { ...rest } = props;

  const [classType, setClassType] = useState("online");

  const handleClassType = (event) => {
    setClassType(event.target.value);
  };

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
            <GridContainer>
              <GridItem xs={12} sm={12} md={12} lg={12}>
                <CustomInput
                  labelText="Nome do Curso"
                  id="name"
                  // value={email}
                  // onChange={(event) => {
                  //   setEmail(event.target.value);
                  // }}
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
                <FormGroup>
                  <FormLabel
                    component="legend"
                    style={{ paddingTop: "15px", fontSize: "14px" }}
                  >
                    Tipo de Turma
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-label="gender"
                    name="gender"
                    // value={gender}
                    // onChange={handleGender}
                    style={{
                      paddingLeft: "20px",
                      justifyContent: "center",
                    }}
                  >
                    <FormControlLabel
                      value="0"
                      control={<Radio color="primary" />}
                      label="Aula em Grupo"
                      style={{ fontSize: "14px" }}
                    />
                    <FormControlLabel
                      value="1"
                      control={<Radio color="primary" />}
                      label="Único Aluno"
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
                      value="presencial"
                      control={<Radio color="primary" />}
                      label="Presencial"
                      style={{ fontSize: "14px" }}
                    />
                    <FormControlLabel
                      value="online"
                      control={<Radio color="primary" />}
                      label="Online"
                      style={{ fontSize: "14px" }}
                    />
                  </RadioGroup>
                </FormGroup>
              </GridItem>
              {classType === "presencial" ? (
                <GridItem xs={12} sm={12} md={12} lg={12}>
                  <CustomInput
                    labelText="Onde será o local de encontro?"
                    id="local"
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
                md={6}
                lg={6}
                style={{ marginBottom: "20px" }}
              >
                <CustomInput
                  labelText="Valor (R$)"
                  id="value"
                  // value={email}
                  // onChange={(event) => {
                  //   setEmail(event.target.value);
                  // }}
                  formControlProps={{
                    fullWidth: true,
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
                <CategoriesDropdown />
              </GridItem>
              <GridItem xs={12} sm={12} md={12} lg={12}>
                <CustomInput
                  labelText="Forma de pagamento (informe como deve ser feito o pagamento, dados bancários, etc...)"
                  id="local"
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
                md={12}
                lg={12}
                style={{ marginTop: 10, marginBottom: 30 }}
              >
                <ImageUploader image={null} />
              </GridItem>
            </GridContainer>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
