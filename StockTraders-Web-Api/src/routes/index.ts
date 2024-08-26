import express from 'express';
import { endOfDay, startOfDay } from 'date-fns';
import StockTotalRealsRepo from '../database/repositories/StockTotalRealsRepo';

const routes = express.Router();

routes.get('/api/findTodayRecordByTicker/:keyword', async (req, res) => {
    try {
        let condition = {
            ticker: req.params.keyword.toUpperCase(),
            date: {
                $gte: startOfDay(new Date()),
                $lte: endOfDay(new Date())
            }
        }
        let result = await StockTotalRealsRepo.findOne(condition)
        res.status(200).send({
            status: true,
            data: result? result : 'Result not found'
        })
    } catch (error) {
        console.log(error);
        res.status(400).send({
            status: false
        })
    }
})

routes.get('/api/findTicker/:keyword', async (req, res) => {
    try {
        let condition = {
            ticker: req.params.keyword.toUpperCase(),
        }
        let result = await StockTotalRealsRepo.findMany(condition)
        res.status(200).send({
            status: true,
            data: result? result : 'Result not found'
        })
    } catch (error) {
        console.log(error);
        res.status(400).send({
            status: false
        })
    }
})

routes.get('/', (req, res) => {
    res.status(200).send({
        status: true,
        data: 'Welcome'
    })
})

export default routes;