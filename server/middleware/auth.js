import jwt from 'jsonwebtoken';

const authenticationMiddleware = async (req,res,next) => {
  const authHeader = req.headers.authorization;

  if(!authHeader || !authHeader.startsWith('Bearer ')){
    return next({
      log: 'Error handler caught error in auth middleware, No Header',
      status: 400,
      message: 'Error handler caught error in auth middleware, No Header',
    });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
   
    const { _id } = decoded;
    req.user = { _id };
    next();
  } catch (error) {
    next({
      log: 'Error handler caught error in auth middleware',
      status: 400,
      message: 'Error handler caught error in auth middleware',
    });
  }
};

export default authenticationMiddleware;