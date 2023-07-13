const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY;

const authMiddleware = (req, res, next) => {
    // Extract the token from the request headers
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ message: 'No token provided.' });
    }
    
    // Verify the token
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Invalid token.' });
      }
      
      // Token is valid, set the authenticated user in the request object
      req.user = decoded;
      next();
    });
  };
  
module.exports = {authMiddleware};
  