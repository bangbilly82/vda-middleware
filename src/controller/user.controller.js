const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const UserModel = require('../models/user/user.model');
const JWTHelper = require('../authentication/jwtHelper');

const registerUser = payload => {
  return new Promise((resolve, reject) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(payload.password, salt);
    UserModel.create({
      namaLengkap: payload.namaLengkap,
      nik: payload.nik,
      level: payload.level,
      email: payload.email,
      password: hash,
      role: payload.role || 'user',
      division: mongoose.Types.ObjectId(),
      rate: 0,
      score: 0
    })
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        reject(error);
      });
  });
};

const getAllUser = () => {
  return new Promise((resolve, reject) => {
    UserModel.find()
      .then(response => {
        const data = response.filter(item => {
          return item.role.toLowerCase() !== 'admin';
        });
        resolve(data);
      })
      .catch(error => reject(error));
  });
};

const loginUser = payload => {
  return new Promise((resolve, reject) => {
    UserModel.findOne({
      nik: payload.nik
    })
      .populate('division')
      .then(response => {
        if (response) {
          if (bcrypt.compareSync(payload.password, response.password)) {
            const salt = bcrypt.genSaltSync(10);
            const passwordHasBeenHash = bcrypt.hashSync(
              response.password,
              salt
            );
            const token = JWTHelper.sign({
              id: response._id,
              namaLengkap: response.namaLengkap,
              password: passwordHasBeenHash,
              nik: response.nik,
              level: response.level,
              email: response.email,
              role: response.role,
              rate: response.rate,
              score: response.score,
              division: response.division
            });
            resolve(token);
          } else {
            resolve('Invalid Crendentials');
          }
        } else {
          resolve({
            status: 200,
            message: 'User not found'
          });
        }
      })
      .catch(error => {
        reject(error);
      });
  });
};

const forgotPassword = payload => {
  return new Promise((resolve, reject) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(payload.password, salt);
    UserModel.findOneAndUpdate(
      {
        nik: payload.nik,
        email: payload.email
      },
      {
        password: hash,
        namaLengkap: payload.namaLengkap,
        level: payload.level,
        email: payload.email,
        division: payload.division
      }
    )
      .then(data => {
        resolve(data);
      })
      .catch(error => {
        reject(error);
      });
  });
};

const changePassword = payload => {
  return new Promise((resolve, reject) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(payload.password, salt);
    UserModel.findOneAndUpdate(
      {
        nik: payload.nik
      },
      {
        password: hash
      }
    )
      .then(data => {
        resolve(data);
      })
      .catch(error => {
        reject(error);
      });
  });
};

const getUserByNik = nik => {
  return new Promise((resolve, reject) => {
    UserModel.findOne({
      nik
    })
      .populate('division')
      .then(data => {
        if (data) {
          resolve(data);
        } else {
          resolve('User not found');
        }
      })
      .catch(error => {
        reject(error);
      });
  });
};

const deleteUser = nik => {
  return new Promise((resolve, reject) => {
    UserModel.findOneAndDelete({
      nik
    })
      .then(data => {
        resolve(data);
      })
      .catch(error => {
        reject(error);
      });
  });
};

module.exports = {
  registerUser,
  getAllUser,
  loginUser,
  forgotPassword,
  changePassword,
  getUserByNik,
  deleteUser
};
