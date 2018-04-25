import ApiCli from "./client";
import { ApolloProvider } from "react-apollo";

export default (props) => (
  <ApolloProvider client={ApiCli}>
    { props.children }
  </ApolloProvider>
);