import React from 'react'
import { Grid } from 'semantic-ui-react'
import ReactTable from 'react-table'
import GridContainer from '../components/layout/layout'

const data = [{
    name: 'Tanner Linsley',
    age: 26,
    friend: {
      name: 'Jason Maurer',
      age: 23,
    }
  },{
    name: 'Tanner 2',
    age: 23,
    friend: {
      name: 'Jason 2',
      age: 27,
    }
  },{
    name: 'Tanner 2',
    age: 23,
    friend: {
      name: 'Jason 2',
      age: 27,
    }
  },{
    name: 'Tanner 2',
    age: 23,
    friend: {
      name: 'Jason 2',
      age: 27,
    }
  },{
    name: 'Tanner 2',
    age: 23,
    friend: {
      name: 'Jason 2',
      age: 27,
    }
  },{
    name: 'Tanner 2',
    age: 23,
    friend: {
      name: 'Jason 2',
      age: 27,
    }
  },{
    name: 'Tanner 2',
    age: 23,
    friend: {
      name: 'Jason 2',
      age: 27,
    }
  },
];

const columns = [
    {
        Header: 'Name',
        accessor: 'name' // String-based value accessors!
    }, 
    {
        Header: 'Age',
        accessor: 'age',
        Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
    }, 
    {
        id: 'friendName', // Required because our accessor is not a string
        Header: 'Friend Name',
        accessor: d => d.friend.name // Custom value accessors!
    }, 
    {
        Header: props => <span>Friend Age</span>, // Custom header components!
        accessor: 'friend.age'
    }
];

export default () => (
    <GridContainer>
      <h2>Clients</h2>
      <Grid>
        <Grid.Row>
          <Grid.Column>
            <ReactTable
                data={data}
                columns={columns}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </GridContainer>
)
