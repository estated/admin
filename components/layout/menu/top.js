import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import UserIcon from '@material-ui/icons/Face';
import RentIcon from '@material-ui/icons/LocationCity';
import WorkIcon from '@material-ui/icons/Work';
import List, { ListItem, ListItemIcon, ListItemText  } from 'material-ui/List';
import LeftNav from "../leftNav"

const styles = () => ({
  root: {
    flexGrow: 1,
    height: '100%',
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    width: '100%',
  },
  flex: {
    flex: 1,
  }
});

class TopMenu extends Component {
  state = {
    open: false
  };

  open() {
    this.setState({
      open: true,
    });
  };

  close = () => () =>  {
    this.setState({
      open: false,
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="fixed" color='primary'>
          <Toolbar>
            <IconButton
              className={classes.menuButton}
              color="inherit"
              aria-label="Menu"
              onClick={()=>{
                this.open();
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="title" color="inherit" className={classes.flex}>
              Admin
            </Typography>
          </Toolbar>
        </AppBar>
        <LeftNav open={this.state.open} state={this.close} >
          <AppBar position="static" color='primary'>
            <Toolbar>
              <Typography variant="title" color="inherit" className={classes.flex}>
                Menu
              </Typography>
            </Toolbar>
          </AppBar>
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
            <ListItem
              button
              component="a"
              href="/rent">
              <ListItemIcon>
                <RentIcon />
              </ListItemIcon>
              <ListItemText primary="Rent" />
            </ListItem>
            <ListItem
              button
              component="a"
              href="/invoices">
              <ListItemIcon>
                <WorkIcon />
              </ListItemIcon>
              <ListItemText primary="Invoices" />
            </ListItem>
          </List>
        </LeftNav>
      </div>
    );
  }
}

TopMenu.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(TopMenu);