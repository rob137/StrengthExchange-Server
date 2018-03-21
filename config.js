module.exports = {
  CLIENT_ORIGIN: 
    process.env.CLIENT_ORIGIN || 
    'http://localhost:3000' || 
    'http://pedantic-wing-525a95.netlify.com/',
  DATABASE_URL:
    process.env.DATABASE_URL ||
    global.DATABASE_URL ||
    'mongodb://localhost/strength-app',
  PORT: process.env.PORT || 5002,
};
