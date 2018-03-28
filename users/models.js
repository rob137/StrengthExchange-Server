const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: { type: String, default: '' },
  lastName: { type: String, default: '' },
});

UserSchema.methods.serialize = () => ({
  username: this.username || '',
  firstName: this.firstName || '',
  lastName: this.lastName || '',
});

UserSchema.methods.validatePassword = password => bcrypt.compare(password, this.password);

UserSchema.statics.hashPassword = password => bcrypt.hash(password, 10);

const User = mongoose.model('User', UserSchema);

module.exports = { User };
