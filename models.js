const mongoose = require('mongoose');

const usersSchema = mongoose.Schema({
  type: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
}, { type: 'user' });

const programsSchema = mongoose.Schema({
  type: { type: String, required: true },
  name: { type: String, required: true },
  userId: { type: String, required: true },
  summary: { type: String },
  dateLastUpdated: { type: Date, required: true },
  days: { type: Array },
}, { type: 'program' });

const daysSchema = mongoose.Schema({
  type: { type: String, required: true },
  dayType: { type: String, required: true },
  dayNumber: { type: Number, required: true },
  programId: { type: String, required: true },
  exercises: { type: Array }
}, { type: 'day' });

usersSchema.methods.serialize = function usersSchema() {
  return {
    id: this.id,
    name: this.name,
  };
};

programsSchema.methods.serialize = function programsSchema() {
  return {
    id: this.id,
    type: this.type,
    name: this.name,
    userId: this.userId,
    summary: this.summary,
    dateLastUpdated: this.dateLastUpdated,
    days: this.days,
  }
}

daysSchema.methods.serialize = function daysSchema() {
  return {
    _id: this.id,
    type: this.type,
    dayType: this.dayType,
    userId: this.userId,
    day: this.day,
    programId: this.programId,
    exercises: this.exercises,
  }
}

const Users = mongoose.model('Users', usersSchema, 'users');
const Programs = mongoose.model('Program', programsSchema, 'programs');
const Days = mongoose.model('Day', daysSchema, 'days');
module.exports = { Users, Programs, Days };
