import React, { Component } from 'react';

import Product from './Product';
import Sidebar from './Sidebar';

class Container extends Component {
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
      <div className="container">
        <Sidebar />

        <div className="product-content-container">
          <Product
            data={ this.props.data }
            sliderValues={ this.props.sliderValues }
            onSliderChange={ this.props.onSliderChange }
          />
        </div>
      </div>
    );
  }
}

export default Container;
