import express from 'express';
import StockTotalReals, { StockTotalRealsModel } from './database/models/StockTotalReals';
import './database';
import { apiBody, apiUrl, app_port } from './config';
import axios from 'axios';
import StockTotalRealsRepo from './database/repositories/StockTotalRealsRepo';
import kafka from './kafka';
import WebSocket from 'ws';
import { createServer } from 'http';
import path from 'path';
import stockTradersApi from './helper/stockTradersApi';
import routes from './routes';
import bodyParser from 'body-parser';

// setup express
const app = express();
const port = app_port;

// setup websocket server
const wsServer = createServer(app);
const wss = new WebSocket.Server({
  server: wsServer
})

// setup ejs
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// setup routes
app.use('/', routes)

// setup bodyParser
app.use(bodyParser.json())

// api first call
stockTradersApi.saveAllToDb();

// api call interval
setInterval(() => {
  console.log('Start retreiving data...');
  
  stockTradersApi.saveAllToDb();
}, 1000 * 60 * 60);

// setup websocket
wss.on('connection', function connection(ws) {
  let runQuery = null

  ws.on('error', console.error);
  console.log('A client has connected!');

  ws.on('message', function message(data) {
    console.log('A client has sent a message');
    clearInterval(runQuery)
    runQuery = setInterval(async () => {
      console.log('Run query');
      
      let record = await stockTradersApi.getRecordByTicker(data.toString());
      console.log(record);
      
      if(record){
        let result = {
          status: true,
          result: record
        }
        ws.send(JSON.stringify(result))
      }else{
        let result = {
          status: false
        }
        ws.send(JSON.stringify(result))
        clearInterval(runQuery)
      }    
    }, 1000 * 5);

  });

  ws.on('close', function close() {
    console.log('A client has disconnected');
    clearInterval(runQuery)
  });
});

app.use((err, req, res, next) => {
  console.log(err);
  
})


wsServer
  .listen(port, () => {
    console.log('=====');
    console.log('=====');
    console.log(`Server is listening at: http://localhost:${port}/`);   
    console.log(`Websocket available at: ws://localhost:3000`);
    console.log('=====');
    console.log('=====');
  })
  .on('error', (e) => console.log(e));

