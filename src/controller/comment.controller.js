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

const getUserDetailComment = payload => {
  return new Promise((resolve, reject) => {
    AssessmentModel.find({
      userGetComment: payload.userGetComment
    })
      .populate({ path: 'valueChoice.choiceKeyword.nameKeyword' })
      .populate({ path: 'valueChoice.nameValue' })
      .then(dataCommentAll => {
        let acumulate = [];
        for (let idx = 0; idx < dataCommentAll.length; idx++) {
          for (
            let idxValueProgramActivity = 0;
            idxValueProgramActivity < dataCommentAll[idx].valueChoice.length;
            idxValueProgramActivity++
          ) {
            let acumulateInd = {
              valueName:
                dataCommentAll[idx].valueChoice[idxValueProgramActivity]
                  .nameValue.valueName,
              totalValue: 0,
              totalKeywordValue: []
            };
            let countValue = 0;
            let choiceKeyword =
              dataCommentAll[idx].valueChoice[idxValueProgramActivity]
                .choiceKeyword;

            for (
              let idxChoiceKeyword = 0;
              idxChoiceKeyword < choiceKeyword.length;
              idxChoiceKeyword++
            ) {
              countValue += choiceKeyword[idxChoiceKeyword].valueKeyword;
              acumulateInd.totalKeywordValue.push({
                keywordName:
                  choiceKeyword[idxChoiceKeyword].nameKeyword.keywordName,
                valueKeyword: choiceKeyword[idxChoiceKeyword].valueKeyword
              });
            }
            acumulateInd.totalValue = countValue / choiceKeyword.length;
            acumulate.push(acumulateInd);
          }
        }
        resolve(acumulate);
      });
  });
};

module.exports = {
  getUserGiftComment,
  getAllUserComment,
  getAllUserGetComment,
  updateComment,
  deleteComment,
  postCommentAssessment,
  getUserDetailComment
};
