const path=require('path')
const express=require("express")
const hbs=require('hbs')
const geoCode=require('./utils/geocode')
const forcast=require('./utils/forcast')
 

const app=express()
const port=process.env.PORT || 3000
//define path
const publicDirectory=path.join(__dirname,"../public")
const viewPath=path.join(__dirname,"../templates/views")
const partialPath=path.join(__dirname,"../templates/partials")
//set handlers
app.set("view engine","hbs")
app.set('views',viewPath)
hbs.registerPartials(partialPath)
//static
app.use(express.static(publicDirectory))

app.get('',(req,res)=>{
  res.render('index',{
      title:"Weather App",
      name:"Tuba Khan"
  })
})

app.get('/about',(req,res)=>{
    res.render("about",{
        title:"About me",
        name:"Tuba Khan"
    })
})

app.get('/help',(req,res)=>{
    res.render("help",{
        title:"Help Page",
        name:"Tuba Khan",
        message:"How can i help you..?"
    })
})

app.get('/weather',(req,res)=>{
  address=req.query.address
  if(!address){
    return res.send({
      Error:"You must have to provide an address"
    })
  }

    
geoCode(address,(error,{Latitude,Longitude,Location}={})=>{
  if(error){
    console.location(error)
   //return res.send({error})
  }
  forcast(Latitude,Longitude,(error,forcastdata)=>{
   if(error){
     return res.send({error})
   }  
    
    return res.send({
    forcastdata:forcastdata,
    location:Location,
    address:address
})
  })
})

 
})
app.get('/products',(req,res)=>{
  if(!req.query.search){
  return res.send({
    error:"You must provide a search term"
  })
  }
  res.send({
    product:[]
  })
})

app.get('/help*',(req,res)=>{
    res.render('404',{
      title:'404',
      name:'Tuba Khan',
      errorMsg:"Help article not found"
  
    })
  })
  

app.get('*',(req,res)=>{
  res.render('404',{
    title:'404',
    name:'Tuba Khan',
    errorMsg:"404.Page not found"

  })
})

app.listen(port,()=>{
    console.log("Server is up on port "+ port)
})