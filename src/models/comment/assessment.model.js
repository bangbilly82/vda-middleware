const mongoose = require('mongoose');
const ObjectId = mongoose.ObjectId;
const commentFirstScheme = new mongoose.Schema({
  userGetComment: {
    type: ObjectId,
    ref: 'Users'
  },
  totalRating: 'number',
  totalValueRating: 'number',
  typeProgram: {
    type: ObjectId,
    ref: 'Programs'
  },
  activity: {
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
          nameKeyword: {
            type: ObjectId,
            ref: 'Keywords'
          },
          valueKeyword: 'number'
        }
      ]
    }
  ],
  dateComment: 'date',
  status: Boolean
});

const CommentFirsts = mongoose.model('CommentFirsts', commentFirstScheme);
module.exports = CommentFirsts;
