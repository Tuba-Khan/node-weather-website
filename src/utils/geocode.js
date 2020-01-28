const request=require("request") 
//geocode
const geoCode=(address,callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoidHViYS1raGFuIiwiYSI6ImNrNXc3azc1dTEyancza3BnbzRjbG9laHIifQ.uDooKUUOd5KynIM_Gic4Vg&limit=3'
     request({url,json:true},(error,{body})=>{
      if(error){
        callback('Unable to connect location services',undefined)
      } 
      else if(body.features.length===0){
        callback("Unable to find location. Try another search",undefined)
      }
    else{
      callback(undefined,{
        Latitude:  body.features[0].center[0],
      Longitude:  body.features[0].center[1],
      Location: body.features[0].place_name
      })
    }
  })
  
  }

  module.exports=geoCode