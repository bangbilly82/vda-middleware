module.exports = function(header) {
  var regex = /.*[b|B]earer(?:\s+)(\S+)/;
  var result = regex.exec(header);
  return result ? result[1] : false;
};
