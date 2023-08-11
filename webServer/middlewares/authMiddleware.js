const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  //const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
  const token = req.cookies.token;
  if (!token) {
    res.clearCookie('token');
    return next();
  }
  try {
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    //console.log(decodedToken);
    req.userId = decodedToken.userId;
    req.userRole = decodedToken.userRole;
    next();
  } catch (error) {
    console.error('Error validating token:', error);
    res.status(401).json({ message: 'Invalid token' });
  }
};

const requireAdminRole = (req, res, next) => {
  const token = req.cookies.token;
  //console.log(token);
  if (!token) {
    res.clearCookie('token');
    return res.status(401).json({ message: 'Please log in' });
  }
  try {
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    console.log(decodedToken);
    req.userId = decodedToken.userId;
    req.userRole = decodedToken.userRole;
    if (req.userRole !== true) {
      return res.status(403).json({ message: 'Access denied' });
    }
    next();
  } catch (error) {
    console.error('Error validating token:', error);
    res.status(401).json({ message: 'Invalid token' });
  }

}


module.exports = { authenticateToken, requireAdminRole };
