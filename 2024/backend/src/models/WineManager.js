const AbstractManager = require("./AbstractManager");

class WineManager extends AbstractManager {
  constructor() {
    super({ table: "wine" });
  }

  update(wine) {
    return this.database.query(
      `update ${this.table} set name = ?, description= ? where wine_id = ?`,
      [wine.name, wine.description, wine.wine_id]
    );
  }
}

module.exports = WineManager;
