const CommentModel = require('../models/comment/comment.model');

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

module.exports = {
  getUserGiftComment,
  getAllUserComment,
  getAllUserGetComment,
  updateComment,
  deleteComment
};
