import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Search from '../../input/search';

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  search: {
    width: '100%'
  }
};

function ButtonAppBar(props) {
  const { classes } = props;
  return (
    <AppBar className={classes.root} position="static" color='secondary' >
      <Toolbar>
        {props.title && <Typography variant="title" color="inherit" className={classes.flex}>{props.title}</Typography>}
        {props.children}
      </Toolbar>
      {props.search &&
        <Toolbar className={classes.search}>
          <Search className={classes.search} action={props.action} />
        </Toolbar>
      }
    </AppBar>
  );
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string,
  search: PropTypes.bool,
  action: PropTypes.func,
};

export default withStyles(styles)(ButtonAppBar);