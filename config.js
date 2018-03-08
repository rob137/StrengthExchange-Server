module.exports = {
  CLIENT_ORIGIN: process.env.CLIENT_ORIGIN || 'http://pedantic-wing-525a95.netlify.com/', // 'http://localhost:3000'
  DATABASE_URL:
    process.env.DATABASE_URL ||
    global.DATABASE_URL ||
    'mongodb://localhost/strength-app'
};
