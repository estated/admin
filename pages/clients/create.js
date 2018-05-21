import React, { Component } from 'react';
import Button from 'material-ui/Button';
import BackIcon from '@material-ui/icons/Clear';
import {withStyles} from "material-ui/styles/index";
import { LinearProgress } from 'material-ui/Progress';
import SubMenu from '../../components/layout/menu/subMenu';
import withRoot from '../../components/layout/rootDocument';
import Layout from '../../components/layout/layout'
import { CREATE_USER } from '../../components/api/schema'
import TextField from 'material-ui/TextField';
import Grid from 'material-ui/Grid';
import uuid from 'uuid/v4'
import { Paper } from 'material-ui'
import List, { ListItem, ListItemText } from 'material-ui/List';
import Snackbar from 'material-ui/Snackbar';
import IconButton from 'material-ui/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from "material-ui/Typography";

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  formContainer: {
    margin: 0,
    width: '100%',
  },
  backButton: {
    right: theme.spacing.unit,
    marginLeft: 'auto',
    marginTop: '-34px',
  },
  submit: {
    marginTop: theme.spacing.unit * 2
  }
});

class CreateClient extends Component {

  state = {
    notify: false,
    uuid: '',
    email: '',
    identityId: '',
    name: '',
    surname: '',
    createdAt: null
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  notify = () => {
    this.setState({ notify: true });
  };

  closeNotify = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ notify: false });
  };

  redirect(){
    setTimeout(()=>{
      window.location = '/clients'
    }, 500);
  }

  render() {
    const { classes } = this.props;

    return (
      <Layout title={<Typography variant="display1" color="inherit" >New Client</Typography>}>
        <CREATE_USER>
          {(createUser, { loading, error, data } ) => {
            return (
              <Paper>
                <Snackbar
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={this.state.notify}
                  autoHideDuration={600}
                  onClose={this.handleClose}
                  contentprops={{
                    'aria-describedby': 'message-id',
                  }}
                  message={<h3 id="message-id"> {this.state.name} stored!</h3>}
                  action={[
                    <IconButton
                      key="close"
                      aria-label="Close"
                      color="inherit"
                      onClick={this.closeNotify}
                    >
                      <CloseIcon />
                    </IconButton>,
                  ]}
                />
                <SubMenu title='New Client'>
                  <Button
                    className={classes.backButton}
                    size="medium"
                    variant="fab"
                    color="secondary"
                    aria-label="back"
                    href='/clients'
                  >
                    <BackIcon />
                  </Button>
                </SubMenu>
                <Grid container>
                  {error &&
                  <List component="nav">
                    {error && (
                      <ListItem button>
                        <ListItemText primary={error.message} />
                      </ListItem>
                    )}
                  </List>
                  }
                  {loading && <LinearProgress variant="query" color='secondary'/>}
                </Grid>
                <form name="create-client">
                  <Grid container className={classes.formContainer} spacing={24}>
                    <Grid
                      item
                      xs={12}
                      sm={4}
                      md={4}
                    >
                      <TextField
                        id="name"
                        autoComplete='name'
                        fullWidth
                        label="Name"
                        value={this.state.name}
                        onChange={this.handleChange('name')}
                        margin="normal"
                      />
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sm={4}
                      md={4}
                    >
                      <TextField
                        id="surname"
                        autoComplete='surname'
                        fullWidth
                        label="Surname"
                        value={this.state.surname}
                        onChange={this.handleChange('surname')}
                        margin="normal"
                      />
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sm={4}
                      md={4}
                    >
                      <TextField
                        id="identity"
                        autoComplete='identity'
                        fullWidth
                        label="DNI"
                        value={this.state.identityId}
                        onChange={this.handleChange('identityId')}
                        margin="normal"
                      />
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sm={8}
                      md={4}
                    >
                      <TextField
                        id="email"
                        fullWidth
                        label="Email"
                        autoComplete='email'
                        value={this.state.email}
                        onChange={this.handleChange('email')}
                        margin="normal"
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        id="phone"
                        fullWidth
                        label="Phone"
                        autoComplete='phone'
                        value={this.state.phone}
                        onChange={this.handleChange('phone')}
                        margin="normal"
                      />
                    </Grid>

                    <Button
                      className={classes.submit}
                      variant="raised"
                      color="primary"
                      fullWidth={true}
                      aria-label="add"
                      onClick={(e) => {
                        e.preventDefault();
                        this.state.uuid = this.state.created = uuid();
                        this.state.createdAt = new Date();
                        createUser({ variables: this.state }).then(() =>{
                          this.notify();
                          this.redirect();
                        });
                      }}>
                      Create
                    </Button>
                  </Grid>
                </form>
              </Paper>
            )
          }}
        </CREATE_USER>
      </Layout>
    )
    ;
  }
}

export default withRoot(withStyles(styles, { withTheme: true })(CreateClient));
