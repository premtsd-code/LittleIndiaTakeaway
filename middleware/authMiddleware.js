const jwt = require('jsonwebtoken');
require('dotenv').config();

const authMiddleware = (role) => {
  return (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];
    try {
      
      // const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const decoded = jwt.verify(token, 'yourSuperSecretKey');
      if (role && decoded.role !== role) {
        return res.status(403).json({ error: 'Access denied' });
      }
      req.user = decoded; // Store decoded user information in the request object
      next();
    } catch (err) {
      res.status(401).json({ error: 'Invalid token' });
    }
  };
};

module.exports = authMiddleware;
