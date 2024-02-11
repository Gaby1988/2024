const AbstractManager = require("./AbstractManager");

class RecipeManager extends AbstractManager {
  constructor() {
    super({ table: "recipe" });
  }

  addRecipe(recipe) {
    return this.database.query(
      `insert into ${this.table} (cepage_name, cepage_level, user_id, session_date) values (?, ?, ?, ?)`,
      [recipe.cepage, recipe.level, recipe.user_id, recipe.session_date]
    );
  }

  getRecipeByUserId(recipe) {
    return this.database.query(
      `select * from ${this.table} where user_id = ?`,
      [recipe.user_id]
    );
  }

  getRecipeByUserIdAndSessionDate(recipe) {
    return this.database.query(
      `select * from ${this.table} where user_id = ? and session_date = ?`,
      [recipe.user_id, recipe.session_date]
    );
  }
}

module.exports = RecipeManager;
