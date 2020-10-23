import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";

// core components
import Header from "components/Header/HeaderLogin.js";
import Footer from "components/Footer/FooterLogin.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import HeaderLinks from "components/Header/HeaderLinksUser.js";
import Parallax from "components/Parallax/Parallax.js";
import CustomInput from "components/CustomInput/CustomInput.js";

import styles from "assets/jss/material-kit-react/views/homePage.js";

// Sections for this page
import Categories from "./Sections/CategoriesSection.js";
import Courses from "./Sections/CoursesSection.js";
import api from "services/api";

import image2 from "assets/img/background/2.jpg";
import image4 from "assets/img/background/4.jpg";

const pictureArray = [image2, image4];
const randomIndex = Math.floor(Math.random() * pictureArray.length);
const selectedPicture = pictureArray[randomIndex];

const dashboardRoutes = [];

const useStyles = makeStyles(styles);

export default function HomePage(props) {
  const userLogged = useSelector((state) => state.user.profile);
  const classes = useStyles();
  const history = useHistory();
  const { ...rest } = props;

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);

    async function getCategoriesReq() {
      const response = await api.get("courses/categories", {
        headers: { Authorization: "Bearer " + userLogged.jwt },
      });

      setCategories(response.data);
    }
    getCategoriesReq();
  }, []);

  const [search, setSearch] = useState("");

  const navigateSearch = (event) => {
    event.preventDefault();
    history.push({
      pathname: "/results",
      state: { search: search },
    });
  };

  return (
    <div>
      <Header
        color="transparent"
        routes={dashboardRoutes}
        brand="Material Kit React"
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{
          height: 400,
          color: "white",
        }}
        {...rest}
      />
      <Parallax
        filter
        image={selectedPicture}
        style={{ paddingLeft: "18%", paddingRight: "18%" }}
      >
        <div
          className={classes.container}
          style={{
            backgroundColor: "RGB(255,255,255,0.1)",
            borderRadius: "4px",
          }}
        >
          <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
              <h1 className={classes.title}>
                Comece seus estudos buscando por algo novo...
              </h1>
            </GridItem>
          </GridContainer>
          <GridContainer alignItems="alignItems">
            <GridItem xs={12} sm={12} md={9}>
              <CustomInput
                labelText="Digite algo que deseje buscar"
                id="search"
                white
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);
                }}
                formControlProps={{
                  fullWidth: true,
                }}
                style={{
                  paddingLeft: "10px",
                }}
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={2}>
              <Button
                color="primary"
                size="lg"
                rel="noopener noreferrer"
                onClick={navigateSearch}
              >
                Buscar
              </Button>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>
          <Categories categories={categories} />
          <Courses />
        </div>
      </div>
      <Footer />
    </div>
  );
}
