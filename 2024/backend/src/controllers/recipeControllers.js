const models = require("../models");

const findAllRecipes = (req, res) => {
  models.recipe
    .findAll()
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const findRecipeById = (req, res) => {
  models.recipe
    .find(req.params.id)
    .then(([rows]) => {
      if (rows[0] == null) {
        res.sendStatus(404);
      } else {
        res.send(rows[0]);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const createRecipe = (req, res) => {
  const recipe = req.body;
  models.recipe
    .addRecipe(recipe)
    .then(([result]) => {
      res.status(200);
      res.location(`/recipes/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const findAllRecipesByUser = (req, res) => {
  req.body.user_id = req.params.id;
  const recipe = req.body;
  models.recipe
    .getRecipeByUserId(recipe)
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const findAllRecipesByUserAndBySessionDate = (req, res) => {
  const recipe = req.body;
  models.recipe
    .getRecipeByUserIdAndSessionDate(recipe)
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  findAllRecipes,
  findRecipeById,
  createRecipe,
  findAllRecipesByUser,
  findAllRecipesByUserAndBySessionDate,
};
