import React, { useEffect, useState } from "react";
import axios from "axios";
import { COIN_DETAILS,  MARKET_CHART } from "./apiroutes";
import { CgArrowsExpandRight } from "react-icons/cg";
import {  FiPlusCircle } from "react-icons/fi";
import Chart1 from "./Chart";

const Dashboard = () => {
  //api data states
  const [currentPrice, setCurrentPrice] = useState();
  const [priceChangePerCent, setPriceChangePerCent] = useState();
  const [priceChange, setPriceChange] = useState();


  const [isNegative, setIsNegative] = useState()

  //component toggle states
  const [summary, setSummary] = useState(false);
  const [chart, setChart] = useState(true);
  const [statistics, setStatistics] = useState(false);
  const [analysis, setAnalysis] = useState(false);
  const [settings, setSettings] = useState(false);
  const [activeNumberMenu, setActiveNumberMenu] = useState(2)

  //chart state
  const [historicData, setHistoricData] = useState({})
  const [historicPrices, setHistoricPrices] = useState([])
  const [historicDate, setHistoricDate] = useState([])
  const [daysChart, setDaysChart] = useState("3")
  const [activeNumberTime, setActiveNumberTime] = useState(7)

  let summary1 = false;
  let changePercent
  let maxDays = "max", timeProp = []

  const handleToggle = (id) => {

    setActiveNumberMenu(id)
    
    // console.log(historicData);
    
  };

  useEffect(() => {

    const getData = () => {
      axios
      .get(COIN_DETAILS, {
        params: {
          vs_currency: "usd",
          ids: "bitcoin",
        },
        mode: "cors",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        // console.log(res);

        setCurrentPrice(res.data[0].current_price.toLocaleString("en-US"));
        // eslint-disable-next-line react-hooks/exhaustive-deps
        changePercent = res.data[0].price_change_percentage_24h;
        console.log(changePercent);
        if(changePercent < 0) {
          setPriceChangePerCent(changePercent.toFixed(2) * -1)
          setIsNegative(true)
        }
        // console.log(changePercent);
        else {
          setPriceChangePerCent(changePercent.toFixed(2));
          setIsNegative(false)
        }
        if (res.data[0].price_change_24h < 0)
        setPriceChange(res.data[0].price_change_24h.toFixed(3) * -1);
        else setPriceChange(res.data[0].price_change_24h.toFixed(3))
      })
      .catch((err) => console.log(err));
    }

    getData()

    // setInterval(getData, 50000)

    
  }, []);


  useEffect(() => {
    let priceArray = []
    let timeArray =[]
    axios.get(MARKET_CHART, {
      params: {
        id: "bitcoin",
        vs_currency: "usd",
        days: `${daysChart}`
      }
    }).then((res) => {
      console.log(res);
      setHistoricData(res.data.prices)
      res.data.prices.map((price) => {
        
        priceArray.push(price[1])
        timeArray.push(new Date(price[0]))
      })
      console.log(timeArray)

    }).then (() => {
      setHistoricPrices( priceArray)
      setHistoricDate(timeArray)
    })
    .catch((err) => {
      console.log(err);
    })
  }, [daysChart, currentPrice]);


  const handleChart = (id) => {

    setActiveNumberTime(id)
    setDaysChart(id)
    // console.log(id);
    
  }

  return (
    <div className="p-1">
      <div className="flex">
        <div className="text-6xl">{currentPrice}</div>
        <div className="py-1.5 px-1 text-2xl text-gray-500">USD</div>
      </div>
      <div
        className={`font-semibold text-md flex items-center space-x-1 py-3 ${
          isNegative === false ? "text-green-500" : "text-red-500"
        }`}
      >
        {isNegative ? <div className="mb-1"> - </div> : <div className="mb-1"> + </div>}       
        <div>{priceChange}</div>
        <div>{`(${priceChangePerCent}%)`}</div>
      </div>
      <div className="flex space-x-12 pt-8 border-b-2 border-gray-300">
        <div
          id="summary"
          onClick={() => handleToggle(1)}
          className={`cursor-pointer pb-3 ${activeNumberMenu === 1 ? `border-b-4 border-blue-700` : ``} `}
        >
          Summary
        </div>
        <div
          id="chart"
          onClick={() => handleToggle(2)}
          className={`cursor-pointer pb-3 ${activeNumberMenu === 2 ? `border-b-4 border-blue-700` : ``} `}
         >
          Chart
        </div>
        <div
          id="statistics"
          onClick={() => handleToggle(3)}
          className={`cursor-pointer pb-3 ${activeNumberMenu === 3 ? `border-b-4 border-blue-700` : ``} `}
        >
          Statistics
        </div>
        <div
          id="analysis"
          onClick={() => handleToggle(4)}
          className={`cursor-pointer pb-3 ${activeNumberMenu === 4 ? `border-b-4 border-blue-700` : ``} `}
        >
          Analysis
        </div>
        <div
          id="settings"
          onClick={() => handleToggle(5)}
          className={`cursor-pointer pb-3 ${activeNumberMenu === 5 ? `border-b-4 border-blue-700` : ``} `}
        >
          Settings
        </div>
      </div>
      

        {activeNumberMenu == 2 && 
          <div>
          <div className="pt-16 flex items-center space-x-60">
          <div className="flex items-center space-x-12">
            <div className="flex items-center">
              <CgArrowsExpandRight className="mr-2" />
              Fullscreen
            </div>
            <div className="flex items-center">
            <FiPlusCircle className="mr-2" />
              Compare
            </div>
          </div>
          <div className="flex space-x-6">
            <div id="1d" onClick={() => handleChart(1)} className={`rounded-md w-9 flex items-center justify-center cursor-pointer ${daysChart == 1 ? `bg-blue-700 text-white` : ``} `}>1d</div>
            <div id="3d" onClick={() => handleChart(3)} className={`rounded-md w-9 flex items-center justify-center cursor-pointer ${daysChart == 3 ? `bg-blue-700 text-white` : ``} `}>3d</div>
            <div id="1w" onClick={() => handleChart(7)} className={`rounded-md w-9 flex items-center justify-center cursor-pointer ${daysChart == 7 ? `bg-blue-700 text-white` : ``} `}>1w</div>
            <div id="1m" onClick={() => handleChart(30)} className={`rounded-md w-9 flex items-center justify-center cursor-pointer ${daysChart == 30 ? `bg-blue-700 text-white` : ``} `}>1m</div>
            <div id="6m" onClick={() => handleChart(180)} className={`rounded-md w-9 flex items-center justify-center cursor-pointer ${daysChart == 180 ? `bg-blue-700 text-white` : ``} `}>6m</div>
            <div id="1y" onClick={() => handleChart(365)} className={`rounded-md w-9 flex items-center justify-center cursor-pointer ${daysChart == 365 ? `bg-blue-700 text-white` : ``} `}>1y</div>
            <div id="max" onClick={() => handleChart(maxDays)} className={`rounded-md w-9 flex items-center justify-center cursor-pointer ${daysChart == "max" ? `bg-blue-700` : ``} `}>max</div>
          </div>
        </div>  
  
          <Chart1 className="h-28" historicDate={historicDate} historicPrices={historicPrices} historicData={historicData} daysChart={daysChart}/>
          </div> }

          {activeNumberMenu === 1 && <div className="flex flex-col">Summary</div>}
        
    


    </div>
  );
};

export default Dashboard;
