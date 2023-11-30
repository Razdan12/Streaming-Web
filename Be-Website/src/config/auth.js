
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");

dotenv.config();

const secretKey = process.env.SECRET_KEY_JWT;

const authAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res.status(401).json({ error: 'Missing authorization header' });
    return;
  }
  const token = authHeader.split(' ')[1];
  try {
    const decodedToken = jwt.verify(token, secretKey);
    req.user = decodedToken;
    if (req.user.role !== 'admin') {
      res.status(401).json({ error: 'Invalid role admin' });
      return;
    }
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

const authUser = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res.status(401).json({ error: 'Missing authorization header' });
    return;
  }
  const token = authHeader.split(' ')[1];
  try {
    const decodedToken = jwt.verify(token, secretKey);
    req.user = decodedToken;
    if (req.user.role !== 'user') {
      res.status(401).json({ error: 'Invalid role' });
      return;
    }
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

const authAll = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res.status(401).json({ error: 'Missing authorization header' });
    return;
  }
  const token = authHeader.split(' ')[1];
  try {
    const decodedToken = jwt.verify(token, secretKey);
    req.user = decodedToken;
    if (req.user.role !== 'admin' && req.user.role !== 'user') {
      res.status(401).json({ error: 'Invalid role' });
      return;
    }
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

module.exports = {authAll, authAdmin, authUser};
