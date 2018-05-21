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
import Downshift from "downshift";

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  formContainer: {
    marginLeft: '1rem',
    marginRight: '1rem',
    width: '100%',
  },
  formControl: {
    width: '100%',
    marginTop: '16px'
  },
  ownerItemAutocomplete: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing.unit,
    display: 'contents'
  },
  ownerItemAutocompleteItem: {
    padding: theme.spacing.unit
  },
  backButton: {
    right: '1rem',
    marginLeft: 'auto',
    marginTop: '-34px',
  },
  submit: {
    marginTop: theme.spacing.unit * 2
  }
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
    street: null,
    city: 'Badalona',
    num: null,
    floor: null,
    door: null,
  };

  demoOwners() {
    return [
      {uuid:'asdad', name:"Paco de lucia"},
      {uuid:'234sfa', name:"Juan Antonio Carretero Jimenez"},
      {uuid:'2aw2qda', name:"Loly"},
    ]
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  setOwner = (owner) => {
    this.setState({
      ownerUuid: owner.uuid
    })
  };

  notify() {
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
                    vertical: 'top',
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
                  <Grid container className={classes.formContainer}>
                    <Grid container xs={12} sm={10} spacing={24}>
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
                      <Grid item xs={12} sm={8}>
                        <h2>Address</h2>
                      </Grid>
                      <Grid item xs={12} sm={8}>
                        <TextField
                          id="street"
                          autoComplete='street'
                          fullWidth
                          label="Street"
                          value={this.state.street}
                          onChange={this.handleChange('street')}
                          margin="normal"
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <TextField
                          id="city"
                          autoComplete='city'
                          fullWidth
                          label="City"
                          value={this.state.city}
                          onChange={this.handleChange('city')}
                          margin="normal"
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <TextField
                          id="num"
                          autoComplete='num'
                          fullWidth
                          label="Number"
                          value={this.state.num}
                          onChange={this.handleChange('num')}
                          margin="normal"
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <TextField
                          id="floor"
                          autoComplete='floor'
                          fullWidth
                          label="Floor"
                          value={this.state.floor}
                          onChange={this.handleChange('floor')}
                          margin="normal"
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <TextField
                          id="door"
                          autoComplete='door'
                          fullWidth
                          label="Door"
                          value={this.state.door}
                          onChange={this.handleChange('door')}
                          margin="normal"
                        />
                      </Grid>
                    </Grid>
                    <Grid container xs={12} sm={2}>
                      <Grid item xs={12} sm={12}>
                        <Downshift
                          itemToString={(user) => {
                            return user ? user.name : ''
                          }}
                          onChange={this.setOwner}
                        >
                          {({
                              getInputProps,
                              getItemProps,
                              isOpen,
                              inputValue,
                              selectedItem,
                              highlightedIndex,
                            }) => (
                            <div>
                              <TextField
                                style={{marginTop: '16px', marginBottom: '8px'}}
                                id="owner"
                                autoComplete='owner'
                                fullWidth
                                label="Owner"
                                value={this.state.ownerUuid}
                                {...getInputProps({placeholder: 'Owner ?'})}
                              />
                              {isOpen ? (
                                <Paper className={classes.ownerItemAutocomplete}>

                                  <Paper
                                    {...getItemProps({item: {uuid: null, name: ''}})}
                                    className={classes.ownerItemAutocompleteItem}
                                  >
                                    None
                                  </Paper>
                                  {this.demoOwners()
                                    .filter(
                                      user =>
                                        !inputValue ||
                                        user.name.toLowerCase().includes(inputValue.toLowerCase()),
                                    )
                                    .map((user, index) => (
                                      <Paper
                                        {...getItemProps({item: user})}
                                        key={user.uuid}
                                        className={classes.ownerItemAutocompleteItem}
                                        style={{
                                          backgroundColor:
                                            highlightedIndex === index ? 'gray' : 'white',
                                          fontWeight: selectedItem === user.uuid ? 'bold' : 'normal',
                                        }}
                                      >
                                        {user.name}
                                      </Paper>
                                    ))}
                                </Paper>
                              ) : null}
                            </div>
                          )}
                        </Downshift>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Button
                    className={classes.submit}
                    variant="raised"
                    color="primary"
                    aria-label="add"
                    fullWidth={true}
                    onClick={(e) => {
                      e.preventDefault();
                      this.state.uuid = this.state.created = uuid();
                      this.state.createdAt = new Date();
                      create({ variables: this.state }).then(this.notify);
                    }}>
                    Create
                  </Button>
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
