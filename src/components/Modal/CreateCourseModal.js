/* eslint-disable react/prop-types */
import React from "react";
import { useHistory } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";

import ImageUploader from "components/Upload/Image";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    maxHeight: 600,
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #fff",
    borderRadius: 4,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    display: "flex",
    overflow: "scroll",
  },
}));

export default function SimpleModal({ open, id }) {
  const history = useHistory();
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);

  return (
    <div>
      <Modal
        open={open}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle} className={classes.paper}>
          <GridContainer style={{ width: "100%" }}>
            <GridItem
              xs={12}
              sm={12}
              md={12}
              lg={12}
              style={{ marginTop: 10, marginBottom: 30 }}
            >
              <p>
                Adicione uma imagem para seu curso! Você pode adicionar ou
                alterar depois.
              </p>
              <ImageUploader image={null} id={id} />
            </GridItem>
            <GridItem
              xs={12}
              sm={12}
              md={12}
              lg={12}
              style={{ marginTop: 10, marginBottom: 30 }}
            >
              <Button
                color="primary"
                className={classes.navLinkLogout}
                style={{ width: "100%" }}
                onClick={() => history.push(`/courses/detail/${id}`)}
              >
                Continuar
              </Button>
            </GridItem>
          </GridContainer>
        </div>
      </Modal>
    </div>
  );
}
