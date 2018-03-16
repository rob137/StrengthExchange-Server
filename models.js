const mongoose = require('mongoose');

const userDataSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  programs: [{
    programName: { type: String, required: true },
    summary: { type: String },
    version: { type: Number, required: true },
    workouts: [{
      day: { type: Number, required: true },
      exercises: [
        {
          exercise: { type: String, required: true },
          weight: { type: Number },
          reps: { type: Number },
          sets: { type: Number },
          comments: { type: String },
        },
      ],
    }],
  }],
}, { collection: 'users' });

userDataSchema.methods.serialize = function userDataSchema() {
  return {
    id: this.id,
    name: this.name,
    programs: this.programs,
  };
};

const UserData = mongoose.model('UserData', userDataSchema);

module.exports = { UserData };
