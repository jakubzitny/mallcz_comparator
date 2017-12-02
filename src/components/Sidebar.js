import debounce from 'lodash/debounce'

import React, { Component } from 'react';
import { Header, Menu } from 'semantic-ui-react';
import { Slider } from 'antd';
import 'antd/lib/slider/style/css';

const SLIDER_OPTIONS = {
  'min': 0,
  'max': 1,
  // 'defaultValue': 0.5,
  'step': 0.01,
  'tipFormatter': null,
  'range': false,
};

class Sidebar extends Component {
  state = {
    slidersX: {
      '0': { id: 'Dotykový displej', value: 0.5 },
      '1': { id: 'Procesor', value: 0.5 },
      '2': { id: 'Frekvence', value: 0.5 },
      '3': { id: 'Podsvícená klávesnice', value: 0.5 },
      '4': { id: 'Čtečka otisků prstů', value: 0.5 }
    },
    sliders: this.props.params, // ParamUtils.formatParams(this.props.params)
  };

  componentWillMount() {
    this._handleParamChange = debounce((data) => {
      this.props.onParamChange(data)
    }, 1500)
  }

  onSliderChange = (sliderIndex, sliderValue, x) => {
    const sliders = Object.assign({}, this.state.sliders);
    sliders[sliderIndex].value = sliderValue;

    this.setState({ sliders });

    this._handleParamChange(sliders)
  };

  render() {
    return (
      <div className="menu">
        <Menu vertical fixed='left' style={{
          position: 'fixed',
          top: 0,
          bottom: 0,
          left: 0,
          paddingBottom: '1em',
          overflowY: 'scroll',
        }}>
          {Object.keys(this.state.sliders).map((index) =>
            <Menu.Item key={index}>
              <Header size='tiny' textAlign='center'>{this.state.sliders[index].id}</Header>
              <Slider
                value={this.state.sliders[index].value}
                onChange={this.onSliderChange.bind(this, index)}
                {...SLIDER_OPTIONS}
              />
            </Menu.Item>
          )}
        </Menu>
      </div>
    );
  }
}

export default Sidebar;