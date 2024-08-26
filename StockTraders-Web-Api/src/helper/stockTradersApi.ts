import axios from "axios";
import { apiBody, apiUrl } from "../config";
import StockTotalReals from "../database/models/StockTotalReals";
import converter from "./converter";
import StockTotalRealsRepo from "../database/repositories/StockTotalRealsRepo";

async function getRecordByTicker(ticker:string): Promise<StockTotalReals>{    
    let result = await axios.post(apiUrl, apiBody);
    return converter
                .toStockTotalReals(result.data.TotalTradeRealReply.stockTotalReals)
                .find(e => e.ticker === ticker.toUpperCase());
} 

async function getAllRecords(): Promise<StockTotalReals[]>{
    let result = await axios.post(apiUrl, apiBody);
    return converter.toStockTotalReals(result.data.TotalTradeRealReply.stockTotalReals);
}

function saveAllToDb() {
    axios
    .post(apiUrl, apiBody)
    .then((response) => {
        if (response.data.TotalTradeRealReply.codeReply.codeName === 'SUCSESS') {
              let data = response.data.TotalTradeRealReply.stockTotalReals;
              StockTotalRealsRepo.updateMany(data)
        }
    })
    .catch((err) => console.log(err));
}

export default {
    getRecordByTicker, getAllRecords, saveAllToDb
}