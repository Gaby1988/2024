const AbstractManager = require("./AbstractManager");

class CepageListManager extends AbstractManager {
  constructor() {
    super({ table: "cepage_list" });
  }

  updateCepageList(cepageList) {
    return this.database.query(
      `update ${this.table} set cepageOne = ?, cepageTwo = ?,   cepageThree = ?, cepageFour = ?`,
      [
        cepageList.cepageOne,
        cepageList.cepageTwo,
        cepageList.cepageThree,
        cepageList.cepageFour,
      ]
    );
  }
}

module.exports = CepageListManager;
