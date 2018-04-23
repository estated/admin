import React from 'react'
import GridContainer from '../components/layout/layout'
import { Grid } from 'semantic-ui-react'
import ReactTable from 'react-table'
import { Query } from "react-apollo";
import gql from "graphql-tag";
import fetch from 'node-fetch';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from "react-apollo";
import ListPreLoader from "../components/layout/loaders/list";

const PROPERTIES_QUERY = gql`
{
  properties {
    uuid
    title
    type
    createdAt
    price {
      amount
      currency
    }
  }
}`;
const client = new ApolloClient({
  ssrMode: true,
  link: new HttpLink({
    uri: 'http://localhost:3001/graphql',
    fetch,
  }),
  cache: new InMemoryCache(),
});

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
    <h2>Properties</h2>
    <Grid>
      <Grid.Row>
        <Grid.Column>
          <ApolloProvider client={client}>
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
          </ApolloProvider>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </GridContainer>
)
