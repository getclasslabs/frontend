/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import BackupIcon from "@material-ui/icons/Backup";

import Button from "components/CustomButtons/Button.js";
import GridItem from "components/Grid/GridItem.js";
import CustomInput from "components/CustomInput/CustomInput.js";

import api from "services/api";

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

export default function SimpleModal({ open, setOpen, payment, id }) {
  const userLogged = useSelector((state) => state.user.profile);
  const history = useHistory();
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = useState(getModalStyle);
  const [comment, setComment] = useState("");
  const [file, setFile] = useState(null);

  const [error, setError] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  function handleChange(e) {
    setFile(e.target.files[0]);
  }

  async function handleSend() {
    try {
      const data = new FormData();

      data.append("studentID", userLogged.student_id);

      if (file) {
        data.append("receipt", file);
      }

      data.append("text", comment);
      data.append("courseID", id);

      await api.post("courses/ingress", data, {
        headers: { Authorization: "Bearer " + userLogged.jwt },
      });

      history.go(0);
    } catch (err) {
      setError(true);
    }
  }

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle} className={classes.paper}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
            }}
          >
            <h3>Instruções para Matricula</h3>
            <p>{payment}</p>
            <GridItem xs={12} sm={12} md={12} lg={12}>
              <CustomInput
                labelText="Comentário (opcional)"
                id="comment"
                value={comment}
                onChange={(event) => {
                  setComment(event.target.value);
                }}
                formControlProps={{
                  fullWidth: true,
                }}
              />
            </GridItem>
            <input
              accept="image/*"
              className={classes.input}
              style={{ display: "none" }}
              id="comprovante"
              type="file"
              onChange={handleChange}
            />
            <label htmlFor="comprovante">
              {file ? (
                <p style={{ fontSize: 12, fontStyle: "italic" }}>{file.name}</p>
              ) : null}

              <Button
                color={file ? "primary" : ""}
                component="span"
                style={{ width: "100%" }}
                className={classes.navLinkLogout}
              >
                <BackupIcon size={20} /> Carregar Comprovante
              </Button>
            </label>

            {error ? (
              <p style={{ fontSize: 12, fontStyle: "italic", color: "red" }}>
                Ocorreu um erro! Tente novamente
              </p>
            ) : null}
            <Button
              color={file || comment ? "primary" : ""}
              component="span"
              style={{ width: "100%" }}
              onClick={file || comment ? handleSend : null}
              className={classes.navLinkLogout}
            >
              Enviar Solicitação
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
