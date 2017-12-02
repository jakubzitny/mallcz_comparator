import React, { Component } from 'react';
import debounce from 'lodash/debounce';
import { Scatter } from 'react-chartjs-2';
import { Slider } from 'antd';
import { Header } from 'semantic-ui-react';
import ProductUtils from '../utils/product-utils';

const MAX_PRICE = 100000;

// #88c7f4

class Chart extends Component {
  state = {
    sliderValues: this.props.sliderValues,
  };

  componentWillMount() {
    this._handleSliderChange = debounce((data) => {
      this.props.onSliderChange(data)
    }, 1500)
  }

  _sliderChange = (nextSliderValues) => {
    this.setState({
      sliderValues: nextSliderValues,
    });
    this._handleSliderChange(nextSliderValues)
  };

  _getElementAtEvent = (elements) => {
    if (!elements.length) {
      return
    }

    const element = elements[0]
    const dat = this.props.data[element._index]

    if (!dat) {
      return
    }

    // TODO: State, call prop fc.
    document.location.href = dat.id
  };

  render() {
    return (
      <div className="chart">
        <Scatter
          data={{
            labels: ['Scatter'],
            datasets: [
              {
                // label: 'My First dataSet',
                // fill: true,
                // backgroundColor: 'rgba(75,192,192,0.4)',
                // pointBorderColor: 'rgba(75,192,192,1)',
                // pointBackgroundColor: '#fff',
                // pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                // pointHoverBorderColor: 'rgba(220,220,220,1)',
                data: this.props.data,
                pointBackgroundColor: this.props.data.map((x) => x.pointBackgroundColor),
                pointRadius: this.props.data.map((x) => x.pointRadius),
              }
            ]
          }}
          getElementAtEvent={this._getElementAtEvent}
          legend={{ display: false }}
          options={{
            onClick: this._handleClick,
            responsive: true,
            hover: {
              onHover: function (e) {
                const point = this.getElementAtEvent(e);
                if (point.length) e.target.style.cursor = 'pointer';
                else e.target.style.cursor = 'default';
              }
            },
            tooltips: {
              xPadding: 15,
              yPadding: 15,
              callbacks: {
                beforeLabel: (tooltipItem, data) => {
                  const dataset = data.datasets[0].data;
                  const item = dataset[tooltipItem.index];
                  return item.pros.concat('');
                },
                afterLabel: (tooltipItem, data) => {
                  const dataset = data.datasets[0].data;
                  const item = dataset[tooltipItem.index];
                  return item.cons
                },
                label: (tooltipItem, data) => {
                  // return ''
                },
                beforeTitle: (tooltipItems, data) => {
                  const dataset = data.datasets[0].data;
                  const index = tooltipItems[0].index;
                  const item = dataset[index];

                  return [item.title, '', ProductUtils.formatPriceNumber(item.x)];
                },
                afterTitle: (tooltipItem, data) => {
                  return ''
                },
                beforeBody: () => {
                  return ''
                },
                afterBody: () => {
                  // return ''
                }
              },
            },
            scales: {
              xAxes: [
                {
                  display: true,
                  gridLines: {
                    display: false
                  },
                  labels: {
                    show: true
                  },
                  scaleLabel: {
                    display: true,
                    labelString: 'Cena'
                  }
                }
              ],
              yAxes: [
                {
                  display: true,
                  gridLines: {
                    display: false
                  },
                  labels: {
                    show: true
                  },
                  scaleLabel: {
                    display: true,
                    labelString: 'Kvalita'
                  }
                }
              ]
            }
          }}
        />

        <div className='slider-container'>
          <Slider
            range
            min={0}
            max={MAX_PRICE}
            defaultValue={[0, MAX_PRICE]}
            marks={{
              0: { label: '0 Kč' },
              100000: { label: '100 000 Kč' }
            }}
            tipFormatter={ProductUtils.formatPriceNumber}
            onChange={this._sliderChange}
            value={this.state.sliderValues}
          />
          <Header size='tiny' textAlign='center'>Rozsah ceny</Header>
          <div className="price-slider-legend">
            {ProductUtils.formatPriceNumber(this.state.sliderValues[0])}
            {" - "}
            {ProductUtils.formatPriceNumber(this.state.sliderValues[1])}
          </div>
        </div>

      </div>
    );
  }
}

export default Chart;
