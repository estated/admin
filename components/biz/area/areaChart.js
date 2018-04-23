import React, { Component } from 'react'
import { VictoryChart, VictoryStack, VictoryArea, VictoryTheme } from 'victory'

class AreaChart extends Component {
  constructor(props) {
    super(props);
    this.state = { data: this.getData() };
  }

  getData() {
    const data = [];

    for (let index = 0; index <= 7; index++) {

        data.push([
            { x: 1, y: Math.random() * 10 },
            { x: 2, y: Math.random() * 10 },
            { x: 3, y: Math.random() * 10 },
            { x: 4, y: Math.random() * 10 },
            { x: 5, y: Math.random() * 10 }
        ])
    }

    return data; 
 }

  render() {
    return (
      <VictoryChart
        theme={VictoryTheme.material}
        animate={{ duration: 1000 }}
      >
        <VictoryStack
          colorScale={"blue"}
        >
          {this.state.data.map((data, i) => {
            return (
              <VictoryArea
                key={i}
                data={data}
                interpolation={"cardinal"}
              />
            );
          })}
        </VictoryStack>
      </VictoryChart>
    );
  }
}

export default AreaChart