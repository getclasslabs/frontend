import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";

import styles from "assets/jss/material-kit-react/views/landingPageSections/workStyle.js";

const useStyles = makeStyles(styles);

export default function WorkSection() {
  const classes = useStyles();
  return (
    <div className={classes.section}>
      <GridContainer justify="center">
        <GridItem cs={12} sm={12} md={12} style={{ marginBottom: "70px" }}>
          <h2 className={classes.title}>Dúvidas Frequentes</h2>
          <div className={classes.root}>
            <ExpansionPanel>
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography className={classes.heading}>
                  As aulas são gratuitas?
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Typography>
                  O preço de cada curso é escolhido pelo próprio Professor,
                  podendo então ser gratuito ou não.
                </Typography>
              </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel>
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography className={classes.heading}>
                  Fiquei com dúvidas, como entro em contato com o Professor?
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Typography>
                  Na página do curso há um Mural de Comentários onde os alunos e
                  Professor podem se comunicar, respondendo dúvidas, comunicando
                  imprevistos, marcando aulas extras e o que mais precisar!
                </Typography>
              </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel>
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography className={classes.heading}>
                  Os cursos são para turmas ou para um único aluno?
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Typography>
                  O tipo de curso é escolhido pelo professor, tendo a
                  possibilidade de permitir quantos alunos ele quiser de se
                  matricular.
                </Typography>
              </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel>
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography className={classes.heading}>
                  Como faço para começar um curso?
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Typography>
                  Após encontrar o curso desejado, seja através da busca ou de
                  qualquer outra forma, é necessário fazer uma solicitação para
                  participar do curso e caso ele seja pago é necessário enviar
                  um comprovante de depósito. Após isso é só esperar o Professor
                  aprovar sua participação e você conseguirá acessar o Curso!
                </Typography>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </div>
        </GridItem>
      </GridContainer>
    </div>
  );
}
