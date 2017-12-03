function getDataHistorical(func, content) {
    $.get('./data.json',function(result){
        func(result);
    }.bind(content));
}
function getDataCurrent(content) {
    fetch(`/api/weather/temphumidity/current`)
    .then(result=>result.json())
    .then(tempCurr=>content.setState({tempCurr}));
    setTimeout(() => {
        getDataCurrent(content);
    },60000);
}
function getDataForecast(content) {
    fetch(`/api/weather/forecast`)
    .then(result=>result.json())
    .then(forecast=>{
        const data=forecast.data;
        content.setState({forecast:data});

    });

    setTimeout(() => {
        getDataForecast(content);
    },60000*60);
}
function getTime(content,isSeconds) {
    var d=new Date();
    var cTime=d.toLocaleTimeString();
    var cSeconds=d.getSeconds();
    if (cSeconds=="00") {
        isSeconds=false;
    }
    if (!isSeconds) {
        cTime=cTime.replace(/:\d+ /, ' ');
        setTimeout( () => {
            getTime(content,false);
        },1000);
    }
    else {
        setTimeout( () => {
            getTime(content,true);
        },1000);

    }
    if (isSeconds || cSeconds=="00" || cSeconds=="01")
    content.setState({
      curTime : cTime
    })
}
