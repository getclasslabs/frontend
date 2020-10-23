import React, { useEffect, useState } from "react";
import { Jutsu } from "react-jutsu";

import { useLocation, useHistory } from "react-router-dom";

// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// core components
import Header from "components/Header/HeaderLogin.js";
import Footer from "components/Footer/FooterLogin.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import HeaderLinks from "components/Header/HeaderLinksUser.js";

import styles from "assets/jss/material-kit-react/views/profilePage.js";

const useStyles = makeStyles(styles);

export default function CoursesView(props) {
  const [classId, setClassId] = useState(0);
  const location = useLocation();
  const history = useHistory();
  const classes = useStyles();
  const { ...rest } = props;

  useEffect(() => {
    setClassId(location.state.id); // result: 'some_value'
  }, [location]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <Header
        color="white"
        brand="Material Kit React"
        isView={true}
        rightLinks={<HeaderLinks />}
        {...rest}
      />
      <div
        className={classNames(classes.main, classes.mainRaised)}
        style={{ marginTop: 30 }}
      >
        <div>
          <div className={classes.container}>
            <GridContainer>
              <GridItem xs={12} sm={12} md={12}>
                <h2 className={classes.title}>Curso X</h2>
                <h4>Horário de aula do curso X.</h4>
              </GridItem>
            </GridContainer>
          </div>
          <div className={classes.container}>
            <GridContainer alignItems="center" style={{ marginBottom: 20 }}>
              <GridItem
                xs={12}
                sm={12}
                md={12}
                lg={12}
                style={{
                  display: "flex",
                  marginBottom: 30,
                }}
              >
                {classId !== 0 ? (
                  <Jutsu
                    roomName={`gcl-curso-${classId}#config.startWithVideoMuted=true&interfaceConfig.TOOLBAR_BUTTONS=%5B%22microphone%22%2C%22camera%22%2C%22raisehand%22%2C%22chat%22%2C%22desktop%22%2C%22fullscreen%22%2C%22hangup%22%2C%22profile%22%2C%22settings%22%2C%22videoquality%22%5D&interfaceConfig.SETTINGS_SECTIONS=%5B%22devices%22%2C%22language%22%5D`}
                    displayName={"Matheus"}
                    password="abc123"
                    onMeetingEnd={() => history.goBack()}
                    loadingComponent={<p>loading ...</p>}
                    containerStyles={{
                      width: "100%",
                      height: "580px",
                      ".url": { display: "none" },
                    }}
                  />
                ) : null}
              </GridItem>
            </GridContainer>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
