const mongoose = require('mongoose');

const programDataSchema = mongoose.Schema({
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

const userDataSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  programs: programDataSchema,
}, { collection: 'users' });


userDataSchema.methods.serialize = function userDataSchema() {
  return {
    id: this.id,
    name: this.name,
    programs: this.programs,
  };
};

programDataSchema.methods.serialize = function programDataSchema() {
  return {
    id: this.id,
    programName: this.programName,
    summary: this.summary,
    dateLastUpdated: this.dateLastUpdated,
    workouts: this.workouts,
  };
};

const UserData = mongoose.model('UserData', userDataSchema);
const ProgramData = mongoose.model('ProgramData', programDataSchema);

module.exports = { UserData, ProgramData };
