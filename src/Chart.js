import React, { Component } from 'react';
import { Scatter } from 'react-chartjs-2';

class Chart extends Component {
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
                // pointBorderWidth: 1,
                // pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                pointHoverBorderColor: 'rgba(220,220,220,1)',
                // pointHoverBorderWidth: 2,
                // pointRadius: 1,
                // pointHitRadius: 10,
                data: this.props.data
              }
            ]
          }}
          getElementAtEvent={this.getElementAtEvent}
          legend={{ display: false }}
          options={{
            responsive: true,
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
      </div>
    );
  }
}

export default Chart;
