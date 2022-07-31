const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./util/geocode')
const forecast = require('./util/forecast')

const app = express()
const port = process.env.PORT || 3000

//Define paths for Express configs
publicPathDir=(path.join(__dirname,'../public'))
viewsDir=path.join(__dirname,'../templates/views')
partialsDir=path.join(__dirname,'../templates/partials')

// Setup handlebars engine and viws location
app.set('view engine','hbs')
app.set('views',viewsDir)
hbs.registerPartials(partialsDir)

// Setup static directory to serve
app.use(express.static(publicPathDir))



app.get('',(req,res)=>{
    
    res.render('index',{
        title: "My weather",
        name: "Safi"
    })
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error: "Please type anything"
        })
    }
    console.log(req.query.search)
    res.send({
        products:[]
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error: "Please provide an adress"
        })
    }
    
    geocode(req.query.address,(error,{latitude,longitude,name}={})=>{
        if (error){
            return res.send({error})
        }
        forecast(latitude,longitude,(error,forecastData)=>{
            if (error){
                return res.send({error})
            }
            res.send({
                forecast: forecastData,
                name,
                address: req.query.address
            })
            
        })

    })

   
        
    })


app.get('/about',(req,res)=>{
    res.render('about',{
        title: "My weather app",
        name: "Safi"
    })
})

app.get('/help',(req,res)=>{
    res.render(('help'),{
        helpfulText:"To use this app, simply type the location in the bar and Click on search to get the Weather!",
        title:"Help",
        name:"Safi"
    })
})

app.get('/help/*',(req,res)=>{
    res.render(('404'),{
        name:"Safi",
        title:'404',
        errorMsg:"Help article not found"
    })
})

app.get('*',(req,res)=>{
    res.render(('404'),{
        name:"Safi",
        title:'404',
        errorMsg:"Page not found"
    })
})



app.listen(port,()=>{
    console.log("Server is up and running on Port" + port)
})