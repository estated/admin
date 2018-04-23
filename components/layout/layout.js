import { Grid, Container } from 'semantic-ui-react'
import MenuHeader from "./menu/menu";

const GridContainer = props => (
  <div>
    <MenuHeader />
    <Container style={{ marginTop: '7em' }}>
      <Grid.Row>
        { props.children }
      </Grid.Row>
    </Container>
  </div>
)

export default GridContainer