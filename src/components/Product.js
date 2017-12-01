import React, { Component } from 'react';
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
        <div className="product-content-container">
          <Chart data={this.state.chartData} />
        </div>
      </div>
    );
  }
}

export default Product;
