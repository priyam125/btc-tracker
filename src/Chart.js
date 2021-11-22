import React , {useEffect, useRef, useState} from 'react';
import Chart from 'react-apexcharts'

const Chart1 = (props) => {

    !props.historicData && <div>Loading</div>
    let errors

    let priceArray = []
    // console.log(props);
    // const [historicData, setHistoricData] = useState({})
    // const [historicPrices, setHistoricPrices] = useState([])
    // const [historicDate, setHistoricDate] = useState([])
    // const [daysChart, setDaysChart] = useState()
    // useEffect(() => {

    //     if(props.historicData) {
    //         props.historicData.map((price) => {
    //             // console.log(price)
    //             priceArray.push(price[1])  
    //             historicPrices.push(price[1])
    //         }
    //     )
    //     } else (
    //       <div>Loading</div>
    //     )

        
    // })

    // useEffect(() => {
    //   if(props.historicData === undefined)
    //   return (
    //     <div>Loading</div>
    //   )
    //   if(props.historicData) {
    //     setHistoricData(props.historicData)
    //     setHistoricPrices(props.historicPrices)
    //     setHistoricDate(props.historicDate)
    //     setDaysChart(props.daysChart)
    //   }
    // }, [props.historicData])

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
              // type: "datetime",
              // categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
              categories: props.historicDate,
              labels: {
                show: false
              },
              // tooltip: {
              //   x: {
              //     format: 'dd/MM/yy HH:mm'
              //   }
              // },
              // tickAmount: 10,
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
            // data: [30, 40, 35, 50, 49, 60, 70, 91, 125]
            // data: props.historicData.map((data) => data[1]),   
            data: props.historicPrices,
            // type: "line"
          }
          // , {
          //   data: props.historicPrices,
          //   type: "column"
          // }

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

