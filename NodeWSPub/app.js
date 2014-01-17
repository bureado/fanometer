var azure = require('azure');
var program = require('commander');
var config = require('./config');
var WebSocket = require('ws');

var sbService = azure.createServiceBusService(config.sbConnectionString);

program
    .version('0.0.1')
    .option('-u, --url <url>')
    .parse(process.argv);

var ws = new WebSocket(program.url);

ws.on('open', function() {
    
    console.log('connected');

});

ws.on('message', function(data, flags) {

    console.log('receiving data...');
    message = "{ body: " + data + " }";

    console.log('sending message to service bus');
    sbService.sendTopicMessage(config.sbTopic, message, function(error){
        if(error) {
            console.error(error);
        }
    });
    console.log('message sent!');

});