import withRoot from '../components/layout/rootDocument';
import Layout from '../components/layout/layout'
import { LIST_USERS } from '../components/api/schema'
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Button from 'material-ui/Button';
import AddIcon from '@material-ui/icons/Add';
import { LinearProgress, Paper, Typography, Grid } from 'material-ui';
import SubMenu from '../components/layout/menu/subMenu';
import {withStyles} from "material-ui/styles/index";

const formatDate = dateString => ((new Date(dateString)).toLocaleString());

const styles = () => ({
  root: {
    flexGrow: 1,
    width: '100%'
  },
  table: {
    display: 'block',
    width: '100%',
    overflowX: 'auto',
  },
  tableRow: {
    display: 'table',
    width: '100%'
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
            action={(e) => refetch({ query: e.target.value })}>
            <Button variant="raised" color="primary" aria-label="add" href='/clients/create'>
              <AddIcon />
            </Button>
          </SubMenu>
          <Grid container className={classes.formContainer} spacing={24}>
            <Grid item xs={12} sm={12}>
              { error &&
                <Paper elevation={4}>
                  <Typography variant="headline" component="h3">
                    Something went wrong mu friend, retry or contact support:(
                  </Typography>
                </Paper>
              }
              {!error &&
                <Table className={classes.table}>
                  <TableHead className={classes.tableRow}>
                    <TableRow>
                      <TableCell><h2>Name</h2></TableCell>
                      <TableCell><h2>Created At</h2></TableCell>
                      <TableCell><h2>DNI</h2></TableCell>
                      <TableCell><h2>Email</h2></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody className={classes.tableRow}>
                    {(!loading && data) && data.users.map((user, key) => (
                      <TableRow key={key}>
                        <TableCell>{user.name + ' ' + user.surname}</TableCell>
                        <TableCell>{formatDate(user.createdAt)}</TableCell>
                        <TableCell>{user.identityId}</TableCell>
                        <TableCell>{user.email}</TableCell>
                      </TableRow>
                    ))
                    }
                  </TableBody>
                </Table>
              }
              {loading &&
                <LinearProgress variant="query" color='secondary'/>
              }
            </Grid>
          </Grid>
        </Paper>
      )}
    </LIST_USERS>
  </Layout>
);

export default withRoot(withStyles(styles, { withTheme: true })(clients));