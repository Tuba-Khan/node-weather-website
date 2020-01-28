const request=require("request") 
  //forcast
  const forcast=(lat,long,callback)=>{
    const url='https://api.darksky.net/forecast/6ebf238b099d9299d34b9ea6017e1ff7/'+encodeURIComponent(long)+','+encodeURIComponent(lat)+'?units=si'
  request({url,json:true},(error,{body})=>{
      if(error){
        callback('Unable to connect Weather services',undefined)
      } 
      else if(body.error){
        callback("Unable to find location.",undefined)
      }
    else{
      callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degress out. The high today is ' + body.daily.data[0].temperatureHigh + ' with a low of ' + body.daily.data[0].temperatureLow + '. There is a ' + body.currently.precipProbability + '% chance of rain.')
        }
  })
  
  }
module.exports=forcast
