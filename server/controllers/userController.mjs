import ourDBModel from '../models/ourDBModel.mjs';
import bcrypt from 'bcryptjs';

const userController = {};

const workFactor = 10;

userController.create = async (req, res, next) => {
  try {
    console.log(req.body);
    const { first_name, last_name, email, password, organization, database} = req.body; 

    const hash = await bcrypt.hash(password, workFactor);
    console.log('Line 13: ', `${hash}`);

    const string = `INSERT INTO users (first_name, last_name, email, password, organization, database) VALUES ('${first_name}', '${last_name}', '${email}', '${hash}', '${organization}', '${database}')`;
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

    const query = `SELECT *
    FROM users  
    WHERE username = '${email}';`;

    const data = await ourDBModel.query(query);

    console.log('Data.rows from db.query on log in', data);
    const hash = data.rows[0].password;

    const result = await bcrypt.compare(password, hash);

    res.locals.authentication = result;
    return next();
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