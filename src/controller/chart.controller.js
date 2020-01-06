const CommentModel = require('../models/comment/comment.model');

const getUserComment = payload => {
  return new Promise((resolve, reject) => {
    CommentModel.find({
      userGiftComment: payload.user
    })
      .populate('userGetComment')
      .populate('userGiftComment')
      .populate('typeAssessKeyword')
      .populate('typeProgram')
      .populate('activity')
      .populate('typeAssessValue')
      .then(dataGiftCommentTo => {
        CommentModel.find({
          userGetComment: payload.user
        })
          .populate('userGetComment')
          .populate('userGiftComment')
          .populate('typeAssessKeyword')
          .populate('typeProgram')
          .populate('activity')
          .populate('typeAssessValue')
          .then(dataGetCommentFrom => {
            let yourself = { assessed: 0, assess: 0 };
            let subordinate = { assessed: 0, assess: 0 };
            let boss = { assessed: 0, assess: 0 };
            let partners = { assessed: 0, assess: 0 };

            // meloop memberikan komen ke mana
            if (JSON.stringify(dataGiftCommentTo) !== '[]') {
              for (let index = 0; index < dataGiftCommentTo.length; index++) {
                if (
                  dataGiftCommentTo[index].userGiftComment &&
                  dataGiftCommentTo[index].userGetComment
                ) {
                  let GiftCommentDivision = String(
                    dataGiftCommentTo[index].userGiftComment.division
                  );
                  let GetCommentDivision = String(
                    dataGiftCommentTo[index].userGetComment.division
                  );
                  let GiftCommentLevel =
                    dataGiftCommentTo[index].userGiftComment.level;
                  let GetCommentLevel =
                    dataGiftCommentTo[index].userGetComment.level;
                  let GetCommentId =
                    dataGiftCommentTo[index].userGetComment._id;
                  let GiftCommentId =
                    dataGiftCommentTo[index].userGiftComment._id;

                  if (
                    GiftCommentDivision === GetCommentDivision &&
                    GiftCommentLevel === GetCommentLevel
                  ) {
                    if (String(GetCommentId) === String(GiftCommentId)) {
                      yourself.assess += 1;
                    } else {
                      partners.assess += 1;
                    }
                  }

                  if (
                    GiftCommentDivision === GetCommentDivision &&
                    GiftCommentLevel < GetCommentLevel
                  ) {
                    subordinate.assess += 1;
                  }

                  if (
                    GiftCommentDivision === GetCommentDivision &&
                    GiftCommentLevel > GetCommentLevel
                  ) {
                    boss.assess += 1;
                  }

                  if (GiftCommentDivision !== GetCommentDivision) {
                    if (GiftCommentLevel > GetCommentLevel) {
                      boss.assess += 1;
                    } else {
                      subordinate.assess += 1;
                    }
                  }
                }
              }
            }

            // meloop dapat komen dari mana
            if (JSON.stringify(dataGetCommentFrom) !== '[]') {
              for (let index = 0; index < dataGetCommentFrom.length; index++) {
                if (
                  dataGetCommentFrom[index].userGiftComment &&
                  dataGetCommentFrom[index].userGetComment
                ) {
                  let GiftCommentDivision = String(
                    dataGetCommentFrom[index].userGiftComment.division
                  );
                  let GetCommentDivision = String(
                    dataGetCommentFrom[index].userGetComment.division
                  );
                  let GiftCommentLevel =
                    dataGetCommentFrom[index].userGiftComment.level;
                  let GetCommentLevel =
                    dataGetCommentFrom[index].userGetComment.level;
                  let GetCommentId =
                    dataGetCommentFrom[index].userGetComment._id;
                  let GiftCommentId =
                    dataGetCommentFrom[index].userGiftComment._id;

                  if (
                    GiftCommentDivision === GetCommentDivision &&
                    GiftCommentLevel === GetCommentLevel
                  ) {
                    if (String(GetCommentId) === String(GiftCommentId)) {
                      yourself.assessed += 1;
                    } else {
                      partners.assessed += 1;
                    }
                  }

                  if (
                    GiftCommentDivision === GetCommentDivision &&
                    GiftCommentLevel < GetCommentLevel
                  ) {
                    boss.assessed += 1;
                  }

                  if (
                    GiftCommentDivision === GetCommentDivision &&
                    GiftCommentLevel > GetCommentLevel
                  ) {
                    subordinate.assessed += 1;
                  }

                  if (GiftCommentDivision !== GetCommentDivision) {
                    if (GiftCommentLevel > GetCommentLevel) {
                      boss.assessed += 1;
                    } else {
                      subordinate.assessed += 1;
                    }
                  }
                }
              }
            }

            let object = [
              {
                for: 'Chart',
                data: [
                  {
                    Title: 'Yourself',
                    valueOne: yourself.assessed,
                    valueTwo: yourself.assess
                  },
                  {
                    Title: 'Subordinate',
                    valueOne: subordinate.assessed,
                    valueTwo: subordinate.assess
                  },
                  {
                    Title: 'Boss',
                    valueOne: boss.assessed,
                    valueTwo: boss.assess
                  },
                  {
                    Title: 'Partners',
                    valueOne: partners.assessed,
                    valueTwo: partners.assess
                  }
                ]
              },
              {
                for: 'Details',
                data: []
              }
            ];
            resolve(object);
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
  getUserComment
};
