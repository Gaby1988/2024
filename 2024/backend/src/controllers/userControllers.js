/* eslint-disable camelcase */
/* eslint-disable prettier/prettier */
const models = require("../models");

const getAllUsers = (req, res) => {
  models.user
    .findAll()
    .then(([user]) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const getUserById = (req, res) => {
  models.user
    .find(req.params.id)
    .then(([user]) => {
      if (user[0] == null) {
        res.sendStatus(404);
      } else {
        res.send(user[0]);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const createUser = (req, res) => {
  const user = req.body;
  if (user.is_admin === true) {
    user.is_admin = 1;
  } else {
    user.is_admin = 0;
  }
  const dataUser = [
    "firstname",
    "lastname",
    "email",
    "address",
    "zip_code",
    "city",
    "job",
    "hashedPassword",
    "is_admin",
  ].sort();
  const dataBody = Object.keys(req.body).toString().split(",").sort();
  console.info(`keyBody ${dataBody}`);
  console.info(`data user: ${dataUser}`);
  const filteredData = dataBody.every(
    (value, index) => value === dataUser[index]
  );
  console.info(`filtré ${filteredData}`);
  models.user
    .addUser(user, dataUser)
    .then(([result]) => {
      if (filteredData) {
        res.location(`/users/${result.insertId}`).sendStatus(201);
      } else {
        res.sendStatus(404);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const updateUser = (req, res) => {
  const user = req.body;
  user.user_id = parseInt(req.params.id, 10);

  models.user
    .updateUser(user)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const updateIsAdmin = (req, res) => {
  const user = req.body;

  user.user_id = parseInt(req.params.id, 10);

  models.user
    .updateAdmin(user)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const modifyUser = (req, res) => {
  const { id } = req.params;
  const { firstname, lastname, address, zip_code, city, job } = req.body;

  const user = {
    firstname,
    lastname,
    address,
    zip_code,
    city,
    job,
    user_id: id,
  };
  const dataUserKeys = Object.keys(user)
    .toString()
    .split(",")
    .filter((item) => item !== "user_id");
  const dataReqBodyKeys = Object.keys(req.body).toString().split(",");
  const filteredData = dataReqBodyKeys.every(
    (value, index) => value === dataUserKeys[index]
  );

  models.user
    .modifyUser(user)
    .then((data) => {
      if (data[0].affectedRows === 1 && filteredData) {
        res.status(200).json("patch succesful");
      } else {
        res.sendStatus(404);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

// const modifyUser = (req, res) => {
//   const user = req.body;
//   user.user_id = parseInt(req.params.id, 10);

//   models.user
//     .modifyUser(user)
//     .then((data) => {
//       if (data[0].affectedRows === 1) {
//         res.status(200).json("patch succesful");
//       } else {
//         res.sendStatus(404);
//       }
//     })
//     .catch((err) => {
//       console.error(err);
//       res.sendStatus(500);
//     });
// };
const destroy = (req, res) => {
  models.user
    .delete(req.params.id)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const getUserByEmailWithPasswordAndPassToNext = (req, res, next) => {
  models.user
    .findUserByEmail(req.body)
    .then(([users]) => {
      if (users[0] != null) {
        [req.user] = users;
        next();
      } else {
        res.sendStatus(401);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};

// const getUserInformation = (req, res) => {

//   // const userId = req.user_id;
//   // rajout de params pour récupérer id
//   const userId = req.params.user_id;
//   models.user
//     .find(userId)
//     .then(([user]) => {
//       if (user) {
//         const userInfo = {
//           userId: user[0].user_id,
//           name: user[0].firstname,
//           surname: user[0].lastname,
//           email: user[0].email,
//           role: user[0].is_admin,
//           adress: user[0].address,
//           zip: user[0].zip_code,
//           city: user[0].city,
//           fonction: user[0].job,
//         };
//         res.status(200).json(userInfo);
//       } else {
//         res.sendStatus(404);
//       }
//     })
//     .catch((err) => {
//       console.error(err);
//       res.sendStatus(500);
//     });
// };

const getUserInformation = (req, res) => {
  const userId = req.params.user_id;
  models.user
    .findById(userId) // rajout de la requête dans le manager
    .then(([user]) => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.sendStatus(404);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  modifyUser,
  destroy,
  getUserByEmailWithPasswordAndPassToNext,
  getUserInformation,
  updateIsAdmin,
};