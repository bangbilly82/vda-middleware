const CommentModel = require('../models/comment/comment.model');
const AssessmentModel = require('../models/comment/assessment.model');
const UserModel = require('../models/user/user.model');
const ProgramModel = require('../models/program/program.model');
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

const getAllUserGetComment = payload => {
  return new Promise((resolve, reject) => [
    CommentModel.find({
      userGetComment:
        payload.userGetComment || payload.userGetComment.userGetComment
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
const postNewComment = payload => {
  return new Promise((resolve, reject) => {
    const userGetComment = payload.userGetComment;
    const userGiftComment = payload.userGiftComment;
    const rating = payload.rating;
    const valueRating = payload.valueRating;
    const comment = payload.comment;
    const typeAssess = payload.typeAssess;
    const typeAssessValue = payload.typeAssessValue;
    const typeAssessKeyword = payload.typeAssessKeyword;
    const typeProgram = payload.typeProgram;
    const activity = payload.activity;
    const firstCommentEditPlan = {};
    const othersMessage = payload.othersMessage || '';

    // MEMO: Cari Penilaian Pertama
    AssessmentModel.find({
      userGetComment: userGetComment
    })
      .populate({ path: 'valueChoice.choiceKeyword.nameKeyword' })
      .populate({ path: 'valueChoice.nameValue' })
      .then(dataCommenFirst => {
        // MEMO: State Ulang
        firstCommentEditPlan._id = dataCommenFirst[0]._id;
        firstCommentEditPlan.userGetComment = dataCommenFirst[0].userGetComment;
        firstCommentEditPlan.totalRating = 0;
        firstCommentEditPlan.totalValueRating = 0;
        firstCommentEditPlan.typeProgram = dataCommenFirst[0].typeProgram;
        firstCommentEditPlan.activity = dataCommenFirst[0].activity;
        firstCommentEditPlan.valueChoice = [];
        firstCommentEditPlan.dateComment = new Date();
        firstCommentEditPlan.status = true;
        // MEMO: Kondisi Be-A Plus atau bukan
        if (!typeProgram) {
          let valueProgramActivity = [];
          let acumulateRate = {};

          // MEMO: Looping Penilaian Awal (Cari Value-nya)
          for (
            let idx = 0;
            idx < dataCommenFirst[0].valueChoice.length;
            idx++
          ) {
            // MEMO: Buat Object Value Baru
            let object = {
              nameValue: dataCommenFirst[0].valueChoice[idx].nameValue._id,
              choiceKeyword: []
            };
            // MEMO: Conditional -> Jika data Value sama dengan Data Value Yg dinilai
            if (
              dataCommenFirst[0].valueChoice[idx].nameValue._id ==
              typeAssessValue
            ) {
              // MEMO: Looping Penilaian Awal (Cari Keyword-nya)
              for (
                let index = 0;
                index <
                dataCommenFirst[0].valueChoice[idx].choiceKeyword.length;
                index++
              ) {
                // MEMO: Buat Object Keyword Baru
                let objectForValueKeyword = {
                  nameKeyword:
                    dataCommenFirst[0].valueChoice[idx].choiceKeyword[index]
                      .nameKeyword._id,
                  valueKeyword: 0
                };
                // MEMO: Cari Score Impact
                var tryToGetScoreImpact = Helper.triggerScoreImpactForBeAplus(
                  dataCommenFirst[0].valueChoice[idx].choiceKeyword[index]
                    .valueKeyword,
                  rating
                );
                // MEMO: Cari apakah Keyword sama dengan keyword yg dipilih
                let checkDataKeywordIndex = typeAssessKeyword.findIndex(
                  data => {
                    return (
                      data ==
                      dataCommenFirst[0].valueChoice[idx].choiceKeyword[index]
                        .nameKeyword._id
                    );
                  }
                );
                // MEMO: Conditional -> Jika data ada pada daftar yg dipilih
                if (checkDataKeywordIndex == -1) {
                  objectForValueKeyword.valueKeyword =
                    dataCommenFirst[0].valueChoice[idx].choiceKeyword[
                      index
                    ].valueKeyword;
                  object.choiceKeyword.push(objectForValueKeyword);
                } else {
                  // MEMO: Simpan Value Keyword
                  objectForValueKeyword.valueKeyword =
                    dataCommenFirst[0].valueChoice[idx].choiceKeyword[index]
                      .valueKeyword + tryToGetScoreImpact;
                  // console.log('============>', tryToGetScoreImpact)
                  // MEMO: Push Objek Keyword Baru
                  object.choiceKeyword.push(objectForValueKeyword);
                }
              }
            } else {
              // MEMO: Looping Penilaian Awal (Cari Keyword-nya)
              for (
                let index = 0;
                index <
                dataCommenFirst[0].valueChoice[idx].choiceKeyword.length;
                index++
              ) {
                // MEMO: Buat Object Value Baru
                let objectForValueKeyword = {
                  nameKeyword:
                    dataCommenFirst[0].valueChoice[idx].choiceKeyword[index]
                      .nameKeyword._id,
                  valueKeyword: 0
                };
                // MEMO: Simpan Value Keyword
                objectForValueKeyword.valueKeyword =
                  dataCommenFirst[0].valueChoice[idx].choiceKeyword[
                    index
                  ].valueKeyword;
                // MEMO: Push Objek Keyword Baru
                object.choiceKeyword.push(objectForValueKeyword);
              }
            }
            // MEMO: Push Array Of Object Semua Value dan Keyword Baru
            valueProgramActivity.push(object);
          }
          // MEMO: Menambahkan Array Of Object ke Key Penilaian Awal Baru
          firstCommentEditPlan.valueChoice = valueProgramActivity;
          // MEMO: Variabel Akumulasi Rate dan Value Baru
          acumulateRate = Helper.triggerAcumulateRateCommentFirstFromAdmin(
            valueProgramActivity
          );
          // MEMO: Update Komen Pertama
          AssessmentModel.findByIdAndUpdate(firstCommentEditPlan._id, {
            userGetComment: firstCommentEditPlan.userGetComment,
            totalRating: acumulateRate.countRate,
            totalValueRating: acumulateRate.countAll,
            typeProgram: firstCommentEditPlan.typeProgram,
            activity: firstCommentEditPlan.activity,
            valueChoice: firstCommentEditPlan.valueChoice,
            dateComment: firstCommentEditPlan.dateComment,
            status: firstCommentEditPlan.status
          })
            .then(data => {
              // MEMO: Create Komen User
              CommentModel.create({
                userGetComment: userGetComment,
                userGiftComment: userGiftComment,
                rating: acumulateRate.countRate,
                originalRate: rating,
                valueRating: acumulateRate.countAll,
                comment: comment,
                dateComment: new Date(),
                status: false,
                typeAssess: typeAssess,
                typeAssessValue: typeAssessValue,
                typeAssessKeyword: typeAssessKeyword,
                typeProgram: typeProgram,
                valueProgramActivity: firstCommentEditPlan.valueChoice,
                activity: activity,
                othersMessage
              })
                .then(dataCreateCommentSuccess => {
                  // MEMO: Cari Profil User
                  UserModel.findById(dataCreateCommentSuccess.userGetComment)
                    .then(dataUserGet => {
                      // MEMO: Variabel Rate Baru
                      let newRate = acumulateRate.countRate;
                      // MEMO: Variabel Score Baru
                      let newScore = acumulateRate.countAll;
                      // MEMO: Update Rate dan Score User yg Dinilai
                      UserModel.findByIdAndUpdate(
                        dataCreateCommentSuccess.userGetComment,
                        {
                          rate: newRate,
                          score: newScore
                        }
                      )
                        .then(dataUserPost => {
                          resolve(dataUserPost);
                        })
                        .catch(err => {
                          reject(err);
                        });
                    })
                    .catch(err => {
                      reject(err);
                    });
                })
                .catch(err => {
                  reject(err);
                });
            })
            .catch(err => {
              reject(err);
            });
          // MEMO: Kondisi Program atau bukan
        } else {
          // MEMO: Cari Program yg Dinilai
          ProgramModel.findById({
            _id: typeProgram
          })
            .populate({ path: 'actvityId.nameActivity' })
            .populate({
              path: 'actvityId.valueChoice.nameValue',
              populate: { path: 'keywordsId' }
            })
            .populate({ path: 'actvityId.valueChoice.choiceKeyword' })
            .then(dataProgram => {
              // MEMO: Variabel Indikator Level
              let hasilReturn = {};
              // MEMO: Mencari Data Profil User Yg Mendapat Komen
              UserModel.findById({ _id: userGetComment })
                .then(isiGetId => {
                  // MEMO: Mencari Data Profil User Yg Memberi Komen
                  UserModel.findById({ _id: userGiftComment })
                    .then(isiGiftId => {
                      // MEMO: Akumulasi Indikator Level
                      hasilReturn = Helper.triggerIndicatorLevel(
                        isiGetId,
                        isiGiftId
                      );
                      console.log('INDICATOR LEVEL', hasilReturn);
                      // MEMO: Variabel Mencatat Activity Yg Dinilai
                      let activityFromProgram = null;
                      // MEMO: Variabel ...................
                      let keyWordFromProgram = [];
                      // MEMO: Variabel ...................
                      let valueProgramActivity = [];
                      // MEMO: Variabel Score Impact
                      console.log(
                        'KIRIM UNTUK SCORE IMPACT ' +
                          dataCommenFirst[0] +
                          ' ' +
                          rating
                      );
                      const rateAcumulate =
                        Helper.triggerScoreImpact(dataCommenFirst[0], rating) *
                        hasilReturn;
                      // MEMO: Variabel ...................
                      let acumulateRate = {};
                      // MEMO: Looping Untuk Program Yg Didapat (Keperluan untuk Mencari Activity yg Dipilih Penilai)
                      for (
                        let index = 0;
                        index < dataProgram.actvityId.length;
                        index++
                      ) {
                        // MEMO: Pengkondisian Untuk Mendapatkan Activity
                        if (
                          dataProgram.actvityId[index].nameActivity._id ==
                          activity
                        ) {
                          // MEMO: Simpan Value Activity yg ditemukan
                          activityFromProgram = dataProgram.actvityId[index];
                        }
                      }
                      // MEMO: Looping Activity yg Telah Disimpan
                      for (
                        let index = 0;
                        index < activityFromProgram.valueChoice.length;
                        index++
                      ) {
                        // MEMO: Looping Value Activitynya
                        for (
                          let idx = 0;
                          idx <
                          activityFromProgram.valueChoice[index].choiceKeyword
                            .length;
                          idx++
                        ) {
                          // MEMO: Simpan Activity-nya, Kelompokan Berdasarkan Keyword (Jadi Pecahkan Keywordnya)
                          keyWordFromProgram.push(
                            activityFromProgram.valueChoice[index]
                              .choiceKeyword[idx].keywordName
                          );
                        }
                      }

                      // MEMO: Looping Penilaian Awal (Cari Value-nya)
                      for (
                        let idx = 0;
                        idx < dataCommenFirst[0].valueChoice.length;
                        idx++
                      ) {
                        // MEMO: Buat Object Value Baru
                        let object = {
                          nameValue:
                            dataCommenFirst[0].valueChoice[idx].nameValue._id,
                          choiceKeyword: []
                        };
                        // MEMO: Looping Penilaian Awal (Cari Keyword-nya)
                        for (
                          let index = 0;
                          index <
                          dataCommenFirst[0].valueChoice[idx].choiceKeyword
                            .length;
                          index++
                        ) {
                          // MEMO: Cari apakah Keyword sama dengan keyword yg dipilih
                          let indicatorValue = keyWordFromProgram.findIndex(
                            data => {
                              return (
                                data ==
                                dataCommenFirst[0].valueChoice[idx]
                                  .choiceKeyword[index].nameKeyword.keywordName
                              );
                            }
                          );
                          // MEMO: Buat Object Keyword Baru
                          let objectForValueKeyword = {
                            nameKeyword:
                              dataCommenFirst[0].valueChoice[idx].choiceKeyword[
                                index
                              ].nameKeyword._id,
                            valueKeyword: 0
                          };
                          // MEMO: Cari Score Impact
                          var tryToGetScoreImpact =
                            Helper.triggerScoreImpactForBeAplus(
                              dataCommenFirst[0].valueChoice[idx].choiceKeyword[
                                index
                              ].valueKeyword,
                              rating
                            ) * hasilReturn;
                          // MEMO: Conditional -> Jika data ada pada daftar yg dipilih
                          if (indicatorValue == -1) {
                            objectForValueKeyword.valueKeyword =
                              dataCommenFirst[0].valueChoice[idx].choiceKeyword[
                                index
                              ].valueKeyword;
                            object.choiceKeyword.push(objectForValueKeyword);
                          } else {
                            objectForValueKeyword.valueKeyword =
                              dataCommenFirst[0].valueChoice[idx].choiceKeyword[
                                index
                              ].valueKeyword + tryToGetScoreImpact;
                            object.choiceKeyword.push(objectForValueKeyword);
                          }
                        }
                        valueProgramActivity.push(object);
                      }
                      // MEMO: Menambahkan Array Of Object ke Key Penilaian Awal Baru
                      firstCommentEditPlan.valueChoice = valueProgramActivity;
                      // MEMO: Variabel Akumulasi Rate dan Value Baru
                      acumulateRate = Helper.triggerAcumulateRateCommentFirstFromAdmin(
                        valueProgramActivity
                      );
                      // MEMO: Update Komen Pertama
                      AssessmentModel.findByIdAndUpdate(
                        firstCommentEditPlan._id,
                        {
                          userGetComment: firstCommentEditPlan.userGetComment,
                          totalRating: acumulateRate.countRate,
                          totalValueRating: acumulateRate.countAll,
                          typeProgram: firstCommentEditPlan.typeProgram,
                          activity: firstCommentEditPlan.activity,
                          valueChoice: firstCommentEditPlan.valueChoice,
                          dateComment: firstCommentEditPlan.dateComment,
                          status: firstCommentEditPlan.status
                        }
                      )

                        .then(data => {
                          // MEMO: Create Komen User
                          acumulateRate = Helper.triggerAcumulateRateCommentFirstFromAdmin(
                            valueProgramActivity
                          );
                          CommentModel.create({
                            userGetComment: userGetComment,
                            userGiftComment: userGiftComment,
                            rating: acumulateRate.countRate,
                            originalRate: rating,
                            valueRating: acumulateRate.countAll,
                            comment: comment,
                            dateComment: new Date(),
                            status: false,
                            typeAssess: typeAssess,
                            typeAssessValue: typeAssessValue,
                            typeAssessKeyword: typeAssessKeyword,
                            typeProgram: typeProgram,
                            valueProgramActivity: valueProgramActivity,
                            activity: activity,
                            othersMessage
                          })

                            .then(dataCreateCommentSuccess => {
                              // MEMO: Cari Profil User
                              // console.log(JSON.stringify(dataCreateCommentSuccess))
                              UserModel.findById(
                                dataCreateCommentSuccess.userGetComment
                              )

                                .then(dataUserGet => {
                                  // MEMO: Variabel Rate Baru
                                  let newRate = acumulateRate.countRate;
                                  // MEMO: Variabel Score Baru
                                  let newScore = acumulateRate.countAll;
                                  // MEMO: Update Rate dan Score User yg Dinilai
                                  UserModel.findByIdAndUpdate(
                                    dataCreateCommentSuccess.userGetComment,
                                    {
                                      rate: newRate,
                                      score: newScore
                                    }
                                  )
                                    .then(dataUserPost => {
                                      resolve(dataUserPost);
                                    })
                                    .catch(err => {
                                      reject(err);
                                    });
                                })
                                .catch(err => {
                                  reject(err);
                                });
                            })
                            .catch(err => {
                              reject(err);
                            });
                        })
                        .catch(err => {
                          reject(err);
                        });
                    })
                    .catch(err => {
                      reject(err);
                    });
                })
                .catch(err => {
                  reject(err);
                });
            })
            .catch(err => {
              reject(err);
            });
        }
      })
      .catch(error => {
        reject(error);
      });
  });
};

const getCommentAssessmentAdmin = payload => {
  return new Promise((resolve, reject) => {
    AssessmentModel.find({
      userGetComment: payload.userGetComment
    })
      .populate('userGetComment')
      // .populate('typeProgram', 'nameProgram')
      // .populate('activity', 'nameActivity')
      .populate('valueChoice.nameValue', 'valueName')
      .populate('valueChoice.choiceKeyword.nameKeyword', 'keywordName')
      .then(data => {
        const arrayData = [];
        for (let index = 0; index < data.length; index++) {
          let object = {
            id: data[index]._id,
            userGetComment: data[index].userGetComment.namaLengkap,
            totalRating: data[index].totalRating,
            totalValueRating: data[index].totalValueRating,
            typeProgram: data[index].typeProgram.nameProgram,
            activity: data[index].activity.nameActivity,
            valueChoice: []
          };
          for (
            let idxValue = 0;
            idxValue < data[index].valueChoice.length;
            idxValue++
          ) {
            let objectValue = {
              value: data[index].valueChoice[idxValue].nameValue.valueName,
              keyword: []
            };
            for (
              let idxKey = 0;
              idxKey < data[index].valueChoice[idxValue].choiceKeyword.length;
              idxKey++
            ) {
              let objectKey = {
                nameKey:
                  data[index].valueChoice[idxValue].choiceKeyword[idxKey]
                    .nameKeyword.keywordName,
                nilai:
                  data[index].valueChoice[idxValue].choiceKeyword[idxKey]
                    .valueKeyword
              };
              objectValue.keyword.push(objectKey);
            }
            object.valueChoice.push(objectValue);
          }
          arrayData.push(object);
        }
        resolve(arrayData);
      })
      .catch(error => {
        reject(error);
      });
  });
};

const editCommentAssessmentAdmin = payload => {
  return new Promise((resolve, reject) => {
    const valueChoice =
      typeof payload.valueChoice === 'string'
        ? JSON.parse(payload.valueChoice)
        : payload.valueChoice;
    const scoreAqumulate = Helper.triggerAcumulateRateCommentFirstFromAdmin(
      valueChoice
    );

    AssessmentModel.findByIdAndUpdate(payload.id, {
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
            resolve(err);
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
  postCommentAssessment,
  getUserDetailComment,
  postNewComment,
  getCommentAssessmentAdmin,
  editCommentAssessmentAdmin
};
