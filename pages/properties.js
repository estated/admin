import withRoot from '../components/layout/rootDocument';
import Layout from '../components/layout/layout'
import { LIST_PROPERTIES } from '../components/api/schema'
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Button from 'material-ui/Button';
import AddIcon from '@material-ui/icons/Add';
import { LinearProgress, Typography, Paper } from 'material-ui';
import SubMenu from '../components/layout/menu/subMenu';
import {withStyles} from "material-ui/styles/index";

const formatDate = (dateString) => ((new Date(dateString)).toLocaleString());


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
    right: '1rem',
    marginLeft: 'auto',
    marginTop: '-34px',
  },
  error: {
    textAlign: 'center',
    padding: '30px'
  }
});

const properties = ({ classes }) => (
  <Layout title={<Typography variant="display1" color="inherit" >Properties</Typography>}>
    <LIST_PROPERTIES>
      {({loading, error, data, refetch}) => (
        <Paper>
          <SubMenu
            title='Properties'
            search={true}
            loading={loading}
            action={(e) => refetch({ query: e.target.value })}>
            <Button className={classes.addButton} size="medium" variant="fab" color="secondary" aria-label="add" href='/properties/create'>
              <AddIcon />
            </Button>
          </SubMenu>
          {error && <p>Error :(</p>}
          <Table className={classes.table}>
            <TableHead className={classes.tableRow}>
              <TableRow>
                <TableCell><h2>ID</h2></TableCell>
                <TableCell><h2>Title</h2></TableCell>
                <TableCell><h2>Created At</h2></TableCell>
                <TableCell><h2>Price</h2></TableCell>
              </TableRow>
            </TableHead>
            <TableBody className={classes.tableRow}>
              {(!loading && data) && data.properties.map((properties, key)=> (
                <TableRow key={key}>
                  <TableCell>{ properties.uuid }</TableCell>
                  <TableCell>{ properties.title }</TableCell>
                  <TableCell >{ formatDate(properties.createdAt) }</TableCell>
                  <TableCell>{ properties.price.amount + ' ' + properties.price.currency }</TableCell>
                </TableRow>
              ))
              }
            </TableBody>
          </Table>
          {loading && <LinearProgress variant="query" color='secondary'/>}

        </Paper>
      )}
    </LIST_PROPERTIES>
  </Layout>
);

export default withRoot(withStyles(styles, { withTheme: true })(properties));