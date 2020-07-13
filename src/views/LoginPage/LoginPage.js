import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
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
import image2 from "assets/img/background/2.jpg";
import image3 from "assets/img/background/3.jpg";
import image4 from "assets/img/background/4.jpg";
import image5 from "assets/img/background/5.jpg";

const pictureArray = [image1, image2, image3, image4, image5];
const randomIndex = Math.floor(Math.random() * pictureArray.length);
const selectedPicture = pictureArray[randomIndex];

const useStyles = makeStyles(styles);

export default function LoginPage(props) {
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");

  const classes = useStyles();
  const history = useHistory();

  const { ...rest } = props;

  setTimeout(function () {
    setCardAnimation("");
  }, 700);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const navigateProfile = (event) => {
    event.preventDefault();
    history.push("/profile-page");
  };

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
            <GridItem xs={12} sm={12} md={4}>
              <Card className={classes[cardAnimaton]}>
                <form className={classes.form}>
                  <CardHeader className={classes.cardHeader}>
                    <h2>Login</h2>
                  </CardHeader>

                  <CardBody>
                    <CustomInput
                      labelText="Email"
                      id="email"
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
                      id="pass"
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
                  <CardFooter className={classes.cardFooter}>
                    <Button
                      simple
                      color="primary"
                      size="lg"
                      onClick={navigateProfile}
                    >
                      Acessar
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
