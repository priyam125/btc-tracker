import React , {useEffect, useRef, useState} from 'react';
import Chart from 'react-apexcharts'

const Chart1 = (props) => {

    !props.historicData && <div>Loading</div>
    

    const chart = {
        options: {
            chart: {
              toolbar: {
                show: false
              },
              id: 'apexchart-example',
              animations: {
                enabled: true,
                easing: 'easeinout',
                speed: 800,
                animateGradually: {
                    enabled: true,
                    delay: 150
                },
                dynamicAnimation: {
                    enabled: true,
                    speed: 350
                }
            }
            },
            dataLabels: {
              enabled: false,           
             },
            xaxis: {
              categories: props.historicDate,
              labels: {
                show: false
              },
              axisBorder: {
                show: true,
                color: "#c2bebe"
              }
            },
            yaxis: {
              labels: {
                show: false    
              },
              axisBorder: {
                show: true,
                color: "#c2bebe"
              }
            },
            noData: {
              text: 'Loading'
            },
            grid: {
              show: false
            },
            stroke: {
              width: 2,
              curve: "straight"
            },
            fill: {
              type: 'gradient',
              gradient: {
                shade: 'dark',
                type: "vertical",
                shadeIntensity: 0.5,
                gradientToColors: undefined, // optional, if not defined - uses the shades of same color in series
                inverseColors: true,
                opacityFrom: 1,
                opacityTo: 0,
                stops: [0, 30, 100],
                colorStops: []
              }
            }
          },
          series: [{
            name: `Bitcoin Prices in past ${props.daysChart} days`,
            data: props.historicPrices,
            // type: "line"
          }

        ],

        }
      

    return (
        <div>
        {props.historicPrices && props.historicDate ?
          <div>
            <Chart options={chart.options} series={chart.series} type="area" width={1000} height={275}  />
          </div> : 
          <div>loading</div>
        }
        </div>
    )
}

export default Chart1

