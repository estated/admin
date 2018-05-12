import withRoot from '../components/layout/rootDocument';
import Layout from '../components/layout/layout'
import { LIST_USERS } from '../components/api/schema'
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Button from 'material-ui/Button';
import AddIcon from '@material-ui/icons/Add';
import { Paper, Typography, Grid } from 'material-ui';
import SubMenu from '../components/layout/menu/subMenu';
import {withStyles} from "material-ui/styles/index";
import Checkbox from 'material-ui/Checkbox';

const formatDate = dateString => ((new Date(dateString)).toLocaleString());

const styles = theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    overflowX: 'auto',

  },
  table: {
    marginTop: theme.spacing.unit * 3,
  },
  addButton: {
    marginTop: '-64px',
  },
  error: {
    textAlign: 'center',
    padding: '30px'
  }
});

const clients = ({ classes }) => (
  <Layout>
    <LIST_USERS>
      {({loading, error, data, refetch}) => (
        <Paper>
          <SubMenu
            title='Clients'
            search={true}
            loading={loading}
            action={(e) => refetch({ query: e.target.value })}>
            <Button className={classes.addButton} size="medium" variant="fab" color="secondary" aria-label="add" href='/clients/create'>
              <AddIcon />
            </Button>
          </SubMenu>
          <Grid container className={classes.formContainer} spacing={24}>
            <Grid item xs={12} sm={12} >
              { error &&
                  <Typography className={classes.error} variant="title" component="h4">
                    Something went wrong my friend, retry or contact support:(
                  </Typography>
            }
              {!error &&
                <div className={classes.root}>
                  <Table className={classes.table}>
                    <TableHead>
                      <TableRow>
                        <TableCell><Checkbox /></TableCell>
                        <TableCell><h2>Name</h2></TableCell>
                        <TableCell><h2>Phone</h2></TableCell>
                        <TableCell><h2>DNI</h2></TableCell>
                        <TableCell><h2>Email</h2></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {(!loading && data) && data.users.map((user, key) => (
                        <TableRow key={key}>
                          <TableCell><Checkbox /></TableCell>
                          <TableCell>{user.name + ' ' + user.surname}</TableCell>
                          <TableCell>{user.phone}</TableCell>
                          <TableCell>{user.identityId}</TableCell>
                          <TableCell>{user.email}</TableCell>
                        </TableRow>
                      ))
                      }
                    </TableBody>
                  </Table>
                </div>
              }
            </Grid>
          </Grid>
        </Paper>
      )}
    </LIST_USERS>
  </Layout>
);

export default withRoot(withStyles(styles, { withTheme: true })(clients));