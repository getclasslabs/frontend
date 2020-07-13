import { title } from "assets/jss/material-kit-react.js";

const teamStyle = {
  section: {
    paddingTop: "10px",
    textAlign: "center",
  },
  title: {
    ...title,
    marginBottom: "1rem",
    marginTop: "30px",
    minHeight: "32px",
    textDecoration: "none",
  },
  description: {
    color: "#999",
  },
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
  },
  gridList: {
    height: "100%",
    overflow: "hidden",
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)",
  },
};

export default teamStyle;
