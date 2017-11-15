var React = require('react');

var WeatherNow = React.createClass({



  render: function() {
      var tempC=Number(this.props.tempNow.temp).toFixed(1);
    return(
        <div>
            <h1 >
                <div>
                    <span id="current_temp" className="temp">{tempC}</span><span className="temp-degrees">&deg;</span><span id="current_temp_unit" className="temp-unit">C</span>
                </div>
                <div>
                    <span id="current_temp_2" className="temp-2">{(this.props.tempNow.temp*1.8+32).toFixed(0)}</span><span className="temp-degrees-2">&deg;</span><span id="current_temp_unit_2" className="temp-unit-2">F</span>
                </div>
            </h1>

            <div className="misc-data humidity">
                <span>Humidity:</span><span id="current_humidity">{Number(this.props.tempNow.humidity).toFixed(0)}</span>%
            </div>

            <div className="misc-data datetime">
                <span>Updated:</span><span id="temp_humid_last_reported">{this.props.tempNow.recorded_time}</span>
            </div>
        </div>
    ) // return
  } // render
}); //AptList

module.exports=WeatherNow;
