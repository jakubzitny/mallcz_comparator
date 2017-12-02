import React, { Component } from 'react';
import { Scatter } from 'react-chartjs-2';
import MultiSlider from "multi-slider";

class Chart extends Component {
  _sliderChange = (data) => {
    this.props.onSliderChange(data)
  }

  _getElementAtEvent = (elements) => {
    const element = elements[0]
    const dat = this.props.data[element._index]

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
                label: 'My First dataSet',
                fill: false,
                backgroundColor: 'rgba(75,192,192,0.4)',
                pointBorderColor: 'rgba(75,192,192,1)',
                pointBackgroundColor: '#fff',
                pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                pointHoverBorderColor: 'rgba(220,220,220,1)',
                data: this.props.data
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
                label: (tooltipItem, data) => {
                  // console.log(tooltipItem, data)
                  const dataset = data.datasets[0].data

                  return dataset[tooltipItem.index].id
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
