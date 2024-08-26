import { Schema, model, Types } from "mongoose";

export const COLLECTION_NAME = "stockTotalReals";
export const DOCUMENT_NAME = 'StockTotalReals';

export default interface StockTotalReals {
  _id?: Types.ObjectId;
  close: number;
  date: Date;
  high: number;
  low: number;
  open: number;
  ticker: string;
  vol: number;
}

const schema = new Schema<StockTotalReals>(
  {
    close: {
      type: Schema.Types.Number,
      required: true,
    },
    date: {
      type: Schema.Types.Date,
      required: true,
    },
    high: {
      type: Schema.Types.Number,
      required: true,
    },
    low: {
      type: Schema.Types.Number,
      required: true,
    },
    open: {
      type: Schema.Types.Number,
      required: true,
    },
    ticker: {
      type: Schema.Types.String,
      required: true,
    },
    vol: {
      type: Schema.Types.Number,
      required: true,
    },
  },
  { versionKey: false }
);

schema.index({ ticker: 1 });

export const StockTotalRealsModel = model<StockTotalReals>(DOCUMENT_NAME, schema, COLLECTION_NAME);
