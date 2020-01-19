const acumulateRateCommentFirstFromAdmin = valueChoice => {
  let countAll = 0;
  let countRate = 0;
  let countPerKeyword = 0;
  let countPerVal = 0;

  for (let index = 0; index < valueChoice.length; index++) {
    for (let idx = 0; idx < valueChoice[index].choiceKeyword.length; idx++) {
      if (valueChoice[index].choiceKeyword.length - 1 === idx) {
        countPerKeyword += Number(
          valueChoice[index].choiceKeyword[idx].valueKeyword
        );
        countPerVal +=
          countPerKeyword / valueChoice[index].choiceKeyword.length;
        countPerKeyword = 0;
      } else {
        countPerKeyword += valueChoice[index].choiceKeyword[idx].valueKeyword;
      }
    }
  }
  countAll += countPerVal / valueChoice.length;

  if (countAll <= 0) {
    countRate = 0;
  } else if (countAll <= 200) {
    countRate = 1;
  } else if (countAll <= 400) {
    countRate = 2;
  } else if (countAll <= 600) {
    countRate = 3;
  } else if (countAll <= 800) {
    countRate = 4;
  } else if (countAll <= 1000) {
    countRate = 5;
  } else if (countAll <= 1200) {
    countRate = 6;
  }

  let object = {
    countAll: countAll,
    countRate: countRate
  };
  return object;
};

const scoreImpact = (commentFirst, rating) => {
  const aqumulateRate = rating - commentFirst.totalRating;
  let scoreImpact = indicatorScoreImpact(aqumulateRate);
  return scoreImpact;
};

const scoreImpactForBeAplus = (commentFirst, rating) => {
  let countRateComentFirst = 0;
  if (commentFirst <= 0) {
    countRateComentFirst = 0;
  } else if (commentFirst <= 200) {
    countRateComentFirst = 1;
  } else if (commentFirst <= 400) {
    countRateComentFirst = 2;
  } else if (commentFirst <= 600) {
    countRateComentFirst = 3;
  } else if (commentFirst <= 800) {
    countRateComentFirst = 4;
  } else if (commentFirst <= 1000) {
    countRateComentFirst = 5;
  } else if (commentFirst <= 1200) {
    countRateComentFirst = 6;
  }
  let countRate = rating;
  if(countRate === -1){
    const aqumulateRate = 0 - countRateComentFirst;
    let scoreImpact = indicatorScoreImpact(aqumulateRate);
    return scoreImpact;

  }else{
    const aqumulateRate = countRate - countRateComentFirst
  let scoreImpact = indicatorScoreImpact(aqumulateRate)
  return scoreImpact
  }
};

const indicatorScoreImpact = value => {
  switch (value) {
    case -5:
      return -25;
    case -4:
      return -20;
    case -3:
      return -15;
    case -2:
      return -10;
    case -1:
      return -5;
    case 0:
      return 0;
    case 1:
      return 5;
    case 2:
      return 10;
    case 3:
      return 15;
    case 4:
      return 20;
    case 5:
      return 25;
    default:
      return 0;
  }
};

const indicatorLevel = (getId, giftId) => {
  const bedaLevel = giftId.level - getId.level;
  if (getId._id === giftId._id) {
    return 0.9;
  } else {
    if (getId.level === giftId.level) {
      return 0.9;
    } else if (getId.level > giftId.level) {
      if (bedaLevel === -1) {
        return 1;
      } else if (bedaLevel === -2) {
        return 1.1;
      } else if (bedaLevel === -3) {
        return 1.2;
      } else if (bedaLevel === -4) {
        return 1.3;
      } else if (bedaLevel === -5) {
        return 1.4;
      } else if (bedaLevel === -6) {
        return 1.5;
      }
    } else if (getId.level < giftId.level) {
      if (bedaLevel === 1) {
        return 0.8;
      } else if (bedaLevel === 2) {
        return 0.7;
      } else if (bedaLevel === 3) {
        return 0.6;
      } else if (bedaLevel === 4) {
        return 0.5;
      } else if (bedaLevel === 5) {
        return 0.4;
      } else if (bedaLevel === 6) {
        return 0.3;
      }
    }
  }
};

const aqulumulateRate = countAll => {
  switch (countAll) {
    case 0:
      return 0;
    case 1:
      return 200;
    case 2:
      return 400;
    case 3:
      return 600;
    case 4:
      return 800;
    case 5:
      return 1000;
    case 6:
      return 1200;
    default:
      return 0;
  }
};

module.exports = {
  acumulateRateCommentFirstFromAdmin,
  scoreImpact,
  aqulumulateRate,
  indicatorLevel,
  scoreImpactForBeAplus
};
