import gql from "graphql-tag";

export const CREATE_USER = gql`
mutation createUser($uuid: String!, $email: String!, $name: String!, $surname: String!, $identity: String!) {
    createUser(
      uuid: $uuid, 
      email: $email,
      name: $name,
      surname: $surname,
      identityId: $identity
    )
}
`;

export const LIST_USERS = gql`
query users($query: String) {
  users(query: $query) {
    uuid
    email
    name
    surname
    identityId
    createdAt
  }
}
`;

export const PROPERTIES_QUERY = gql`
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
