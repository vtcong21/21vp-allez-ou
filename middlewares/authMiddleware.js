const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
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

module.exports = { authenticateToken };
