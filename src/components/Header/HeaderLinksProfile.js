/*eslint-disable*/
import React from "react";
import { useDispatch } from "react-redux";
// react components for routing our app without refresh
import { useHistory } from "react-router-dom";
import { signOut } from "store/modules/auth/actions";

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
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(signOut(history));
  }

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
          onClick={navigateLanding}
          >
          Sobre o Site
        </Button>
        <Button
          color="primary"
          onClick={navigateLanding}
          className={classes.navLinkLogout}
        >
          Editar
        </Button>
        <Button
          color="danger"
          onClick={handleLogout}
          className={classes.navLinkLogout}
        >
          Sair
        </Button>
      </ListItem>
    </List>
  );
}
