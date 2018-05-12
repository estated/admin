import React from 'react';
import PropTypes from 'prop-types';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Hidden from 'material-ui/Hidden';

import Toolbar from 'material-ui/Toolbar';
import List, { ListItem, ListItemIcon, ListItemText  } from 'material-ui/List';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {withStyles} from "material-ui/styles/index";
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import HomeIcon from '@material-ui/icons/Home';
import UserIcon from '@material-ui/icons/Face';
import classNames from 'classnames';
import Search from '../../input/search';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  appFrame: {
    height: '100%',
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    width: '100%',
  },
  appBar: {
    position: 'absolute',
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  topBg: {
    height: '120px',
    backgroundColor: theme.palette.primary.main,
    width: '100%',
    position: 'fixed',
  },
  title: {
    textDecoration: 'none',
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  'appBarShift-left': {
    marginLeft: drawerWidth,
  },
  'appBarShift-right': {
    marginRight: drawerWidth,
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20,
  },
  hide: {
    display: 'none',
  },
  drawerPaper: {
    position: 'relative',
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 16px',
    ...theme.mixins.toolbar,
    zIndex: 3
  },
  sideTitle: {
    flex: 'auto',
    textDecoration: 'none',
    color: '#FFF'
  },
  topSearch: {
    marginLeft: '10%',
    width: '66%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.palette.primary.light,
  },
  content: {
    flexGrow: 1,
    width: '100%',
    zIndex: 1,
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  'content-left': {
    marginLeft: -drawerWidth,
  },
  'content-right': {
    marginRight: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  'contentShift-left': {
    marginLeft: 0,
  },
  'contentShift-right': {
    marginRight: 0,
  },
});

class Menu extends React.Component {
  state = {
    open: false,
    anchor: 'left',
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes, theme } = this.props;
    const { anchor, open } = this.state;

    const drawer = (
      <Drawer
        variant="persistent"
        anchor={anchor}
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.topBg} />
        <div className={classes.drawerHeader}>
          <Typography className={classes.sideTitle} variant="title" color="inherit" noWrap component='a' href="/">BADACASA</Typography>
          <IconButton onClick={this.handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Search />
        <List component="nav">
          <ListItem
            button
            component="a"
            href="/clients"
          >
            <ListItemIcon>
              <UserIcon />
            </ListItemIcon>
            <ListItemText primary="Clients" />
          </ListItem>
          <ListItem
            button
            component="a"
            href="/properties">
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Properties" />
          </ListItem>
        </List>
      </Drawer>
    );

    let before = null;
    let after = null;

    if (anchor === 'left') {
      before = drawer;
    } else {
      after = drawer;
    }

    return (
      <div className={classes.appFrame}>
        <AppBar
          className={classNames(classes.appBar, {
            [classes.appBarShift]: open,
            [classes[`appBarShift-${anchor}`]]: open,
          })}
        >
          <Toolbar disableGutters={!open}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography className={classes.title} variant="title" color="inherit" noWrap component='a' href="/">
              Admin
            </Typography>
            <Hidden only={['xs']}>
              <div className={classes.topSearch}>
                <Search />
              </div>
            </Hidden>
          </Toolbar>
        </AppBar>
        {before}
        <div className={classes.topBg} />
        <main
          className={classNames(classes.content, classes[`content-${anchor}`], {
            [classes.contentShift]: open,
            [classes[`contentShift-${anchor}`]]: open,
          })}
        >
          <div className={classes.drawerHeader} />
          { this.props.children }
        </main>
        {after}
      </div>
    );
  }
}

Menu.propTypes = {
  theme: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  children: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Menu);