import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { AppBar, Toolbar, LinearProgress, Typography } from 'material-ui';
import Search from '../../input/search';

const styles = theme => ({
  root: {
    flexGrow: 1,
    color: theme.palette.secondary.main
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  loading: {
    marginTop: '-11px',
  },
  search: {
    width: '100%'
  }
});

function ButtonAppBar(props) {
  const { classes } = props;
  return (
    <AppBar className={classes.root} position="static" color='primary' >
      <Toolbar>
        {props.title && <Typography variant="title" color="inherit" className={classes.flex}>{props.title}</Typography>}
        {props.children}
      </Toolbar>
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
  title: PropTypes.string,
  search: PropTypes.bool,
  action: PropTypes.func,
  loading: PropTypes.bool,
};

export default withStyles(styles, { withTheme: true })(ButtonAppBar);