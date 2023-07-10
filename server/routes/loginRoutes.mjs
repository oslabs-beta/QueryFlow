import express from 'express';
const router = express.Router();
import userController from '../controllers/userController.mjs';

//Signing up
router.post('/signup', userController.create, (req, res) => {
  res.status(201).json({msg: 'Account made'});
});

//Logging in
router.post('/login', userController.login, (req, res) => {
  res.status(201).json({userData: res.locals.data,token:res.locals.authentication});
});


export default router;
