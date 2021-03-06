var React = require('react');


var WeatherNow = React.createClass({



  render: function() {
      const tempC=Number(this.props.tempNow.temp);
      const tempC_prev=Number(this.props.tempNow.recent_temp);
      const forecasts=this.props.dataForecast || {};
      const currDate=currentDate();
      const source = (this.props.tempNow.source =='') ? '(local)':'('+this.props.tempNow.source+')';
      const minMaxPeriod=addHours(currDate, 12);
      const downArrow='\u2193';
      const upArrow='\u2191';
      let maxTempC=-273;
      let minTempC=100;
      let minTempTime=currDate;
      let maxTempTime=currDate;

      let tempTrend=$('#temp_trend').text();
      if (tempC>tempC_prev) {tempTrend=upArrow;}
      if (tempC<tempC_prev) {tempTrend=downArrow;}

      //console.log('forecasts',forecasts );
      let forecastMaxTempPrev=-273;
      let forecastMinTempPrev=100;
      let minStop=false;
      let maxStop=false;
      let forecastDateTimePrev = null;
      for (let i in forecasts) {
          let forecastDateTime=forecasts[i]["forecast_date"];
          let forecastDate=forecastDateTime.substring(0,10);
          let forecast=forecasts[i]["forecasts"];
          //if (new Date(forecastDate)>minMaxPeriod) {
        //      //console.log('forecastDate',forecastDate);
        //      break;
          //}
          //else {
              let forecastMaxTemp=(Number(forecast.main.temp_max)-273) || -273;
              let forecastMinTemp=(Number(forecast.main.temp_min)-273) || +100;
              if (forecastMaxTemp < forecastMaxTempPrev) {maxStop=true;} // stop when max temperature started to decline
              if (forecastMinTemp > forecastMinTempPrev) {minStop=true;} // stop when min temperature started to rise
              if (forecastMaxTemp > maxTempC && !maxStop ) {maxTempC=forecastMaxTemp; maxTempTime=forecastDateTime;}
              if (forecastMinTemp < minTempC && !minStop) {minTempC=forecastMinTemp; minTempTime=forecastDateTime;}
              forecastMaxTempPrev = forecastMaxTemp;
              forecastMinTempPrev = forecastMinTemp;
              //console.log('forecast',forecastDateTime,forecastMaxTemp,forecastMinTemp );
          //}
      }
      if (minTempC==100){minTempC="n/a"} else {
          minTempC=minTempC.toFixed(0);
          if (minTempC>0) {minTempC="+"+minTempC;}
          if (minTempC=="-0") {minTempC="0";}
      }
      if (maxTempC==-273){maxTempC="n/a"} else {
          maxTempC=maxTempC.toFixed(0);
          if (maxTempC>0) {maxTempC="+"+maxTempC;}
          if (maxTempC=="-0") {maxTempC="0";}
      }
      let tempC_forecast=(tempTrend==downArrow) ? minTempC : maxTempC;
      let tempC_forecast_Time=(tempTrend==downArrow) ? minTempTime : maxTempTime;
      //console.log('forecast:',forecasts);
    return(
        <div>
            <h1 >
                <div>
                    <span id="current_temp_2" className="temp-2">&nbsp;{(this.props.tempNow.temp*1.8+32).toFixed(0)}<span className="temp-degrees-2">&deg;</span><span id="current_temp_unit_2" className="temp-unit-2">F</span></span>
                </div>
                <div>
                    <span id="temp_trend" className="temp">{tempTrend}</span>
                    <span id="current_temp" className="temp">{tempC.toFixed(0)}<span className="temp-degrees">&deg;</span><span id="current_temp_unit" className="temp-unit">C</span></span>
                </div>
                <div className="misc-data datetime">
                    <span id="temp_humid_last_reported">{this.props.tempNow.recorded_time}</span>
                    <span id="temp_humid_source">{source}</span>
                </div>
                <div>
                    <span id="min_temp" className="temp">{tempC_forecast}&deg;</span>
                </div>
                <div>
                    <span id="current_temp_2" className="temp-2">&nbsp;{(tempC_forecast*1.8+32).toFixed(0)}<span className="temp-degrees-2">&deg;</span><span id="current_temp_unit_2" className="temp-unit-2">F</span></span>
                </div>
                <div className="misc-data datetime">
                    <span id="temp_forecast_time">{tempC_forecast_Time}</span>
                </div>
            </h1>

            <div className="misc-data humidity">
                <span>Humidity:</span><span id="current_humidity">{Number(this.props.tempNow.humidity).toFixed(0)}</span>%
            </div>

        </div>
    ) // return
  } // render
}); //AptList

module.exports=WeatherNow;
