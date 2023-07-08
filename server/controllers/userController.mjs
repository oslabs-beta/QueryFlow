import ourDBModel from '../models/ourDBModel.mjs';
import bcrypt from 'bcryptjs';

const userController = {};

const workFactor = 10;

userController.create = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password, organization, database} = req.body; 

    //Hash user's password
    const hash = await bcrypt.hash(password, workFactor);

    const string = `INSERT INTO users (firstName, lastName, email, password, organization, database) VALUES ('${firstName}', '${lastName}', '${email}', '${hash}', '${organization}', '${database}')`;
    const response = await ourDBModel(string);
    console.log(response);
    return next();
  } catch (err) {
    return next({
      log: 'Error handler caught error in userController.create middleware',
      status: 400,
      message: 'Error handler caught error in userController.create middleware'
    });
  };
};


userController.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    
    const query = `SELECT * FROM users WHERE email = '${email}'`;

    const data = await ourDBModel(query);
  
    if (data.rows[0]) {
      const hash = data.rows[0].password;
      const result = await bcrypt.compare(password, hash);
      
      if (data.rows[0].email && result) {
        const { _id, firstName, lastName } = data.rows[0];
        res.locals.authentication = {_id, firstName, lastName};
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
      message: 'Error handler caught error in userController.login middleware'
    }
    );
  }
};



export default userController;