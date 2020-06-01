const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const UserModel = require('../models/user/user.model');
const JWTHelper = require('../authentication/jwtHelper');
const UserDB = require('../database/users_db');

const registerUser = (payload) => {
  return new Promise((resolve, reject) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(payload.password, salt);
    console.log(payload);
    UserModel.create({
      namaLengkap: payload.namaLengkap,
      nik: payload.nik,
      level: payload.level,
      email: payload.email,
      password: hash,
      role: payload.role || 'user',
      division: payload.division,
      rate: 0,
      score: 0,
    })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const getAllUser = () => {
  return new Promise((resolve, reject) => {
    UserModel.find({})
      .populate('division')
      .then((response) => {
        const data = response.filter((item) => {
          return item.role.toLowerCase() !== 'admin';
        });
        resolve(data);
      })
      .catch((error) => reject(error));
  });
};

const loginUser = (payload) => {
  return new Promise((resolve, reject) => {
    UserModel.findOne({
      nik: payload.nik,
    })
      .populate('division')
      .then((response) => {
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
              division: response.division,
            });
            resolve(token);
          } else {
            resolve('Invalid Crendentials');
          }
        } else {
          resolve('data not valid');
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const forgotPassword = (payload) => {
  return new Promise((resolve, reject) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(payload.password, salt);
    UserModel.findOneAndUpdate(
      {
        nik: payload.nik,
        email: payload.email,
      },
      {
        password: hash,
        namaLengkap: payload.namaLengkap,
        level: payload.level,
        email: payload.email,
        division: payload.division,
      }
    )
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const changePassword = (payload) => {
  return new Promise((resolve, reject) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(payload.password, salt);
    UserModel.findOneAndUpdate(
      {
        nik: payload.nik,
      },
      {
        password: hash,
      }
    )
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const getUserByNik = (nik) => {
  return new Promise((resolve, reject) => {
    UserModel.findOne({
      nik,
    })
      .populate('division')
      .then((data) => {
        if (data) {
          resolve(data);
        } else {
          resolve('User not found');
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const deleteUser = (nik) => {
  return new Promise((resolve, reject) => {
    UserModel.findOneAndDelete({
      nik,
    })
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

// Migrated to DB

const getAllActiveUser = () => {
  return new Promise((resolve, reject) => {
    UserDB.getAllActiveUser()
      .then((result) => {
        const parseResponse = result.map((item) => {
          return {
            _id: item.id,
            namaLengkap: item.name,
            nik: item.NIK,
            level: item.level,
            email: item.email,
            password: item.password,
            role: 'user',
            rate: 0,
            score: 0,
            division: {
              divisionUserId: null,
              userIdHead: null,
              _id: item.division_id,
              division: item.division,
            },
          };
        });
        resolve(parseResponse);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const getUserByID = (id) => {
  return new Promise((resolve, reject) => {
    UserDB.getUserByID(id)
      .then((result) => {
        const parseResponse = result.map((item) => {
          return {
            _id: item.id,
            namaLengkap: item.name,
            nik: item.nik,
            level: item.level,
            email: item.email,
            password: item.password,
            role: 'user',
            rate: 0,
            score: 0,
          };
        });
        resolve(parseResponse);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const saveUser = (payload) => {
  return new Promise((resolve, reject) => {
    const { nik, namaLengkap, email, level, division, password } = payload;
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);
    const data = {
      division,
      email,
      level,
      namaLengkap,
      nik,
      password: hashPassword,
    };
    UserDB.saveUser(data)
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const login = (payload) => {
  return new Promise((resolve, reject) => {
    const { nik, password } = payload;
    UserDB.getUserByNIK(nik)
      .then((result) => {
        const isPasswordValid = bcrypt.compareSync(
          password,
          result[0].password
        );
        if (isPasswordValid) {
          const salt = bcrypt.genSaltSync(10);
          const passwordHasBeenHash = bcrypt.hashSync(result[0].password, salt);
          const token = JWTHelper.sign({
            id: result[0].id,
            namaLengkap: result[0].namaLengkap,
            password: passwordHasBeenHash,
            nik: result[0].nik,
            level: result[0].level,
            email: result[0].email,
          });
          return resolve(token);
        }
        resolve('Invalid Crendentials');
      })
      .catch((error) => {
        console.log(error, '===== cacacacac');
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
  deleteUser,

  getAllActiveUser,
  getUserByID,
  saveUser,
  login,
};
