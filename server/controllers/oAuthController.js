
import oauth2Client from '../middleware/oauth.js';
import ourDBModel from '../models/ourDBModel.mjs';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';

const oAuthController = {};

const workFactor = 10;

oAuthController.login = async (req,res,next)=>{
  try {
    const scopes = [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email',
    ];
  
    const url = oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: scopes,
    });
    console.log('redirecting!', url);
    res.redirect(url);
  } catch (error) {
    next({
      log: `Error handler caught error in oAuthController.login, ${error}`,
      status: 400,
      message: `Error handler caught error in oAuthController.login, ${error}`,
    });
  }
};

oAuthController.googleResponse = async (req,res,next)=>{
  console.log('hello I am under the water');
  try {
    const code = req.query.code;
    const { tokens } = await oauth2Client.getToken(code);
    const id_token = tokens.id_token;
    const decoded = jwt.decode(id_token, { complete: true });
    console.log('i am decoded google token', decoded);
    console.log('i am tokens', tokens);

    oauth2Client.setCredentials(tokens);
    const {email,given_name,family_name} = decoded.payload;
    
    const string = {text: 'SELECT * FROM users WHERE email = $1', values: [email]};
    const data = await ourDBModel(string);
    
    if(data.rows[0]){
      const { _id, firstName, lastName } = data.rows[0];
      const token = jwt.sign({_id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_LIFETIME,
      });

      res.cookie('token',token);
      res.cookie('revoke',tokens.access_token);
      res.redirect('/home');
    }

    //create a user
    const password = uuidv4();

    const hash = await bcrypt.hash(password, workFactor);


    const createUserString = {text:'INSERT INTO users (firstName, lastName, email, password) VALUES ($1, $2, $3, $4) RETURNING *', values: [given_name, family_name, email, hash] };
    const userData = await ourDBModel(createUserString);
    if(!userData.rows[0]){
      return next({
        log: 'Error handler caught error in oAuthController.callback. Failed Google User Creation',
        status: 400,
        message: 'Error handler caught error in oAuthController.callback. Failed Google User Creation',
      });
    }
    const { _id, firstName, lastName } = userData.rows[0];
    const token = jwt.sign({_id}, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_LIFETIME,
    });
    res.cookie('token',token);
    res.cookie('revoke',tokens.access_token);
    res.redirect('/home');
  } catch (error) {
    next({
      log: `Error handler caught error in oAuthController.login, ${error}`,
      status: 400,
      message: `Error handler caught error in oAuthController.login, ${error}`,
    });
  } 
};

export default oAuthController;