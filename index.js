const http = require("http")
const fs = require("fs")
var requests = require('requests');


const homeFile = fs.readFileSync("index.html", "utf-8")

const replaceVal = (tempVal, orgVal) =>{
 
    let temperature = tempVal.replace("{%tempval%}", orgVal.main.temp)
    temperature = temperature.replace("{%tempmin%}", orgVal.main.temp_min)
    temperature = temperature.replace("{%tempmax%}", orgVal.main.temp_max)
    temperature = temperature.replace("{%location%}", orgVal.name)
    temperature = temperature.replace("{%country%}", orgVal.sys.country)
    return temperature
}


const server = http.createServer((req, res) =>{
    
    if(req.url = "/"){
        requests("http://api.openweathermap.org/data/2.5/weather?q=Dhaka&appid=6a87d3f9fb69adc8c9b6f2a0ce26b883",)
        .on('data', (chunk) => {
            const objData = JSON.parse(chunk);
            const arrayData = [objData]
        //   console.log(arrayData[0].main.temp)

        const realTimeData = arrayData.map((val) =>replaceVal(homeFile, val)).join("")
            // console.log(val.main)

        res.write(realTimeData)
        })
        .on('end', (err) => {
          if (err) return console.log('connection closed due to errors', err);
         
         res.end()
        });
    }
})

server.listen(8000, "127.0.0.1")