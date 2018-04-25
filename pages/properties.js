import React from 'react'
import Link from 'next/link'
import GridContainer from '../components/layout/layout'
import { Grid, Button } from 'semantic-ui-react'
import ReactTable from 'react-table'
import { Query } from "react-apollo";
import ListPreLoader from "../components/layout/loaders/list";
import {PROPERTIES_QUERY} from "../components/api/schema";
import ApiConnector from "../components/api/connector";

const columns = [
  {
    Header: 'Id',
    accessor: 'uuid'
  },
  {
    Header: 'Title',
    accessor: 'title'
  },
  {
    Header: 'Created At',
    accessor: 'createdAt'
  },
  {
    id: 'price',
    Header: 'Price',
    accessor: d => d.price.amount  + d.price.currency
  },
  {
    id: 'type',
    Header: props => <span>Type</span>,
    accessor: d => (d.type === 1) ? 'rent' : 'sale'
  }
];

export default () => (
  <GridContainer>
    <Grid>
      <Grid.Row columns={2}>
        <Grid.Column>
          <h2>Properties</h2>
        </Grid.Column>
        <Grid.Column>
          <Button floated='right' color='black'>
            <Link prefetch href={'/properties/create'}>
              <a>new</a>
            </Link>
          </Button>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <ApiConnector>
            <Query
              asyncMode
              ssr={true}
              query={PROPERTIES_QUERY}
            >
              {({ loading, error, data }) => {
                  if (loading) return <ListPreLoader />;
                  if (error) return <p>Error :(</p>;

                  return (
                    <ReactTable
                      data={data.properties}
                      columns={columns}
                    />
                  );
                }}
            </Query>
          </ApiConnector>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </GridContainer>
)
