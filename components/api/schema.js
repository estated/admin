import gql from "graphql-tag";
import { Query, Mutation } from 'react-apollo';
import ApiConnector from '../api/connector'

const MapQuery = (query) => (props) => {
  const { queryParams } = props;
  return (
    <ApiConnector>
      <Query
        query={query}
        variables={queryParams}
      >
        {result => props.children(result)}
      </Query>
    </ApiConnector>
  )
};

const Mutate = (mutation) => (props) => {
  const { mutationParams } = props;
  return (
    <ApiConnector>
      <Mutation
        mutation={mutation}
        variables={mutationParams}
      >
        {(action, result) => props.children(action, result)}
      </Mutation>
    </ApiConnector>
  )
};


export const CREATE_USER = Mutate(
  gql`
  mutation createUser($uuid: String!, $email: String!, $name: String!, $surname: String!, $identityId: String!) {
    createUser(
      uuid: $uuid, 
      email: $email,
      name: $name,
      surname: $surname,
      identityId: $identityId
    )
  }`
);

export const LIST_USERS = MapQuery(
  gql`
  query users($query: String) {
    users(query: $query) {
      uuid
      email
      name
      surname
      identityId
      createdAt
    }
  }`
);

export const LIST_PROPERTIES = MapQuery(
  gql`
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
  }`
);

