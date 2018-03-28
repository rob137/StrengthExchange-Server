module.exports = {
  CLIENT_ORIGIN: 
    process.env.CLIENT_ORIGIN || 
    'http://localhost:3000' || 
    'http://pedantic-wing-525a95.netlify.com/',
  DATABASE_URL:
    process.env.DATABASE_URL ||
    global.DATABASE_URL ||
    'mongodb://localhost/strength-app',
  TEST_DATABASE_URL:
    process.env.TEST_DATABASE_URL ||
    global.DATABASE_URL ||
    'mongodb://localhost/test-strength-app',
  PORT: process.env.PORT || 5003,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRY: process.env.JWT_EXPIRY || '7d',
};
