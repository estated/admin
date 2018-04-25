import React, { Component } from 'react'
import uuid from 'uuid/v4'
import { Grid, Form, Button, Message } from 'semantic-ui-react'
import { Mutation } from "react-apollo";
import GridContainer from '../../components/layout/layout'
import {CREATE_USER} from "../../components/api/schema";
import waiting from '../../components/spinners/doingMessage'
import ApiConnector from "../../components/api/connector";

export default class CreateClient extends Component {

  state = {
    loading: false,
    client: {
      uuid: '',
      email: '',
      identity: '',
      name: '',
      surname: ''
    },
    created: '',
    errors: null
  };

  handleField = (e, {name, value}) => {
    const { client } = this.state;
    client[name] = value;
    this.setState(client);
  };

  render() {
    return (
      <GridContainer>
        <Grid>
          <Grid.Row columns={2}>
            <Grid.Column>
              <h2>Create Client</h2>
            </Grid.Column>
            <Grid.Column>
              <Button floated='right' color='black'>
                <a href={'/clients'}>Go to List</a>
              </Button>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <ApiConnector>
                <Mutation
                  mutation={CREATE_USER}
                >
                  {(createUser, { loading, error, data } ) => {
                    if (data !== undefined && data.createUser === 'ok') {
                      this.state.client = {};
                    }

                    return (
                      loading
                        ? waiting()
                        : <Form
                          warning={error !== undefined}
                          success={data !== undefined}
                          loading={this.state.loading}
                          onSubmit={(e) => {
                            e.preventDefault();
                            this.state.client.uuid = this.state.created = uuid();

                            console.log(this.state.client);

                            createUser({ variables: this.state.client });
                        }}>
                          { error && <Message warning>{ error.message.replace('GraphQL error:', '') }</Message> }
                          { data  && <Message info>Created: { this.state.created }</Message> }
                          <Form.Group widths='equal'>
                            <Form.Field>
                              <label>Name</label>
                              <Form.Input placeholder='Name' name='name' value={this.state.client.name} onChange={this.handleField} />
                            </Form.Field>
                            <Form.Field>
                              <label>Surname</label>
                              <Form.Input placeholder='Surname' name='surname' value={this.state.client.surname} onChange={this.handleField} />
                            </Form.Field>
                            <Form.Field>
                              <label>DNI</label>
                              <Form.Input placeholder='DNI' name='identity' value={this.state.client.identity} onChange={this.handleField} />
                            </Form.Field>
                          </Form.Group>
                          <Form.Field>
                            <label>Email</label>
                            <Form.Input placeholder='Email' name='email' value={this.state.client.email} onChange={this.handleField} />
                          </Form.Field>
                          <Button color='black' type='submit'>Submit</Button>
                        </Form>
                    )
                  }}
                </Mutation>
              </ApiConnector>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </GridContainer>
    )
  }
}
