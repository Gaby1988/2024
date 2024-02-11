const models = require("../models");

const findAllWines = (req, res) => {
  models.wine
    .findAll()
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const findWineById = (req, res) => {
  models.wine
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

const createNewWine = (req, res) => {
  const wine = req.body;
  models.wine
    .insert(wine)
    .then(([result]) => {
      res.location(`/wines/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const editWine = (req, res) => {
  const wine = req.body;
  wine.wine_id = parseInt(req.params.id, 10);
  models.wine
    .update(wine)
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

const deleteWine = (req, res) => {
  models.wine
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

module.exports = {
  findAllWines,
  findWineById,
  createNewWine,
  editWine,
  deleteWine,
};
