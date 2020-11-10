/* eslint-disable react/prop-types */
import React from "react";
// @material-ui/core components
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/CustomCard/Card.js";

import styles from "assets/jss/material-kit-react/views/landingPageSections/workStyle.js";

const useStyles = makeStyles(styles);

export default function Courses({ data }) {
  const history = useHistory();
  const classes = useStyles();
  return (
    <div className={classes.section}>
      <GridContainer justify="center">
        <GridItem cs={12} sm={12} md={12} style={{ marginBottom: "70px" }}>
          <h2 className={classes.title}>Meus Cursos</h2>

          <GridContainer>
            {data.map((course) => (
              <GridItem cs={12} sm={12} md={4} key={course.id}>
                <Card
                  image={`http://localhost:3000/course/images/${
                    course.image ? course.image : "default.png"
                  }`}
                  name={course.name}
                  description={course.description}
                  category={course.categoryName}
                  onClick={() => history.push(`/courses/detail/${course.id}`)}
                />
              </GridItem>
            ))}
          </GridContainer>
        </GridItem>
      </GridContainer>
    </div>
  );
}
