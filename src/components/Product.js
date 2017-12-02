import React, { Component } from 'react';

import Chart from './Chart';

import ProductUtils from '../utils/product-utils'
import { Container, Header, Image, Segment } from 'semantic-ui-react';

class Product extends Component {
  state = {
    chartData: ProductUtils.getChartData(this.props.data),
    error: null,
  };

  componentWillReceiveProps(nextProps) {
    this.setState({
      chartData: ProductUtils.getChartData(nextProps.data),
    })
  }

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
        <div>{thisProduct}</div>
      )
    }

    return (
      <div className="product">
        <span>{thisProduct['CATEGORYTEXT']}</span>
        <div className='product-header'>
          <Container>
            <Header as='h1' floated='right' color='red'>
              {ProductUtils.formatPriceNumber(thisProduct['PRICE_VAT'])}
            </Header>
            <Header as='h1' floated='left'>
              <Image src={thisProduct['IMGURL']} />
              {' '}{`${thisProduct['PRODUCTNAME']}`}
            </Header>
          </Container>
        </div>
        <div>
          <div>
            <Chart
              data={this.state.chartData}
              sliderValues={this.props.sliderValues}
              onSliderChange={this.props.onSliderChange}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Product;
