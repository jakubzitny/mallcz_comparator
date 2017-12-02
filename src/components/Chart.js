import React, { Component } from 'react';
import { Scatter } from 'react-chartjs-2';
import MultiSlider from "multi-slider";

class Chart extends Component {
  _sliderChange = (data) => {
    this.props.onSliderChange(data)
  }

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
  }

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
            tooltips: {
              callbacks: {
                beforeLabel: (tooltipItem, data) => {
                  const dataset = data.datasets[0].data
                  const item = dataset[tooltipItem.index]
                  return item.pros.join('\n')
                },
                afterLabel: (tooltipItem, data) => {
                  const dataset = data.datasets[0].data
                  const item = dataset[tooltipItem.index]
                  return item.cons.join('\n')
                },
                label: (tooltipItem, data) => {
                  return ''
                },
                beforeTitle: (tooltipItems, data) => {
                  const dataset = data.datasets[0].data
                  const index = tooltipItems[0].index
                  const item = dataset[index]

                  return `${item.title} (${item.x} Kč)`
                },
                afterTitle: (tooltipItem, data) => {
                  return ''
                },
                beforeBody: () => {
                  return ''
                },
                afterBody: () => {
                  return '(Click to open)'
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

        <MultiSlider
          onChange={this._sliderChange}
          values={this.props.sliderValues}
        />

        <div className="slider-legend">
          {this.props.sliderValues[0] * 100} Kč
           -
          {this.props.sliderValues[1] * 100} Kč
        </div>
      </div>
    );
  }
}

export default Chart;
