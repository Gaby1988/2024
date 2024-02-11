// require("dotenv").config();

// const mysql = require("mysql2/promise");

// // create a connection pool to the database

// const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

// const pool = mysql.createPool({
//   host: DB_HOST,
//   port: DB_PORT,
//   user: DB_USER,
//   password: DB_PASSWORD,
//   database: DB_NAME,
// });

// // try a connection

// pool.getConnection().catch(() => {
//   console.warn(
//     "Warning:",
//     "Failed to get a DB connection.",
//     "Did you create a .env file with valid credentials?",
//     "Routes using models won't work as intended"
//   );
// });

// // declare and fill models: that's where you should register your own managers

// const models = {};

// const ItemManager = require("./ItemManager");
// const UserManager = require("./UserManager");
// const CepagesManager = require("./CepagesManager");
// const ProfileTasteManager = require("./TasteProfileManager");
// const TasteManager = require("./TasteManager");
// const ReviewManager = require("./ReviewManager");
// const WineManager = require("./WineManager");
// const CepageListManager = require("./CepageListManager");
// const RecipeManager = require("./RecipeManager");

// models.item = new ItemManager();
// models.item.setDatabase(pool);

// models.user = new UserManager();
// models.user.setDatabase(pool);

// models.cepage = new CepagesManager();
// models.cepage.setDatabase(pool);

// models.cepageList = new CepageListManager();
// models.cepageList.setDatabase(pool);

// models.taste_profile = new ProfileTasteManager();
// models.taste_profile.setDatabase(pool);

// models.taste = new TasteManager();
// models.taste.setDatabase(pool);

// models.review = new ReviewManager();
// models.review.setDatabase(pool);

// models.wine = new WineManager();
// models.wine.setDatabase(pool);

// models.recipe = new RecipeManager();
// models.recipe.setDatabase(pool);

// // bonus: use a proxy to personalize error message,
// // when asking for a non existing model

// const handler = {
//   get(obj, prop) {
//     if (prop in obj) {
//       return obj[prop];
//     }

//     const pascalize = (string) =>
//       string.slice(0, 1).toUpperCase() + string.slice(1);

// throw new ReferenceError(
//   `models.${prop} is not defined. Did you create ${pascalize(
//     prop
//   )}Manager.js, and did you register it in backend/src/models/index.js?`
// );
//   },
// };

// module.exports = new Proxy(models, handler);

require("dotenv").config();
const fs = require("fs");
const path = require("path");
const mysql = require("mysql2/promise");

// create a connection pool to the database

const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

const pool = mysql.createPool({
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
});

// try a connection

pool.getConnection().catch(() => {
  console.warn(
    "Warning:",
    "Failed to get a DB connection.",
    "Did you create a .env file with valid credentials?",
    "Routes using models won't work as intended"
  );
});

// declare and fill models: that's where you should register your own managers
const models = fs
  .readdirSync(__dirname)
  .filter((file) => file !== "AbstractManager.js" && file !== "index.js")
  .reduce((acc, file) => {
    // eslint-disable-next-line global-require, import/no-dynamic-require
    const Manager = require(path.join(__dirname, file));

    const managerInstance = new Manager();
    managerInstance.setDatabase(pool);

    return { ...acc, [managerInstance.table]: managerInstance };
  }, {});

const handler = {
  get(obj, prop) {
    if (prop in obj) {
      return obj[prop];
    }

    const pascalize = (string) =>
      string.slice(0, 1).toUpperCase() + string.slice(1);

    throw new ReferenceError(
      `models.${prop} is not defined. Did you create ${pascalize(
        prop
      )}Manager.js, and did you register it in backend/src/models/index.js?`
    );
  },
};
module.exports = new Proxy(models, handler);
