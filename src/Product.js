import React, { Component } from 'react';
import { Button, Checkbox, Header, Menu } from 'semantic-ui-react';
import Chart from './Chart';

class Product extends Component {
  state = {
    checkedCheckboxes: {
      'nfc': false,
      'dual-sim': true
    },
    chartData: [
      { x: 65, y: 75 },
      { x: 59, y: 49 },
      { x: 80, y: 90 },
      { x: 81, y: 29 },
      { x: 56, y: 36 },
      { x: 55, y: 25 },
      { x: 40, y: 18 },
    ]
  };

  handleChange = (e, { checked, value }) => {
    const nextCheckboxes = this.state.checkedCheckboxes;
    nextCheckboxes[value] = checked;
    this.setState({
      checkedCheckboxes: nextCheckboxes
    });
  };

  randomizeChartData = () => {
    this.setState({
      chartData: [
        { x: (Math.random() * 10000).toFixed(2), y: Math.random() },
        { x: (Math.random() * 10000).toFixed(2), y: Math.random() },
        { x: (Math.random() * 10000).toFixed(2), y: Math.random() },
        { x: (Math.random() * 10000).toFixed(2), y: Math.random() },
        { x: (Math.random() * 10000).toFixed(2), y: Math.random() },
        { x: (Math.random() * 10000).toFixed(2), y: Math.random() },
        { x: (Math.random() * 10000).toFixed(2), y: Math.random() }
      ]
    })
  };

  render() {
    return (
      <div className="product">
        <Menu vertical fixed='left' style={{
          position: 'fixed',
          top: 0,
          bottom: 0,
          left: 0,
          paddingBottom: '1em',
          overflowY: 'scroll',
        }}>
          <Menu.Item>
            <Header size='medium' textAlign='center'>Samsung Galaxy J3, Dual SIM (2016),
              zlatý</Header>
          </Menu.Item>

          <Menu.Item>
            <Checkbox
              toggle
              label='NFC'
              value='nfc'
              name='checkboxToggleGroup'
              checked={this.state.checkedCheckboxes['nfc']}
              onChange={this.handleChange}
            />
          </Menu.Item>

          <Menu.Item>
            <Checkbox
              toggle
              label='DualSim'
              value='dual-sim'
              name='checkboxToggleGroup'
              checked={this.state.checkedCheckboxes['dual-sim']}
              onChange={this.handleChange}
            />
          </Menu.Item>

          <Menu.Item>
            <Button content='Randomize chart data' onClick={this.randomizeChartData} />
          </Menu.Item>
        </Menu>

        <div className="product-content-container">
          <Chart data={this.state.chartData} />
        </div>
      </div>
    );
  }
}

export default Product;
