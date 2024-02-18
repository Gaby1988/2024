const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    super({ table: "user" });
  }

  // addUser(user) {
  //   return this.database.query(
  //     `insert into ${this.table} (firstname, lastname, email, address, zip_code, city, job, hashedPassword, is_admin ) values (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  //     [
  //       user.firstname,
  //       user.lastname,
  //       user.email,
  //       user.address,
  //       user.zip_code,
  //       user.city,
  //       user.job,
  //       user.hashedPassword,
  //       user.is_admin,
  //     ]
  //   );
  // }

  // addUser(user) {
  //   const keys = Object.keys(user);
  //   const values = Object.values(user);
  //   const placeHolders = keys.map(() => "?").join(",");
  // const query = `INSERT INTO ${this.table} (${keys.join(
  //   ", "
  // )}) VALUES (${placeHolders})`;
  // return this.database.query(query, values);
  // }

  // addUser(user) {
  //   const placeHolders = Object.keys(user)
  //     .map(() => "?")
  //     .join(", ");
  //   console.info(`longueur :${placeHolders}`);
  //   return this.database.query(
  //     `INSERT INTO ${this.table} ( firstname, lastname, email, address, zip_code, city, job, hashedPassword, is_admin ) VALUES (${placeHolders})`,
  //     [
  //       user.firstname,
  //       user.lastname,
  //       user.email,
  //       user.address,
  //       user.zip_code,
  //       user.city,
  //       user.job,
  //       user.hashedPassword,
  //       user.is_admin,
  //     ]
  //   );
  // }

  addUser(user, dataUser) {
    const placeHolders = "?".repeat(dataUser.length).split("").join(",");
    const userDataValues = dataUser.map((info) => user[info]);
    return this.database.query(
      `INSERT INTO ${this.table} (${dataUser.join(
        ","
      )}) VALUES (${placeHolders})`,
      userDataValues
    );
  }

  // modifyUser(user) {
  //   return this.database.query(
  //     `UPDATE ${this.table} SET firstname = ?, lastname = ?, address = ?, zip_code = ?, city = ?, job = ? WHERE user_id = ?`,
  //     [
  //       user.firstname,
  //       user.lastname,
  //       user.address,
  //       user.zip_code,
  //       user.city,
  //       user.job,
  //       user.user_id,
  //     ]
  //   );
  // }
  
  // modifyUser(user) {
  //   const dataUser = "firstname,lastname,address,zip_code,city,job"
  //     .split(",")
  //     .map((x) => x.concat(" = ?"))
  //     .join(",");

  //   return this.database.query(
  //     `UPDATE ${this.table} SET ${dataUser} WHERE user_id = ?`,
  //     [
  //       user.firstname,
  //       user.lastname,
  //       user.address,
  //       user.zip_code,
  //       user.city,
  //       user.job,
  //       user.user_id,
  //     ]
  //   );
  // }
  
  // ou
  modifyUser(user) {
    const dataUser = "firstname,lastname,address,zip_code,city,job".split(",");
    const dataUserJoin = dataUser.map((x) => x.concat(" = ?")).join(", ");
    const userDataValues = dataUser.map((data) => user[data]);
    return this.database.query(
      `UPDATE ${this.table} SET ${dataUserJoin} WHERE user_id = ?`,
      [...userDataValues, user.user_id]
    );
  }
  // modifyUser(user) {
  //   const dataUser = "firstname,lastname,address,zip_code,city,job".split(",");
  //   const dataUserSet = dataUser.map((x) => x.concat(" = ?")).join(",");
  //   const dataUserKeys = Object.keys(user)
  //     .toString()
  //     .split(",")
  //     .filter((item) => item !== "user_id");

  //   const filteredData = dataUserKeys.every(
  //     (value, index) => value === dataUser[index]
  //   );
  //   console.info(filteredData);
  //   if (filteredData) {
  //     return this.database.query(
  //       `UPDATE ${this.table} SET ${dataUserSet} WHERE user_id = ?`,
  //       [
  //         user.firstname,
  //         user.lastname,
  //         user.address,
  //         user.zip_code,
  //         user.city,
  //         user.job,
  //         user.user_id,
  //       ]
  //     );
  //   }
  //   return null;
  // }

  // updateUser(user) {
  // return this.database.query(
  //   `update ${this.table} set firstname = ?, lastname = ?,   email = ?, address = ?, zip_code = ?, city = ?, job = ?, is_admin = ? where user_id = ?`,
  //   [
  //     user.firstname,
  //     user.lastname,
  //     user.email,
  //     user.address,
  //     user.zip_code,
  //     user.city,
  //     user.job,
  //     user.is_admin,
  //     user.user_id,
  //   ]
  // );
  // }

  updateUser(user) {
    const dataUser =
      "firstname,lastname,email,address,zip_code,city,job,is_admin"
        .split(",")
        .map((x) => x.concat(" = ?"))
        .join(", ");

    return this.database.query(
      `update ${this.table} set ${dataUser} where user_id = ?`,
      [
        user.firstname,
        user.lastname,
        user.email,
        user.address,
        user.zip_code,
        user.city,
        user.job,
        user.is_admin,
        user.user_id,
      ]
    );
  }

  updateAdmin(user) {
    return this.database.query(
      `update ${this.table} set is_admin = ? where user_id = ?`,
      [user.is_admin, user.user_id]
    );
  }

  findUserByEmail(user) {
    return this.database.query(`select * from ${this.table} where email = ?`, [
      user.email,
    ]);
  }

  findById(userId) {
    return this.database.query(
      `select lastname, firstname, email, address, zip_code, city, job from  ${this.table} where ${this.table}_id = ?`,
      [userId]
    );
  }
}

module.exports = UserManager;
