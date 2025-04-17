const jwt = require('jsonwebtoken');
require('dotenv').config();

// Middleware to check authentication and authorization based on role
const authMiddleware = (role) => {
  return (req, res, next) => {
    // Check if the authorization header exists
    const authHeader = req.headers.authorization;

    // If no authorization header or if it's not a Bearer token, return 401 Unauthorized
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Extract the token from the authorization header (Bearer <token>)
    const token = authHeader.split(' ')[1];

    try {
      // Verify the token using the secret key (your secret key should be in an environment variable)
      const decoded = jwt.verify(token, 'yourSuperSecretKey');

      // Check if a role is provided and if the user's role matches the required role
      if (role && decoded.role !== role) {
        return res.status(403).json({ error: 'Access denied' });
      }

      // Attach the decoded user info to the request object for further use
      req.user = decoded;

      // Move to the next middleware or route handler
      next();
    } catch (err) {
      // If the token is invalid or expired, return 401 Unauthorized
      res.status(401).json({ error: 'Invalid token' });
    }
  };
};

module.exports = authMiddleware;
