import StockTotalReals from "../database/models/StockTotalReals";

function toStockTotalReals(data:any): StockTotalReals[]{
    var newData: StockTotalReals[] = [];
    for(let e of data){
        newData.push({
          close: e.close,
          date: new Date(e.date),
          high: e.high,
          low: e.low,
          open: e.open,
          ticker: e.ticker,
          vol: e.vol,
        })
    }
    return newData;
}

export default {
    toStockTotalReals
}