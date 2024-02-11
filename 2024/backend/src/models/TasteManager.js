const AbstractManager = require("./AbstractManager");

class TasteManager extends AbstractManager {
  constructor() {
    super({ table: "taste" });
  }

  insert(taste) {
    return this.database.query(`insert into ${this.table} (name) values (?)`, [
      taste.name,
    ]);
  }

  update(taste) {
    return this.database.query(
      `update ${this.table} set name = ? where taste_id = ?`,
      [taste.name, taste.taste_id]
    );
  }
}

module.exports = TasteManager;
