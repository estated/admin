import React from 'react';
import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';


function GridContainer({ classes, children, full }) {
  return (
    <Grid container justify='center'>
      <Grid item xs={12} sm={full ? 12 : 11}>
        { children }
      </Grid>
    </Grid>
  );
}

GridContainer.propTypes = {
  children: PropTypes.object.isRequired,
  full: PropTypes.bool,
};

export default GridContainer;