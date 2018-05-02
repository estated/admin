import { Component } from 'react';
import Button from 'material-ui/Button';
import BackIcon from '@material-ui/icons/Backspace';
import {withStyles} from "material-ui/styles/index";
import { LinearProgress } from 'material-ui/Progress';
import SubMenu from '../../components/layout/menu/subMenu';
import withRoot from '../../components/layout/rootDocument';
import Layout from '../../components/layout/layout'
import { CREATE_USER } from '../../components/api/schema'
import TextField from 'material-ui/TextField';
import Grid from 'material-ui/Grid';
import AddIcon from '@material-ui/icons/Add';
import uuid from 'uuid/v4'
import { Paper } from 'material-ui'
import List, { ListItem, ListItemText } from 'material-ui/List';

const styles = () => ({
  root: {
    flexGrow: 1,
  },
  formContainer: {
    margin: 0,
    width: '100%',
  }
});

class CreateClient extends Component {

  state = {
    uuid: '',
    email: '',
    identityId: '',
    name: '',
    surname: ''
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <Layout>
        <CREATE_USER>
          {(createUser, { loading, error, data } ) => (
            <Paper>
              <SubMenu title='New Client'>
                <Button variant="raised" color="primary" aria-label="back" href='/clients'>
                  <BackIcon/>
                </Button>
              </SubMenu>
              <Grid container>
                {error &&
                  <List component="nav">
                    {error && error.networkError && error.networkError.result && error.networkError.result.errors.map(({message}) =>(
                      <ListItem button>
                        <ListItemText primary={message} />
                      </ListItem>
                    ))}
                  </List>
                }

                {data && data.createUser && <Paper>UserCreated</Paper>}
                {loading && <LinearProgress variant="query" color='secondary'/>}
              </Grid>
              <form name="create-client">
                <Grid container className={classes.formContainer} spacing={24}>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      id="name"
                      fullWidth
                      label="Name"
                      value={this.state.name}
                      onChange={this.handleChange('name')}
                      margin="normal"
                      />
                  </Grid>
                  <Grid item xs={12} sm={8}>
                    <TextField
                      id="surname"
                      fullWidth
                      label="Surname"
                      value={this.state.surname}
                      onChange={this.handleChange('surname')}
                      margin="normal"
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      id="identity"
                      fullWidth
                      label="DNI"
                      value={this.state.identityId}
                      onChange={this.handleChange('identityId')}
                      margin="normal"
                    />
                  </Grid>
                  <Grid item xs={12} sm={8}>
                    <TextField
                      id="email"
                      fullWidth
                      label="Email"
                      value={this.state.name}
                      onChange={this.handleChange('email')}
                      margin="normal"
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      id="name"
                      fullWidth
                      label="Name"
                      value={this.state.name}
                      onChange={this.handleChange('name')}
                      margin="normal"
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      id="name"
                      fullWidth
                      label="Name"
                      value={this.state.name}
                      onChange={this.handleChange('name')}
                      margin="normal"
                    />
                  </Grid>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Button
                    variant="raised"
                    color="primary"
                    aria-label="add"
                    onClick={(e) => {
                      e.preventDefault();
                      this.state.uuid = this.state.created = uuid();
                      createUser({ variables: this.state.client });
                      console.log(this.state);
                    }}>

                    <AddIcon />
                  </Button>
                </Grid>
              </form>
            </Paper>
          )}
        </CREATE_USER>
      </Layout>
    )
    ;
  }
}

export default withRoot(withStyles(styles, { withTheme: true })(CreateClient));
