const RateHelper = require('./RateHelper');

const triggerAcumulateRateCommentFirstFromAdmin = value => {
  return RateHelper.acumulateRateCommentFirstFromAdmin(value);
};
const triggerScoreImpact = (commentFirst, rating) => {
  return RateHelper.scoreImpact(commentFirst, rating);
};
const triggerScoreImpactForBeAplus = (commentFirst, rating) => {
  return RateHelper.scoreImpactForBeAplus(commentFirst, rating);
};
const triggerAqulumulateRate = rating => {
  return RateHelper.aqulumulateRate(rating);
};
const triggerIndicatorLevel = (getId, giftId) => {
  return RateHelper.indicatorLevel(getId, giftId);
};

module.exports = {
  triggerAcumulateRateCommentFirstFromAdmin,
  triggerScoreImpact,
  triggerAqulumulateRate,
  triggerIndicatorLevel,
  triggerScoreImpactForBeAplus
};
