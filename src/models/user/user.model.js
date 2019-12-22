const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  namaLengkap: 'string',
  nik: {
    type: 'string',
    unique: true
  },
  password: 'string',
  level: 'number',
  role: 'string',
  email: 'string',
  division: {
    type: mongoose.ObjectId,
    ref: 'Divisions'
  },
  rate: 'number',
  score: 'number'
});

const User = mongoose.model('Users', userSchema);

module.exports = User;
