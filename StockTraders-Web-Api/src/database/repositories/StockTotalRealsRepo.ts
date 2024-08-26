import { endOfDay, startOfDay } from "date-fns";
import converter from "../../helper/converter";
import StockTotalReals, {StockTotalRealsModel,} from "../models/StockTotalReals";

async function create(data: any): Promise<StockTotalReals> {
  const createdSTR = await StockTotalRealsModel.create({
    close: data.close,
    date: new Date(data.date),
    high: data.high,
    low: data.low,
    open: data.open,
    ticker: data.ticker,
    vol: data.vol,
  });
  return createdSTR.toObject();
}

function createMany(data:any) {
    const createdSTR = StockTotalRealsModel
        .insertMany(converter.toStockTotalReals(data))
        .then(() => console.log('Successfully inserted many'))
        .catch((err) => {
            console.log(err);
        })
}

function updateMany(data:any) {
    let newData = converter.toStockTotalReals(data)
    for(let e of newData){
        const condition = {
            ticker: e.ticker,
            date: {
                $gte: startOfDay(new Date()),
                $lte: endOfDay(new Date())
            }
        };
        StockTotalRealsModel
            .updateOne(condition, e, { upsert:true })
            .then(() => {})
            .catch(err => {
                console.log(err);
            })
    }
    console.log('Successfully updated many')
}

async function findOne(condition:any): Promise<StockTotalReals> {
    return StockTotalRealsModel
                .findOne(condition)
                .select('-_id ticker date close high low open vol')
                .lean()
                .exec();
}

async function findMany(condition:any): Promise<StockTotalReals[]> {
    return StockTotalRealsModel
                .find(condition)
                .select('-_id ticker date close high low open vol')
                .lean()
                .exec();
}

export default {
    create,
    updateMany,
    createMany,
    findOne,
    findMany
};