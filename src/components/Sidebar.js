import debounce from 'lodash/debounce'

import React, { Component } from 'react';
import { Button, Header, Menu } from 'semantic-ui-react';
import { Slider } from 'antd';
import 'antd/lib/slider/style/css';

const SLIDER_OPTIONS = {
  'min': 0,
  'max': 1,
  'step': 0.01,
  'tipFormatter': null,
  'range': false,
};

class Sidebar extends Component {
  state = {
    sliders: this.props.params,
    timestamp: null,
    showShowMoreButton: true
  };

  componentWillMount() {
    this._handleParamChange = debounce((data) => {
      this.props.onParamChange(data)
    }, 1500)
  }

  onSliderChange = (sliderIndex, sliderValue, x) => {
    const sliders = Object.assign({}, this.state.sliders);
    sliders[sliderIndex].value = sliderValue;

    this.setState({
      sliders,
      timestamp: Date.now(),
    });

    // this._handleParamChange(sliders)
    setTimeout(() => {
      const now = Date.now()
      if (now - this.state.timestamp > 200) {
        console.log('calling S', now - this.state.timestamp)
        this.setState({
          timestamp: null,
        });
        this.props.onParamChange(sliders)
      }
    }, 200)
  };

  onShowMoreParametersButtonClick() {
    console.log('clicked');
    this.setState({ showShowMoreButton: false });
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
          <Menu.Item>
            <Header size='medium' textAlign='center'>Moje preference</Header>
          </Menu.Item>
          {Object.keys(this.state.sliders)
            .filter((key) => this.state.showShowMoreButton ? key < 5 : key)
            .map((index) =>
              <Menu.Item key={index}>
                <Header size='tiny' textAlign='center'>{this.state.sliders[index].id}</Header>
                <Slider
                  value={this.state.sliders[index].value}
                  onChange={this.onSliderChange.bind(this, index)}
                  {...SLIDER_OPTIONS}
                />
              </Menu.Item>
            )}
          {this.state.showShowMoreButton &&
          <Menu.Item>
            <Button basic color='blue' onClick={this.onShowMoreParametersButtonClick.bind(this)}>
              Zobrazit více parametrů
            </Button>
          </Menu.Item>
          }
        </Menu>
      </div>
    );
  }
}

export default Sidebar;