/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
// @material-ui/core components
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

import Lightbox from "react-awesome-lightbox";
import "react-awesome-lightbox/build/style.css";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import CircularProgress from "@material-ui/core/CircularProgress";

import api from "services/api";

import styles from "assets/jss/material-kit-react/views/landingPageSections/productStyle.js";

const useStyles = makeStyles(styles);

export default function Students({
  id,
  setModalContent,
  setModalOpen,
  setModalReciptOpen,
}) {
  const userLogged = useSelector((state) => state.user.profile);
  const history = useHistory();
  const classes = useStyles();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [solicitations, setSolicitations] = useState([]);
  const [students, setStudents] = useState([]);

  async function getSolicitations() {
    const response = await api.get(`courses/solicitations/${id}`, {
      headers: { Authorization: `Bearer ${userLogged.jwt}` },
    });

    setSolicitations(response.data);
  }

  async function getStudents() {
    const response = await api.get(`courses/students/${id}`, {
      headers: { Authorization: `Bearer ${userLogged.jwt}` },
    });

    setStudents(response.data);
  }

  useEffect(() => {
    getStudents();
    getSolicitations();
  }, [id]);

  async function handleConfirm(solicitation, user) {
    setLoading(true);

    const formData = {
      studentID: user,
      courseID: parseInt(id, 10),
      ingressSolicitationID: solicitation,
    };
    try {
      await api.post("courses/accept", formData, {
        headers: { Authorization: "Bearer " + userLogged.jwt },
      });

      setSolicitations([]);
      setStudents([]);
      getStudents();
      getSolicitations();
      setLoading(false);
    } catch (err) {
      setError(true);
      setLoading(false);
    }
  }

  function openModal(content, type) {
    if (type === "receipt") {
      setModalReciptOpen(true);
    } else {
      setModalOpen(true);
    }
    setModalContent(content);
  }

  return !loading ? (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <h2 className={classes.title}>Alunos e Solicitações</h2>
        {students.length > 0
          ? students.map((student) => (
              <div
                key={student.nickname}
                style={{
                  textAlign: "left",
                  marginBottom: 20,
                  padding: 5,
                }}
              >
                <p
                  style={{ marginLeft: 10, fontSize: 18, cursor: "pointer" }}
                  onClick={() =>
                    history.push({
                      pathname: `/profile/${student.nickname}`,
                    })
                  }
                >
                  <b>
                    {student.firstName} {student.lastName}
                  </b>{" "}
                  - <i style={{ fontSize: 12 }}>Aprovado</i>
                </p>
              </div>
            ))
          : null}

        {error ? (
          <p style={{ fontSize: 12, fontStyle: "italic", color: "red" }}>
            Ocorreu um erro! Tente novamente
          </p>
        ) : null}

        {solicitations.length > 0
          ? solicitations.map((solicitation) => (
              <div
                key={solicitation.studentID}
                style={{
                  backgroundColor: "RGB(255, 0, 0, 0.2)",
                  textAlign: "left",
                  marginBottom: 20,
                  padding: 5,
                }}
              >
                <GridContainer alignItems="alignItems">
                  <GridItem xs={12} sm={12} md={8}>
                    <p
                      style={{
                        marginLeft: 10,
                        fontSize: 18,
                        cursor: "pointer",
                      }}
                      onClick={() =>
                        history.push({
                          pathname: `/profile/${solicitation.nickname}`,
                        })
                      }
                    >
                      <b>
                        {solicitation.firstName} {solicitation.lastName}
                      </b>
                    </p>
                    {solicitation.image ? (
                      <a
                        href="#"
                        style={{ marginLeft: 10, fontSize: 16 }}
                        onClick={() =>
                          openModal(
                            <div>
                              <Lightbox
                                image={`http://localhost:3000/receipt/images/${solicitation.image}`}
                                title={`Comprovante de ${solicitation.firstName}`}
                                onClose={() => setModalReciptOpen(false)}
                              />
                            </div>,
                            "receipt"
                          )
                        }
                      >
                        Comprovante
                      </a>
                    ) : null}
                    {solicitation.text ? (
                      <a
                        href="#"
                        style={{ marginLeft: 10, fontSize: 16 }}
                        onClick={() =>
                          openModal(
                            <div>
                              <h3>Comentário de {solicitation.firstName}</h3>
                              <p style={{ fontSize: 16, fontStyle: "italic" }}>
                                {`"${solicitation.text}"`}
                              </p>
                            </div>
                          )
                        }
                      >
                        Comentário
                      </a>
                    ) : null}
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <Button
                      color="primary"
                      rel="noopener noreferrer"
                      onClick={() =>
                        handleConfirm(solicitation.id, solicitation.studentID)
                      }
                    >
                      Aprovar
                    </Button>
                  </GridItem>
                </GridContainer>
              </div>
            ))
          : null}
      </GridItem>
    </GridContainer>
  ) : (
    <CircularProgress style={{ margin: "50%" }} />
  );
}
