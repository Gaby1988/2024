const AbstractManager = require("./AbstractManager");

class CepageManager extends AbstractManager {
  constructor() {
    super({ table: "cepage" });
  }

  insert(cepage) {
    return this.database.query(`insert into ${this.table} (name) values (?)`, [
      cepage.name,
    ]);
  }

  update(cepage) {
    console.info(cepage.cepage_id);
    return this.database.query(
      `update ${this.table} set name = ? where cepage_id = ?`,
      [cepage.name, cepage.cepage_id]
    );
  }
}

module.exports = CepageManager;
