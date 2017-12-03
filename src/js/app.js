var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('lodash');

var Weatherhistory = require('./WeatherHistory');
var Weathernow = require('./WeatherNow');

var MainInterface = React.createClass({
  getInitialState: function() {
    return {
      tempHist: [],
      tempCurr: [],
      forecast: [],
      curTime: ""
    } //return
  }, //getInitialState

  componentDidMount: function() {
    this.serverRequest = getDataHistorical( function(result) {
      var tHist = result;
      this.setState({
        tempHist: tHist
      }); //setState
    }.bind(this));

    getDataCurrent(this);
    getDataForecast(this);
    getTime(this, true);

  }, //componentDidMount

  componentWillUnmount: function() {
    this.serverRequest.abort();
  }, //componentWillUnmount

  render: function() {

    //console.log('forecast',this.state.forecast);
    var tempHistHtml=[];

    /*
    var tempHistRaw = this.state.tempHist;
    tempHistHtml=tempHistRaw.map(function(item, index) {
      return (
        <Weatherhistory key = { index }
          singleItem = { item }
          />
      )
    }.bind(this));
    */


    return (
      <div className="interface">
        <ul className="item-list media-list">
        <Weathernow
          tempNow = {this.state.tempCurr.data && this.state.tempCurr.data.length>0 ? this.state.tempCurr.data[0] : []}
          dataForecast={this.state.forecast && this.state.forecast.length>0 ? this.state.forecast : []}
          />
        <li id="current_time" className="current-time" onClick={(e) => getTime(this,true)}> {this.state.curTime} </li>
        {tempHistHtml}</ul>
      </div>
    ) //return
  } //render
}); //MainInterface

ReactDOM.render(
  <MainInterface />,
  document.getElementById('pageBody')
); //render
