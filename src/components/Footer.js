import React, { Component } from 'react';

export default class Footer extends Component {

  render() {
    return (
      <div className="footwrapper">
        <br />
        <br />
        <br />
        <div className="foot-left">
        <h3>Accessories</h3>
        {
          this.props.thisProduct['ACCESSORY'].map((accessory) => {
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
        <div className="foot-right--list">
        {
          this.props.similarProducts.map((product) => {
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
