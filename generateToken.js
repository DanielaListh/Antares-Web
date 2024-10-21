const jwt = require('jsonwebtoken');
require('dotenv').config();

const payload = {
  id: 123,
  email: 'persona.ficticia@example.com',
  role: 'user'
};

const secretKey = process.env.SECRET_KEY;

const options = {
  expiresIn: '1h'
};

const token = jwt.sign(payload, secretKey, options);

console.log('Token:', token);
