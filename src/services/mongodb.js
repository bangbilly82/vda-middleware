const mongoose = require('mongoose');
const Config = require('../../config');

const createMongoConnection = async () => {
  await mongoose.connect(Config.get('/mongodb').host, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
};

module.exports = createMongoConnection;
