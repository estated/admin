import React from 'react';
import PropTypes from "prop-types";
import { withStyles } from 'material-ui/styles';
import GridContainer from './grid'
import Top from './menu/top'
import withRoot from "./rootDocument";

const styles = theme => ({
  topBg: {
    height: '250px',
    backgroundColor: theme.palette.primary.main,
    width: '100%',
    marginBottom: '-160px'
  },
  withTitle: {
    marginBottom: '1rem'
  },
  content: {
    zIndex: 1,
  }
});

Layout.propTypes ={
  title: PropTypes.object,
};

function Layout({children, classes, title}) {

  return (
    <div>
      <Top />
      <div className={classes.topBg} />
      { title && (
        <GridContainer>
          { title }
        </GridContainer>
      )}
      <GridContainer>
        { children }
      </GridContainer>
    </div>
 )
}

export default withRoot(withStyles(styles, { withTheme: true})(Layout));