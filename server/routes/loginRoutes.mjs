import express from 'express';
const router = express.Router();
import userController from '../controllers/userController.mjs';
import oAuthController from '../controllers/oAuthController.js';

// Signing up
router.post('/signup', userController.create, (req, res) => {
  res.status(201).json({msg: 'Account made'});
});

// Logging in
router.post('/login', userController.login, (req, res) => {
  res.status(200).json({userData: res.locals.data,token:res.locals.authentication});
});

// Google Login
router.get('/google-login', oAuthController.login, (req, res) => {
  res.status(200).json({msg:'successful google login'});
});

// Google Callback
router.get('/google-login/callback', oAuthController.googleResponse, (req, res) => {
  res.status(200).json({msg:'callback successful'});
});


export default router;
