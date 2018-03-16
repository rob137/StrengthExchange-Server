const mongoose = require('mongoose');

const programsSchema = mongoose.Schema({
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

const usersSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  programs: programsSchema,
}, { collection: 'users' });


usersSchema.methods.serialize = function usersSchema() {
  return {
    id: this.id,
    name: this.name,
    programs: this.programs,
  };
};

programsSchema.methods.serialize = function programsSchema() {
  return {
    id: this.id,
    programName: this.programName,
    summary: this.summary,
  };
};

const Users = mongoose.model('Users', usersSchema);
const Programs = mongoose.model('Programs', programsSchema);

module.exports = { Users, Programs };
