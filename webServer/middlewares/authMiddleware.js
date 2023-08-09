const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  //const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
  const token = req.cookies.token;
  if (!token) {
    //return res.status(401).json({ message: 'Unauthorized' });
    return next();
  }

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    req.userId = decodedToken.userId;
    req.userRole = decodedToken.userRole;
    next();
  } catch (error) {
    console.error('Error validating token:', error);
    res.status(401).json({ message: 'Invalid token' });
  }
};

const adminMiddleware = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    // res.clearCookie('token');
    // return res.redirect("/").cookie('token', token);
    next();
  }
  try {
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    req.userId = decodedToken.userId;
    req.userRole = decodedToken.userRole;
    if (req.userRole == 1) {
      // res.clearCookie('token');
      // return res.redirect("/").cookie('token', token);
      next();
    }

    next();

  } catch (error) {
    console.error('Error validating token:', error);
    res.status(401).json({ message: 'Invalid token' });
  }

}


module.exports = { authenticateToken, adminMiddleware };
