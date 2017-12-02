import React, { Component } from 'react';
import Chart from './Chart';

import ProductUtils from '../utils/product-utils'


class Product extends Component {
  state = {
    checkedCheckboxes: {
      'nfc': false,
      'dual-sim': true
    },
    chartData: ProductUtils.getChartData(this.props.data),
    error: null,
  };

  handleChange = (e, { checked, value }) => {
    const nextCheckboxes = this.state.checkedCheckboxes;
    nextCheckboxes[value] = checked;
    this.setState({
      checkedCheckboxes: nextCheckboxes
    });
  };

  _getBaseProduct() {
    try {
      return ProductUtils.getBaseProduct(this.props.data)
    } catch (e) {
      return e.message
    }
  }

  render() {
    const thisProduct = this._getBaseProduct()
    if (typeof thisProduct === 'string') {
      return (
        <div>{ thisProduct }</div>
      )
    }

    const similarProducts = ProductUtils.getSimilarProducts(this.props.data)
    console.log(thisProduct, similarProducts)

    return (
      <div className="product">
        <div>
          <span>
            <a href={thisProduct['URL']}>mall.cz</a>
          </span>
        </div>
        <span>{ thisProduct['CATEGORYTEXT'] }</span>
        <h1>{ thisProduct['PRODUCTNAME'] }</h1>
        <div>
          <div>
            <img src={thisProduct['IMGURL']} alt={thisProduct['PRODUCTNAME']}/>
          </div>
          <br />
          <div>
            <Chart
              data={this.state.chartData}
              sliderValues={ this.props.sliderValues }
              onSliderChange={ this.props.onSliderChange }
            />
          </div>
        </div>


        <br />
        <br />
        <br />
        <div className="footwrapper">
          <div className="foot-left">
          <h3>Accessories</h3>
          {
            thisProduct['ACCESSORY'].map((accessory) => {
              return (
                <span key={accessory}>
                  <a href={ accessory }>{accessory}</a><br />
                </span>
              )
            })
          }
          </div>
          <div className="foot-right">
          <h3>Similar products</h3>
          {
            similarProducts.map((product) => {
              const productData = product['Product']
              return (
                <span key={productData['PRODUCTNO']}>
                  <a href={ productData['PRODUCTNO'] }>{ productData['PRODUCT'] } ( { productData['PRICE_VAT'] } )</a><br />
                </span>
              )
            })
          }
          </div>
        </div>
      </div>
    );
  }
}

export default Product;
