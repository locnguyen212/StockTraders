import mongoose from "mongoose";
import { db } from "../config";

const dbURI = `mongodb://${db.user}:${db.password}@${db.host}:${db.port}/${db.name}?authSource=admin`;

mongoose
  .connect(dbURI)
  .then(() => {
    console.log("Mongoose connection done");
  })
  .catch((e) => {
    console.log(e);
  });

mongoose.connection.on("connected", () => {
  console.log("Mongoose default connection opened");
});

mongoose.connection.on('error', (err) => {
    console.log('Mongoose default connection error: ' + err);
});

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose default connection disconnected');
});

export const connection = mongoose.connection;