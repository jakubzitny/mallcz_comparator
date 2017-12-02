import React, { Component } from 'react';
import { Loader } from 'semantic-ui-react'

export default class Loading extends Component {
  render() {
    return (
      <div className='loading'>
        <Loader active size='large'>Načítám</Loader>
      </div>
    );
  }
}
