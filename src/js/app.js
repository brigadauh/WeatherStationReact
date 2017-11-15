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
    //toDo: wrap this into a function
    getDataCurrent(this);
    getTime(this, true);

  }, //componentDidMount

  componentWillUnmount: function() {
    this.serverRequest.abort();
  }, //componentWillUnmount

  render: function() {
    var tempHistRaw = this.state.tempHist;
    var tempCurrRaw = this.state.tempCurr;
    var tempCurrData = tempCurrRaw.data;
    //console.log('state',this.state);
    var tempHistHtml=[];
    var tempCurrHtml=[];
    /*
    tempHistHtml=tempHistRaw.map(function(item, index) {
      return (
        <Weatherhistory key = { index }
          singleItem = { item }
          />
      )
    }.bind(this));
    */
    if (tempCurrData && tempCurrData.length>0){
        tempCurrHtml=tempCurrData.map(function(item, index) {
          return (
            <Weathernow key = { index }
              tempNow = { item }
              />
          )
        }.bind(this));
    }

    return (
      <div className="interface">
        <ul className="item-list media-list">{tempCurrHtml}
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
