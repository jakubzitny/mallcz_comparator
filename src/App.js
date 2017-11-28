import React, { Component } from 'react';
import { Scatter } from 'react-chartjs-2';
import { Menu } from 'semantic-ui-react'

import './App.css';

// TODO add sidebar
// TODO show ProductName onHover in tooltip

const data = {
  labels: ['Scatter'],
  datasets: [
    {
      label: 'My First dataset',
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

class App extends Component {
  state = {};

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  getElementAtEvent = (elements) => {
    if (elements.length === 0) {
      return;
    }

    const dataSetIndex = elements[0]._datasetIndex;
    const elementIndex = elements[0]._index;
    const item = data.datasets[dataSetIndex].data[elementIndex];

    console.log('getElementAtEvent item:', item)
  };

  render() {
    const { activeItem } = this.state;

    return (
      <div className="App">
        <Menu vertical fixed='left' inverted style={{
          position: 'fixed',
          top: 0,
          bottom: 0,
          left: 0,
          width: 250,
          paddingBottom: '1em',
          // match menu background
          // prevents a white background when items are filtered out by search
          background: '#1B1C1D',
          overflowY: 'scroll',
        }}>
          <Menu.Item
            name='first'
            active={activeItem === 'first'}
            onClick={this.handleItemClick}
          >
            First
          </Menu.Item>

          <Menu.Item
            name='second'
            active={activeItem === 'second'}
            onClick={this.handleItemClick}
          >
            Second
          </Menu.Item>

          <Menu.Item
            name='third'
            active={activeItem === 'third'}
            onClick={this.handleItemClick}
          >
            Third
          </Menu.Item>
        </Menu>

        <div className={'chart-canvas'}>
          <Scatter
            data={data}
            getElementAtEvent={this.getElementAtEvent}
            legend={{ display: false }}
          />
        </div>
      </div>
    );
  }
}

export default App;
