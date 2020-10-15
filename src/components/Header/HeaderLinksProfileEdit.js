/*eslint-disable*/
import React from "react";
import { useSelector } from "react-redux";
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
  const userLogged = useSelector((state) => state.user.profile);
  const classes = useStyles();
  const history = useHistory();

  const { handleSave } = props;

  return (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
        <Button
          color="primary"
          onClick={handleSave}
          className={classes.navLinkLogout}
        >
          Salvar
        </Button>
        <Button
          color="danger"
          onClick={(e) => history.push(`/me/${userLogged.nickname}`)}
          className={classes.navLinkLogout}
        >
          Cancelar
        </Button>
      </ListItem>
    </List>
  );
}
