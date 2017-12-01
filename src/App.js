import React, { Component } from 'react';

import './App.css';

// import ProductSearch from './ProductSearch';
import Product from './Product';

class App extends Component {
  render() {
    return (
      <div className="app">
        {/*<ProductSearch />*/}
        <Product/>
      </div>
    );
  }
}

export default App;
