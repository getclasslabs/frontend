/*eslint-disable*/
import React from "react";
import { useSelector } from "react-redux";

// react components for routing our app without refresh
import { useHistory, useLocation } from "react-router-dom";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

// core components
import Button from "components/CustomButtons/Button.js";
import CustomDropdown from "components/CustomDropdown/CustomDropdown.js";

import styles from "assets/jss/material-kit-react/components/headerLinksStyle.js";
import profileImage from "assets/img/faces/matheus.png";
import navbarStyles from "assets/jss/material-kit-react/views/componentsSections/navbarsStyle.js";

const useStyles = makeStyles(navbarStyles);

export default function HeaderLinks(props) {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();

  const user = useSelector((state) => state.user.profile);

  const { courseId, setModal } = props;

  return (
    <List className={classes.list}>
        {courseId ? (
          <>
            <ListItem className={classes.listItem} style={{marginRight: 10}}>
              <Button
                color="primary"
                onClick={(e) => history.push(`/courses/edit/${courseId}`)}
                className={classes.navLinkLogout}
              >
                Editar
              </Button>
            </ListItem>
            <ListItem className={classes.listItem} style={{marginRight: 10}}>
              <Button
                color="danger"
                onClick={() => setModal(true)}
                className={classes.navLinkLogout}
              >
                Deletar
              </Button>
            </ListItem>
        </>
        ) : null}
      <ListItem className={classes.listItem}>
        <Button
          className={classes.navLink}
          onClick={(e) => history.push("/courses")}
          color="transparent"
        >
          Meus Cursos
        </Button>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Button
          className={classes.navLink}
          onClick={(e) => history.push(`/me/${user.nickname}`)}
          color="transparent"
        >
          Meu Perfil
        </Button>
      </ListItem>
    </List>
  );
}
