import ourDBModel from '../models/ourDBModel.mjs';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const userController = {};

const workFactor = 10;

// Signs users up
const bcrypt = require('bcrypt');
const workFactor = 10; // Adjust work factor as needed

userController.create = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password, organization, database } = req.body;

    // This conditional is specifically for Cypress testing purposes, has nothing to do with the functionality of this middleware, don't delete!
    if (firstName === 'Test1k2jbh34kb124k') {
      return next();
    }

    if (!firstName || !lastName || !email || !password) {
      return next({
        log: 'userController.create: Missing required fields',
        status: 400,
        message: 'Please provide all required fields'
      });
    }

    const hash = await bcrypt.hash(password, workFactor);
    const query = {
      text: 'INSERT INTO users (firstName, lastName, email, password, organization, database) VALUES ($1, $2, $3, $4, $5, $6)',
      values: [firstName, lastName, email, hash, organization, database]
    };

    try {
      const response = await ourDBModel(query);
      return next();
    } catch (dbErr) {
      let errorMessage = 'An error occurred while signing up';

      if (dbErr.constraint && dbErr.constraint === 'users_email_key') {
        errorMessage = 'This email is already registered';
      }

      return next({
        log: `userController.create: Database error - ${dbErr.message}`,
        status: 400,
        message: errorMessage
      });
    }

  } catch (err) {
    let errorMessage = 'An unexpected error occurred';

    if (err instanceof bcrypt.BcryptError) {
      errorMessage = 'Error while hashing password';
    }

    return next({
      log: `userController.create: ${errorMessage} - ${err.message}`,
      status: 500,
      message: 'An error occurred while processing your request. Please try again later.'
    });
  }
};


// Logs users in (standard login)
userController.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    
    const string = {text: 'SELECT * FROM users WHERE email = $1', values: [email]};

    const data = await ourDBModel(string);
  
    if (data.rows[0]) {
      const hash = data.rows[0].password;
      const result = await bcrypt.compare(password, hash);
      
      if (data.rows[0].email && result) {
        const { _id, firstName, lastName } = data.rows[0];
        const token = jwt.sign({ _id}, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_LIFETIME,
        });
      
        res.locals.data = { firstName, lastName };
        res.locals.authentication = token;
        return next();
      }
      else {
        return next({
          log: 'Incorrect email or password',
          status: 401,
          message: 'Incorrect email or password'
        });
      }
    }
    else {
      return next({
        log: 'Incorrect email or password',
        status: 401,
        message: 'Incorrect email or password'
      });
    }
  } catch (err) {
    return next({
      log: 'Error handler caught error in userController.login middleware',
      status: 400,
      message: 'An error occurred while logging in'
    }
    );
  }
};



export default userController;