var express = require('express');
var app = express();
var http = require('http');
var options = {
    hostname: 'playark.com.cn',
    path: '/summercupfinal/dist/js/rank.json',
    port: '80',
    method: 'GET'
  };

var contentData = null;

function handleResponse(response) {
  var serverData = '';
  response.on('data', function (chunk) {
    serverData += chunk;
  });
  response.on('end', function () {
    // console.log(JSON.parse(serverData))
    contentData = serverData;
  });
}

http.request(options, function(response){
  handleResponse(response);
}).end();

app.get('/api/rank.json',function(req,res){
  res.setHeader('Content-Type','application/json;charset=UTF-8')
  res.setHeader('Access-Control-Allow-Origin','http://127.0.0.1:8080')
  res.send(contentData)
})

app.listen(4000,function(){
  console.log("Success!")
})
