const mongoose = require('mongoose');

const ObjectId = mongoose.ObjectId;

const divisionSchema = new mongoose.Schema({
  division: {
    type: 'string'
  },
  divisionUserId: [
    {
      type: ObjectId,
      ref: 'Users'
    }
  ],
  userIdHead: [
    {
      type: ObjectId,
      ref: 'Users'
    }
  ]
});

const Division = mongoose.model('Divisions', divisionSchema);

module.exports = Division;
