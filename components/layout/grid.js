import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';

const styles = () => ({
  root: {
    flexGrow: 1,
  }
});

function GridContainer({ classes, children, full }) {
  return (
    <Grid container spacing={24} justify='center'>
      <Grid item xs={12} sm={full ? 12 : 10}>
        { children }
      </Grid>
    </Grid>
  );
}

GridContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.object.isRequired,
  full: PropTypes.bool,
};

export default withStyles(styles)(GridContainer);