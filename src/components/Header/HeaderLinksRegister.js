/*eslint-disable*/
import React from "react";
// react components for routing our app without refresh
import { useHistory } from "react-router-dom";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

// core components
import Button from "components/CustomButtons/Button.js";

import styles from "assets/jss/material-kit-react/components/headerLinksStyle.js";

const useStyles = makeStyles(styles);

export default function HeaderLinks(props) {
  const classes = useStyles();
  const history = useHistory();

  const navigateLogin = (event) => {
    event.preventDefault();
    history.push("/login");
  };

  const navigateLanding = (event) => {
    event.preventDefault();
    history.push("/");
  };

  return (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
        <Button
          color="transparent"
          className={classes.navLink}
          onClick={navigateLogin}
        >
          Login
        </Button>
        <Button
          color="transparent"
          className={classes.navLink}
          onClick={navigateLanding}
          >
          Sobre o Site
        </Button>
      </ListItem>
    </List>
  );
}
