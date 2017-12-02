import React, { Component } from 'react';
import request from 'request'

import '../App.css';

import Container from './Container';
import Loading from './Loading';

import DataUtils from '../utils/data-utils';
import ParamUtils from '../utils/param-utils';

export default class App extends Component {
  state = {
    data: null,
    sliderValues: [
      0,
      100000,
    ],
    paramValues: null
  };

  componentDidMount() {
    this._fetchAndSetData()
  }

  _fetchAndSetData() {
    this._fetchData()
      .then((data) => {
        const filteredData = DataUtils.filterDataByPrice(data, this.state.sliderValues)
        this.setState({
          data: filteredData,
          paramValues: ParamUtils.formatParams(data['params']),
        })
      })
      .catch((error) => {
        console.error(error)
      })
  }

  _getDummyRequest() {
    return {
      ProdId: "1027636001",
      PriceRange: {
        from: 15,
        to: 10000,
      }
    }
  }

  _getRequest(productId) {
    return {
      ProdId: productId,
      PriceRange: {
        from: this.state.sliderValues[0],
        to: this.state.sliderValues[1],
      },
      UserPrefs: ParamUtils.formatUserPrefs(this.state.paramValues)
    }
  }

  _fetchData() {
    // const URL = 'http://5.153.61.109:5000/msb/getproduct?productid=1027636001'
    const URL = 'http://5.153.61.109:5000/msb/getscore'
    const uri = window.location.pathname
    const productId = uri.replace('/', '')
    const dummyRequest = this._getRequest(productId)

    return new Promise((resolve, reject) => {
      const requestOptions = {
        url: URL,
        method: 'POST',
        json: true,
        body: dummyRequest,
      }

      request(requestOptions, (error, response, body) => {
        if (error) {
          reject(error)
          return
        }

        resolve(body)
      })
    })
  }

  _fetchDummyData() {
    return Promise.resolve({
      results: [
        {
          isBase: true,
          Score: 123,
          Product: {
            CATEGORYTEXT: "categoris",
            ITEM_ID: 123,
          }
        }
      ]
    })
  }

  _handleSliderChange = (newSliderValues) => {
    this.setState({
      sliderValues: newSliderValues,
    });
    this._fetchAndSetData()
  };

  _handleParamChange = (newParamValues) => {
    this.setState({
      paramValues: newParamValues,
    })
    this._fetchAndSetData()
  }

  render() {
    if (!this.state.data) {
      return (
        <Loading />
      );
    }

    return (
      <div className="app">
        {/* <ProductSearch /> */}
        <Container
          data={this.state.data}
          paramValues={this.state.paramValues}
          sliderValues={this.state.sliderValues}
          onSliderChange={this._handleSliderChange}
          onParamChange={this._handleParamChange}
        />
      </div>
    );
  }
}
