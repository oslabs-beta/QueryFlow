import express from 'express';
const apiRouter = express.Router();
import userController from '../controllers/userController.mjs';
import clientDBController from '../controllers/clientDBController.mjs';
import ourDBController from '../controllers/ourDBController.js';
import redisController from './controllers/redisController.mjs';

  
//Signing up
apiRouter.post('/signup', userController.create, (req, res) => {
    res.status(201).json({msg: 'Account made'});
});

//Logging in
apiRouter.post('/login', userController.login, (req, res) => {
    res.status(201).json(res.locals.authentication);
});

//Post metrics to our PostgreSQL metrics table
apiRouter.post('/query-metrics', clientDBController.queryMetrics, ourDBController.queryPush, (req, res) => {
    res.status(201).json(res.locals.metrics);
});

//Retrieves metrics from our PostgreSQL metrics table
apiRouter.post('/get-metrics', ourDBController.queryGet, (req, res) => {
    res.status(201).json(res.locals.getMetrics);
});

//Retrieves data from user's database, measures the time, posts to our Redis instance, measures time.
apiRouter.post('/redis-metrics', clientDBController.queryTimeSQL, redisController.latency, (req, res) => {
    res.status(201).json(res.locals.comparisonData);
});

//Deletes a query from the PostgreSQL metrics table by id
apiRouter.delete('/delete-metrics-id', ourDBController.deleteQueryById, (req, res) => {
    res.status(201).json({msg: 'Query Deleted'});
});

//Deletes a query from the PostgreSQL metrics table by name
apiRouter.delete('/delete-metrics-name', ourDBController.deleteQueryByName, (req, res) => {
    res.status(201).json({msg: 'Query Deleted'});
});

export default apiRouter;