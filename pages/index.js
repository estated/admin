import React from 'react'
import GridContainer from '../components/layout/layout'
import AreaChart from '../components/biz/area/areaChart'
import { VictoryArea, VictoryChart, VictoryZoomContainer, VictoryBrushContainer, VictoryAxis } from 'victory';
import { Grid } from 'semantic-ui-react'

const fakeData = (days) => {
  const data = [];

  for (let index = 0; index <= days; index++) {
    let date =  new Date();
    date.setDate(date.getDate() + index)

    data.push({ 
      a: date, 
      b: Math.random() * 100
    })
  }

  return data;
}

export default () => (
    <GridContainer>
      <Grid columns={2}>
        <Grid.Row>
          <Grid.Column>
            <AreaChart />
          </Grid.Column>
          <Grid.Column>
            <VictoryChart 
              width={600} 
              height={470} 
              scale={{ x: "time" }}
              containerComponent={
                <VictoryZoomContainer
                  zoomDimension="x"
                />
              }
            >
              <VictoryArea
                interpolation={"cardinal"}
                data={fakeData(15)}
                x="a"
                y="b"
              />
            </VictoryChart>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </GridContainer>
)
