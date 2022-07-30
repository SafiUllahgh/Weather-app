const request = require('request')

const geocode = ((address,callback)=>{
    const url = 'http://api.positionstack.com/v1/forward?access_key=6f5ce3ab9b83ab65d85e300ad4cf6efc&query='+encodeURIComponent(address)
    request({url:url, json:true},(error,{ body })=>{

        if(error){
            callback('Unable to connect to weather servers ')}
        else if(body.data.length === 0){
            callback('Unable to find location ')
        }
        else{
            callback(undefined,{
                latitude : body.data[0].latitude,
                longitude: body.data[0].longitude,
                name: body.data[0].label
            })
        }
    }
    )
})


module.exports = geocode