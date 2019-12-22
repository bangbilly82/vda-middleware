const mongoose = require('mongoose');
const ObjectId = mongoose.ObjectId;

const programSchema = new mongoose.Schema({
  userInchargeId: [
    {
      type: ObjectId,
      ref: 'Users'
    }
  ],
  nameProgram: {
    type: 'string',
    unique: true
  },
  actvityId: [
    {
      nameActivity: {
        type: ObjectId,
        ref: 'Activities'
      },
      valueChoice: [
        {
          nameValue: {
            type: ObjectId,
            ref: 'Values'
          },
          choiceKeyword: [
            {
              type: ObjectId,
              ref: 'Keywords'
            }
          ]
        }
      ]
    }
  ],
  dateProgram: 'date'
});
const Program = mongoose.model('Programs', programSchema);

module.exports = Program;
