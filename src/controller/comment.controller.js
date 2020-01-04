const CommentModel = require('../models/comment/comment.model');
const AssessmentModel = require('../models/comment/assessment.model');
const UserModel = require('../models/user/user.model');
const Helper = require('../utils/Helper');

const getUserGiftComment = userGiftComment => {
  return new Promise((resolve, reject) => {
    CommentModel.find({
      userGiftComment
    })
      .populate('userGetComment')
      .populate('userGiftComment')
      .populate('typeAssessKeyword')
      .populate('typeProgram')
      .populate('activity')
      .then(data => {
        resolve(data);
      })
      .catch(err => {
        reject(err);
      });
  });
};

const getAllUserComment = () => {
  return new Promise((resolve, reject) => [
    CommentModel.find({})
      .populate('userGetComment')
      .populate('userGiftComment')
      .populate('typeAssessKeyword')
      .populate('typeProgram', 'nameProgram')
      .populate('activity', 'nameActivity')
      .populate('typeAssessValue')
      .then(data => {
        resolve(data);
      })
      .catch(err => {
        reject(err);
      })
  ]);
};

const getAllUserGetComment = userGetComment => {
  return new Promise((resolve, reject) => [
    CommentModel.find({
      userGetComment
    })
      .populate('userGetComment')
      .populate('userGiftComment')
      .populate('typeAssessKeyword')
      .populate('typeProgram')
      .populate('activity')
      .then(data => {
        resolve(data);
      })
      .catch(err => {
        reject(err);
      })
  ]);
};

const updateComment = payload => {
  return new Promise((resolve, reject) => {
    CommentModel.findByIdAndUpdate(payload.id, {
      status: true
    })
      .then(data => {
        resolve(data);
      })
      .catch(err => {
        reject(err);
      });
  });
};

const deleteComment = payload => {
  return new Promise((resolve, reject) => {
    CommentModel.findByIdAndDelete(payload.id)
      .then(data => {
        resolve(data);
      })
      .catch(err => {
        reject(err);
      });
  });
};

const postCommentAssessment = payload => {
  return new Promise((resolve, reject) => {
    const valueChoice =
      typeof payload.valueChoice === 'string'
        ? JSON.parse(payload.valueChoice)
        : payload.valueChoice;
    const scoreAqumulate = Helper.triggerAcumulateRateCommentFirstFromAdmin(
      valueChoice
    );

    AssessmentModel.create({
      userGetComment: payload.userGetComment,
      totalRating: scoreAqumulate.countRate,
      totalValueRating: scoreAqumulate.countAll,
      typeProgram: payload.typeProgram,
      activity: payload.activity,
      valueChoice: valueChoice,
      dateComment: new Date(),
      status: true
    })
      .then(data => {
        UserModel.findByIdAndUpdate(payload.userId, {
          rate: scoreAqumulate.countRate,
          score: scoreAqumulate.countAll
        })
          .then(dataUser => {
            resolve(data);
          })
          .catch(err => {
            reject(err);
          });
      })
      .catch(err => {
        reject(err);
      });
  });
};

module.exports = {
  getUserGiftComment,
  getAllUserComment,
  getAllUserGetComment,
  updateComment,
  deleteComment,
  postCommentAssessment
};
