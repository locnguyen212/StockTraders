import { appPort } from "./config.js";
import "dotenv/config";
import express from "express";
import path from 'path';
import { fileURLToPath } from "url";

// setup express
const app = express();
const port = appPort;

//setup ejs
const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index');
})


app.listen(port, () => {
  console.log('=====');
  console.log('=====');
  console.log(`App is listening at: http://localhost:${port}/`);   
  console.log('=====');
  console.log('=====');
});

