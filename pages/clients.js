import { Grid, Label, Button, Item, Form, Input, Segment } from 'semantic-ui-react'
import { Query } from 'react-apollo';
import GridContainer from '../components/layout/layout'
import ApiConnector from "../components/api/connector";
import { LIST_USERS } from "../components/api/schema";
import ListPreLoader from "../components/layout/loaders/list";

const formatDate = (dateString) => ((new Date(dateString)).toLocaleString());

const User = (user, key) => (
    <Item key={key}>
      <Item.Image size='tiny' src='https://react.semantic-ui.com/assets/images/avatar/large/jenny.jpg' />
      <Item.Content>
        <Item.Header as='a'>{ user.name + ' ' + user.surname }</Item.Header>
        <Item.Meta>
          <span>LOL</span>
        </Item.Meta>
        <Item.Extra>
          <Label icon='at' content={ user.email } />
          <Label icon='hashtag' content={ user.identityId } />
          <Label icon='calendar' content={ formatDate(user.createdAt) } />
        </Item.Extra>
      </Item.Content>
    </Item>
);

export default () => (
    <GridContainer>
      <ApiConnector>
        <Query query={LIST_USERS}>
          {({ loading, error, data, refetch }) => (
            <Grid>
              <Grid.Row columns={2}>
                <Grid.Column>
                  <h2>Clients</h2>
                </Grid.Column>
                <Grid.Column>
                  <Button floated='right' color='black'>
                    <a href={'/clients/create'}>New</a>
                  </Button>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row columns={'1'}>
                <Grid.Column>
                  <Form>
                    <Input
                      className='icon equal width fields'
                      icon='search'
                      placeholder='Search...'
                      loading={loading}
                      onChange={(e) => refetch({query: e.target.value})}
                    />
                  </Form>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row column={1}>
                <Grid.Column>
                  <Item.Group divided>
                    {error && <p>Error :(</p>}
                    {loading
                      ? <Grid.Column>
                        <ListPreLoader />
                      </Grid.Column>
                      :  data.users.map(User)
                    }
                  </Item.Group>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          )}
        </Query>
      </ApiConnector>
    </GridContainer>
)
