const jwt = require('jsonwebtoken');
const User = require('../model/User');

// Middleware for authenticating a user
const authUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token,JWT_SECRET);
    const user = await User.findById(decodedToken.id);
    if (!user) {
      throw new Error();
    }
    req.user = user;
    next();
  } catch {
    res.status(401).json({ error: 'Please authenticate' });
  }
};

// Middleware for authenticating an admin
const authAdmin = async (req, res, next) => {
  try {
    console.log('authAdmin middleware called');
    if (!req.headers.authorization) {
      throw new Error('No authorization header');
    }

    const token = req.headers.authorization.split(' ')[1];
    console.log('Token:', token);
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded token:', decodedToken);
    const user = await User.findById(decodedToken.id);
    console.log('User:', user);
    if (!user || user.role !== 'admin') {
      console.log('User role:', user.role);
      throw new Error();
    }
    req.user = user;
    next();
  } catch (error) {
    console.error('Error in authAdmin middleware:', error);
    res.status(401).json({ error: 'Please authenticate as admin' });
  }
};

module.exports = {
  authUser,
  authAdmin
};