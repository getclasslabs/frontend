/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { useSelector } from "react-redux";

import { makeStyles, withStyles } from "@material-ui/core/styles";
import Rating from "@material-ui/lab/Rating";
import Modal from "@material-ui/core/Modal";
import FavoriteIcon from "@material-ui/icons/Favorite";

import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";

import api from "services/api";

const StyledRating = withStyles({
  iconFilled: {
    color: "#ff6d75",
  },
  iconHover: {
    color: "#ff3d47",
  },
})(Rating);

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

export default function SimpleModal({ open, setOpen, teacherId, openMessage }) {
  const userLogged = useSelector((state) => state.user.profile);
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = useState(getModalStyle);

  const [value, setValue] = useState(null);
  const [comment, setComment] = useState("");

  const [error, setError] = useState(false);

  async function handleSubmit() {
    try {
      const data = {
        value: parseFloat(value, 10),
        comment: comment,
        student: parseInt(userLogged.student_id, 10),
        teacher: parseInt(teacherId, 10),
      };

      await api.post("user/review", data, {
        headers: { Authorization: "Bearer " + userLogged.jwt },
      });

      setOpen(false);
      openMessage(true);
    } catch (err) {
      setError(true);
    }
  }

  const handleClose = () => {
    setOpen(false);
  };

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
              width: "100%",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
              }}
            >
              <p>Avaliação: </p>
              <StyledRating
                name="customized-color"
                defaultValue={0}
                getLabelText={(value) =>
                  `${value} Heart${value !== 1 ? "s" : ""}`
                }
                size="large"
                precision={0.5}
                icon={<FavoriteIcon fontSize="inherit" />}
                style={{
                  marginLeft: 10,
                  marginTop: 5,
                }}
                onChange={(event) => {
                  setValue(event.target.value);
                }}
              />
            </div>
            <CustomInput
              labelText="Escreva um comentário sobre o professor"
              id="comment"
              formControlProps={{
                fullWidth: true,
                className: classes.textArea,
              }}
              inputProps={{
                multiline: true,
                rows: 5,
              }}
              onChange={(event) => {
                setComment(event.target.value);
              }}
            />

            {error ? (
              <p style={{ fontSize: 12, fontStyle: "italic", color: "red" }}>
                Ocorreu um erro! Tente novamente
              </p>
            ) : null}

            <Button
              color={value && comment ? "primary" : ""}
              className={classes.navLinkLogout}
              style={{ width: "100%" }}
              onClick={value && comment ? handleSubmit : null}
            >
              Enviar
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
