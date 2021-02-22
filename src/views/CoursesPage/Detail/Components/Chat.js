/* eslint-disable react/prop-types */
import React, { Component } from "react";
import { animateScroll } from "react-scroll";

import { format } from "date-fns";
import pt from "date-fns/locale/pt";

import SentimentVeryDissatisfiedIcon from "@material-ui/icons/SentimentVeryDissatisfied";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import CustomInput from "components/CustomInput/CustomInput.js";

const SOCKET_SERVER_URL = "ws://localhost:8082/connect/";

export default class Chat extends Component {
  state = {
    messages: [],
    newMessage: "",
  };

  ws = new WebSocket(SOCKET_SERVER_URL + this.props.roomId);

  componentDidMount() {
    this.scrollToBottom();

    this.ws.onopen = () => {
      // on connecting, do nothing but log it to the console
      console.log("connected");
      this.scrollToBottom();
    };

    this.ws.onmessage = (evt) => {
      // on receiving a message, add it to the list of messages
      const message = JSON.parse(evt.data);

      if (message.kind === 1) {
        const newMessages = this.state.messages.filter((mes) => {
          if (mes.messageID !== message.messageID) {
            return mes;
          }
        });
        this.setState({
          messages: newMessages,
        });
      } else {
        this.addMessage(message);
      }
    };

    this.ws.onclose = () => {
      console.log("disconnected");
      // automatically try to reconnect on connection loss
      this.setState({
        ws: new WebSocket(SOCKET_SERVER_URL + this.props.roomId),
      });
    };
  }

  addMessage = (message) => {
    this.setState((state) => ({ messages: [...state.messages, message] }));
    this.scrollToBottom();
  };

  submitMessage = (messageString) => {
    // on submitting the ChatInput form, send the message, add it to the list and reset the input
    if (messageString !== "") {
      const message = {
        userIdentifier: `${this.props.userId}`,
        message: messageString,
        kind: 0,
      };
      this.ws.send(JSON.stringify(message));
      this.setState({ newMessage: "" });
    }
  };

  deleteMessage = (messageId) => {
    // on submitting the ChatInput form, send the message, add it to the list and reset the input
    const message = {
      messageID: messageId,
      kind: 1,
    };
    this.ws.send(JSON.stringify(message));
  };

  scrollToBottom = () => {
    animateScroll.scrollToBottom({
      containerId: "messages",
    });
  };

  render() {
    const navigateSearch = (event) => {
      event.preventDefault();
      this.submitMessage(this.state.newMessage);
    };

    return (
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={this.props.isLong ? 12 : 8}>
          <h2
            style={{
              color: "#3C4858",
              margin: "1.75rem 0 0.875rem",
              textDecoration: "none",
              fontWeight: "700",
              fontFamily: `"Roboto Slab", "Times New Roman", serif`,
              marginBottom: "1rem",
              marginTop: "30px",
              minHeight: "32px",
            }}
          >
            Mural de Comentários
          </h2>

          <div
            style={{
              height: 400,
              overflow: "scroll",
              wordWrap: "break-word",
            }}
            id="messages"
          >
            {this.state.messages.length > 0 ? (
              this.state.messages.map((message, index) => {
                var t = new Date(parseInt(message.createdAt, 10) * 1000);
                var formatted = format(t, "dd'/'MM'/'yyyy' - 'HH':'m", {
                  locale: pt,
                });

                let student = this.props.students.filter((st) => {
                  return st.id === parseInt(message.userIdentifier, 10);
                });
                if (student.length > 0) {
                  student = student[0];
                } else {
                  student = null;
                }

                return (
                  <div
                    style={{
                      backgroundColor:
                        parseInt(message.userIdentifier, 10) !==
                        this.props.userId
                          ? "RGB(0, 0, 0, 0.1)"
                          : "RGB(1, 0, 255, 0.1)",
                      borderRadius: 4,
                      textAlign: "left",
                      marginBottom: 20,
                      padding: 5,
                      maxWidth: "80%",
                      marginLeft:
                        parseInt(message.userIdentifier, 10) !==
                        this.props.userId
                          ? null
                          : "15%",
                    }}
                    key={index}
                  >
                    <div
                      style={{
                        flex: 1,
                        flexDirection: "row",
                        display: "flex",
                        justifyContent: "space-between",
                        width: "100%",
                      }}
                    >
                      <span style={{ marginLeft: 10, fontSize: 18 }}>
                        {student ? (
                          <b
                            style={{
                              cursor:
                                parseInt(message.userIdentifier, 10) !==
                                this.props.userId
                                  ? "pointer"
                                  : "",
                            }}
                            onClick={
                              parseInt(message.userIdentifier, 10) !==
                              this.props.userId
                                ? () =>
                                    this.props.history.push(
                                      `/profile/${student.nickname}`
                                    )
                                : null
                            }
                          >
                            {`${student.firstName} ${student.lastName}`}
                          </b>
                        ) : this.props.teacher.id ===
                          parseInt(message.userIdentifier, 10) ? (
                          <b
                            style={{
                              cursor:
                                parseInt(message.userIdentifier, 10) !==
                                this.props.userId
                                  ? "pointer"
                                  : "",
                            }}
                            onClick={
                              parseInt(message.userIdentifier, 10) !==
                              this.props.userId
                                ? () =>
                                    this.props.history.push(
                                      `/profile/${this.props.teacher.nickname}`
                                    )
                                : null
                            }
                          >
                            Professor
                          </b>
                        ) : (
                          <b>Aluno</b>
                        )}{" "}
                        - <i style={{ fontSize: 12 }}>{formatted}</i>
                      </span>

                      {parseInt(message.userIdentifier, 10) ===
                      this.props.userId ? (
                        <DeleteOutlineIcon
                          style={{
                            fontSize: 20,
                            color: "red",
                            marginLeft: 10,
                            cursor: "pointer",
                          }}
                          onClick={() => this.deleteMessage(message.messageID)}
                        />
                      ) : null}
                    </div>

                    <p style={{ marginLeft: 10, fontSize: 16 }}>
                      {message.message}
                    </p>
                  </div>
                );
              })
            ) : (
              <GridItem xs={12} sm={12} md={12} style={{ marginTop: 150 }}>
                <h4
                  style={{
                    color: "#3C4858",
                    textAlign: "center",
                  }}
                >
                  Ainda não há mensagens...
                </h4>
                <div style={{ flex: 1, margin: "0 45%" }}>
                  <SentimentVeryDissatisfiedIcon
                    style={{ fontSize: 40, color: "#3C4858" }}
                  />
                </div>
              </GridItem>
            )}
          </div>
          <form onSubmit={navigateSearch} style={{ width: "100%" }}>
            <GridContainer alignItems="alignItems">
              <GridItem xs={10} sm={10} md={this.props.isLong ? 8 : 10}>
                <CustomInput
                  labelText="Digite seu comentário"
                  id="search"
                  value={this.state.newMessage}
                  onChange={(e) =>
                    this.setState({ newMessage: e.target.value })
                  }
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    autoComplete: "off",
                  }}
                  style={{
                    paddingLeft: "10px",
                  }}
                />
              </GridItem>
              <GridItem xs={2} sm={2} md={2}>
                <Button
                  color="primary"
                  size="lg"
                  rel="noopener noreferrer"
                  onClick={() => this.submitMessage(this.state.newMessage)}
                >
                  Publicar
                </Button>
              </GridItem>
            </GridContainer>
          </form>
        </GridItem>
      </GridContainer>
    );
  }
}
