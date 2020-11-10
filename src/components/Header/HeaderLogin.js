/* eslint-disable react/prop-types */
import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
// nodejs library that concatenates classes
import classNames from "classnames";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Hidden from "@material-ui/core/Hidden";
import Drawer from "@material-ui/core/Drawer";
// @material-ui/icons
import Search from "@material-ui/icons/Search";
import Menu from "@material-ui/icons/Menu";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import styles from "assets/jss/material-kit-react/components/headerStyle.js";

import logo from "assets/img/logo.png";
import logoWhite from "assets/img/logo-white.png";

const useStyles = makeStyles(styles);

export default function Header(props) {
  const classes = useStyles();
  const history = useHistory();
  const user = useSelector((state) => state.user.profile);

  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [white, setWhite] = React.useState(true);
  const [search, setSearch] = React.useState("");

  const navigateSearch = (event) => {
    event.preventDefault();
    history.push({
      pathname: "/results",
      state: { search: search },
    });
  };

  React.useEffect(() => {
    if (props.isView) {
      setWhite(false);
    }

    if (props.changeColorOnScroll) {
      window.addEventListener("scroll", headerColorChange);
    }
    return function cleanup() {
      if (props.changeColorOnScroll) {
        window.removeEventListener("scroll", headerColorChange);
      }
    };
  });

  React.useEffect(() => {
    if (props.search) {
      setSearch(props.search);
    }
  }, [props]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const headerColorChange = () => {
    const { color, changeColorOnScroll } = props;
    const windowsScrollTop = window.pageYOffset;
    if (windowsScrollTop > changeColorOnScroll.height) {
      document.body
        .getElementsByTagName("header")[0]
        .classList.remove(classes[color]);
      document.body
        .getElementsByTagName("header")[0]
        .classList.add(classes[changeColorOnScroll.color]);
      setWhite(false);
    } else {
      document.body
        .getElementsByTagName("header")[0]
        .classList.add(classes[color]);
      document.body
        .getElementsByTagName("header")[0]
        .classList.remove(classes[changeColorOnScroll.color]);
      setWhite(true);
    }
  };
  const { color, rightLinks, leftLinks, fixed, absolute } = props;
  const appBarClasses = classNames({
    [classes.appBar]: true,
    [classes[color]]: color,
    [classes.absolute]: absolute,
    [classes.fixed]: fixed,
  });
  return (
    <AppBar className={appBarClasses}>
      <Toolbar
        className={classes.container}
        style={{
          marginRight: 15,
          marginLeft: 15,
          width: "100%",
        }}
      >
        <div onClick={() => history.push("/home")}>
          <img
            src={white ? logoWhite : logo}
            style={{
              maxHeight: "70px",
              borderRadius: 10,
              cursor: "pointer",
            }}
          />
        </div>

        {!white && user ? (
          <GridContainer
            alignItems="alignItems"
            style={{ paddingTop: "10px", width: "50%" }}
          >
            <form onSubmit={navigateSearch} style={{ width: "100%" }}>
              <GridContainer
                alignItems="alignItems"
                style={{ paddingTop: "10px", width: "100%" }}
              >
                <GridItem xs={6} sm={6} md={10}>
                  <CustomInput
                    labelText="Buscar..."
                    id="search"
                    value={search}
                    onChange={(event) => {
                      setSearch(event.target.value);
                    }}
                    formControlProps={{
                      fullWidth: true,
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
                    onClick={navigateSearch}
                  >
                    <Search />
                  </Button>
                </GridItem>
              </GridContainer>
            </form>
          </GridContainer>
        ) : null}

        <Hidden smDown implementation="css">
          {rightLinks}
        </Hidden>
        <Hidden mdUp>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
          >
            <Menu />
          </IconButton>
        </Hidden>
      </Toolbar>
      <Hidden mdUp implementation="js">
        <Drawer
          variant="temporary"
          anchor={"right"}
          open={mobileOpen}
          classes={{
            paper: classes.drawerPaper,
          }}
          onClose={handleDrawerToggle}
        >
          <div className={classes.appResponsive}>
            {leftLinks}
            {rightLinks}
          </div>
        </Drawer>
      </Hidden>
    </AppBar>
  );
}

Header.defaultProp = {
  color: "white",
};

Header.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "info",
    "success",
    "warning",
    "danger",
    "transparent",
    "white",
    "rose",
    "dark",
  ]),
  rightLinks: PropTypes.node,
  leftLinks: PropTypes.node,
  brand: PropTypes.string,
  fixed: PropTypes.bool,
  absolute: PropTypes.bool,
  isView: PropTypes.bool,
  // this will cause the sidebar to change the color from
  // props.color (see above) to changeColorOnScroll.color
  // when the window.pageYOffset is heigher or equal to
  // changeColorOnScroll.height and then when it is smaller than
  // changeColorOnScroll.height change it back to
  // props.color (see above)
  changeColorOnScroll: PropTypes.shape({
    height: PropTypes.number.isRequired,
    color: PropTypes.oneOf([
      "primary",
      "info",
      "success",
      "warning",
      "danger",
      "transparent",
      "white",
      "rose",
      "dark",
    ]).isRequired,
  }),
};
