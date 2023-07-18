
import oauth2Client from '../middleware/oauth.js';
import ourDBModel from '../models/ourDBModel.mjs';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';

const oAuthController = {};

const workFactor = 10;

// Begins the google OAuth login process
oAuthController.login = async (req, res, next) => {
  try {
    const scopes = [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email',
    ];
  
    const url = oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: scopes,
    });

    // Redirects to google's OAuth
    res.redirect(url);

  } catch (error) {
    next({
      log: `Error handler caught error in oAuthController.login, ${error}`,
      status: 400,
      message: `An error occurred while trying to authenticate through Google, ${error}`,
    });
  }
};

// Works with Google to get a proper response
oAuthController.googleResponse = async (req, res, next) => {
  try {
    const code = req.query.code;
    const { tokens } = await oauth2Client.getToken(code);
    
    //id_token is a JWT Token that has all of google users information
    const id_token = tokens.id_token;
    
    //decoded the jwt to get the user's information
    const decoded = jwt.decode(id_token, { complete: true });
 
    oauth2Client.setCredentials(tokens);

    const { email, given_name, family_name } = decoded.payload;
    
    // Adds a 'g' at the end of emails to distinguish standard logins from OAuth
    const string = {text: 'SELECT * FROM users WHERE email = $1', values: [email + 'g']};
    const data = await ourDBModel(string);
    
    // Checks to see if there is data inside of rows, if there is, then there is a user which has that google email
    if (data.rows[0]) {

      // We get _id, but also have access to firstName/lastName here for potential stretch feature
      const { _id, firstName, lastName } = data.rows[0];
      const token = jwt.sign({_id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_LIFETIME,
      });

      // Sets cookies for frontend
      res.cookie('token', token);
      res.cookie('revoke', tokens.access_token);

      // Redirects back to home page
      return res.redirect('/home');
    }

    // ===== Creates a user if no user already exists above. Then set the cookies at the end and redirect =====
    
    // Creates a dummy password for the google user as they are already authenticated.
    const password = uuidv4();
    const hash = await bcrypt.hash(password, workFactor);

    // Adds a 'g' at the end of emails to distinguish standard logins from OAuth
    const createUserString = {text:'INSERT INTO users (firstName, lastName, email, password) VALUES ($1, $2, $3, $4) RETURNING *', values: [given_name, family_name, email + 'g', hash] };
    const userData = await ourDBModel(createUserString);
    
    if(!userData.rows[0]) {
      return next({
        log: 'Error handler caught error in oAuthController.callback. Failed Google User Creation',
        status: 400,
        message: 'Error handler caught error in oAuthController.callback. Failed Google User Creation',
      });
    }

    // We get _id, but also have access to firstName/lastName here for potential stretch feature
    const { _id, firstName, lastName } = userData.rows[0];

    const token = jwt.sign({_id}, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_LIFETIME,
    });

    // Sets cookies for frontend
    res.cookie('token', token);
    res.cookie('revoke', tokens.access_token);
    
    // Redirects to home page
    return res.redirect('/home');

  } catch (error) {
    next({
      log: `Error handler caught error in oAuthController.login, ${error}`,
      status: 400,
      message: `An error occurred while awaiting a response from Google, ${error}`,
    });
  } 
};

export default oAuthController;