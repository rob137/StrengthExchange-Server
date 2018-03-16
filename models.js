const mongoose = require('mongoose');

const programSchema = mongoose.Schema({
  programName: { type: String, required: true },
  summary: { type: String },
  dateLastUpdated: { type: String, required: true },
  workouts: [{
    day: { type: Number, required: true },
    exercises: [
      {
        exercise: { type: String, required: true },
        reps: { type: Number },
        sets: { type: Number },
        comments: { type: String },
      },
    ],
  }],
});

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  programs: programSchema,
}, { collection: 'users' });


userSchema.methods.serialize = function userSchema() {
  return {
    id: this.id,
    name: this.name,
    programs: this.programs,
  };
};

programSchema.methods.serialize = function programSchema() {
  return {
    id: this.id,
    programName: this.programName,
    summary: this.summary,
    dateLastUpdated: this.dateLastUpdated,
    workouts: this.workouts,
  };
};

const User = mongoose.model('User', userSchema);
const Program = mongoose.model('Program', programSchema);

module.exports = { User, Program };
