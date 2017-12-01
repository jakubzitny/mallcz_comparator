import React, { Component } from 'react';
import { Checkbox, Header, Menu } from 'semantic-ui-react';


class Sidebar extends Component {
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
            <Header size='medium' textAlign='center'>Samsung Galaxy J3, Dual SIM (2016),
              zlatý</Header>
          </Menu.Item>

          <Menu.Item>
            <Checkbox
              toggle
              label='NFC'
              value='nfc'
              name='checkboxToggleGroup'
              checked={this.state.checkedCheckboxes['nfc']}
              onChange={this.handleChange}
            />
          </Menu.Item>

          <Menu.Item>
            <Checkbox
              toggle
              label='DualSim'
              value='dual-sim'
              name='checkboxToggleGroup'
              checked={this.state.checkedCheckboxes['dual-sim']}
              onChange={this.handleChange}
            />
          </Menu.Item>
        </Menu>
      </div>
    );
  }
}

export default Sidebar;
