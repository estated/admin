import { Component } from 'react';
import Button from 'material-ui/Button';
import {withStyles} from "material-ui/styles/index";
import { LinearProgress } from 'material-ui/Progress';
import SubMenu from '../../components/layout/menu/subMenu';
import withRoot from '../../components/layout/rootDocument';
import Layout from '../../components/layout/layout'
import { CREATE_PROPERTY } from '../../components/api/schema'
import TextField from 'material-ui/TextField';
import Grid from 'material-ui/Grid';
import uuid from 'uuid/v4'
import { Paper, Select, InputLabel } from 'material-ui'
import List, { ListItem, ListItemText } from 'material-ui/List';
import Snackbar from 'material-ui/Snackbar';
import IconButton from 'material-ui/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { MenuItem } from 'material-ui/Menu';
import { FormControl } from 'material-ui/Form';
import Input, { InputAdornment } from 'material-ui/Input';
import Typography from "material-ui/Typography";
import SimpleMap from "../../components/map/simple";

const styles = () => ({
  root: {
    flexGrow: 1,
  },
  formContainer: {
    margin: 0,
    width: '100%',
  },
  formControl: {
    width: '100%',
    marginTop: '16px'
  },
  backButton: {
    right: '1rem',
    marginLeft: 'auto',
    marginTop: '-34px',
  },
});

class CreateProperty extends Component {

  state = {
    notify: false,
    uuid: '',
    title: '',
    description: '',
    type: 1,
    lat: 0,
    lon: 0,
    price: '',
    currency: 'EUR',
    ownerUuid: null,
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

  render() {
    const { classes } = this.props;

    return (
      <Layout title={<Typography variant="display1" color="inherit" >New Property</Typography>}>
        <CREATE_PROPERTY>
          {(create, { loading, error } ) => {
            return (
              <Paper>
                <Snackbar
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  open={this.state.notify}
                  autoHideDuration={600}
                  onClose={this.handleClose}
                  contentprops={{
                    'aria-describedby': 'message-id',
                  }}
                  message={<span id="message-id"> {this.state.title} created!</span>}
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
                <SubMenu title='New Property'>
                  <Button
                    className={classes.backButton}
                    size="medium"
                    variant="fab"
                    color="secondary"
                    aria-label="back"
                    href='/properties'
                  >
                    <CloseIcon />
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
                <form name="create-property">
                  <Grid container className={classes.formContainer} spacing={24}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        id="title"
                        autoComplete='title'
                        fullWidth
                        label="Title"
                        value={this.state.title}
                        onChange={this.handleChange('title')}
                        margin="normal"
                      />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="Type">Type</InputLabel>
                        <Select
                          value={this.state.type}
                          onChange={this.handleChange('type')}
                          inputProps={{
                            name: 'type',
                            id: 'Type',
                          }}
                        >
                          <MenuItem value={1}>
                            <em>Rent</em>
                          </MenuItem>
                          <MenuItem value={2}>Sale</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="price">Price</InputLabel>
                        <Input
                          id="price"
                          fullWidth
                          label="Price"
                          autoComplete='price'
                          value={this.state.price}
                          onChange={this.handleChange('price')}
                          startAdornment={<InputAdornment position="start">$</InputAdornment>}
                          margin="none"
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <TextField
                        id="description"
                        autoComplete='description'
                        fullWidth
                        multiline
                        rowsMax="4"
                        label="Description"
                        value={this.state.description}
                        onChange={this.handleChange('description')}
                        margin="normal"
                      />
                    </Grid>
                    <SimpleMap />
                    <Grid item xs={12} sm={12}>
                      <Button
                        variant="raised"
                        color="secondary"
                        aria-label="add"
                        onClick={(e) => {
                          e.preventDefault();
                          this.state.uuid = this.state.created = uuid();
                          this.state.createdAt = new Date();
                          create({ variables: this.state }).then(this.notify);
                        }}>
                        Create
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </Paper>
            )
          }}
        </CREATE_PROPERTY>
      </Layout>
    )
      ;
  }
}

export default withRoot(withStyles(styles, { withTheme: true })(CreateProperty));
