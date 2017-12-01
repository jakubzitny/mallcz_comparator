import React, { Component } from 'react';
import { Checkbox, Header, Menu } from 'semantic-ui-react';
import { Scatter } from 'react-chartjs-2';

const data = {
  labels: ['Scatter'],
  datasets: [
    {
      label: 'My First dataSet',
      fill: false,
      backgroundColor: 'rgba(75,192,192,0.4)',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      // pointBorderWidth: 1,
      // pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      // pointHoverBorderWidth: 2,
      // pointRadius: 1,
      // pointHitRadius: 10,
      data: [
        { x: 65, y: 75 },
        { x: 59, y: 49 },
        { x: 80, y: 90 },
        { x: 81, y: 29 },
        { x: 56, y: 36 },
        { x: 55, y: 25 },
        { x: 40, y: 18 },
      ]
    }
  ]
};

class Product extends Component {
  state = {
    checkedCheckboxes: {
      'nfc': false,
      'dual-sim': true
    }
  };

  handleChange = (e, { checked, value }) => {
    const nextCheckboxes = this.state.checkedCheckboxes;
    nextCheckboxes[value] = checked;
    this.setState({
      checkedCheckboxes: nextCheckboxes
    });
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
        </Menu>

        <div className="product-content-container">
          <div className="chart-canvas">
            <Scatter
              data={data}
              getElementAtEvent={this.getElementAtEvent}
              legend={{ display: false }}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Product;
