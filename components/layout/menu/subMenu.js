import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { AppBar, Toolbar, LinearProgress, Typography } from 'material-ui';
import Search from '../../input/search';

const styles = () => ({
  root: {
    flexGrow: 1,
    boxShadow: 'none'
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  loading: {
    marginTop: '-9px',
  },
  search: {
    width: '100%'
  }
});

function ButtonAppBar(props) {
  const { classes } = props;
  return (
    <AppBar className={classes.root} position="static" color='secondary' >
      {props.children}
      {props.search &&
        <Toolbar className={classes.search}>
          <Search className={classes.search} action={props.action} />
        </Toolbar>
      }
      {props.loading &&
      <LinearProgress className={classes.loading} variant="query" color='primary'/>
      }
    </AppBar>
  );
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
  search: PropTypes.bool,
  action: PropTypes.func,
  loading: PropTypes.bool,
};

export default withStyles(styles, { withTheme: true })(ButtonAppBar);