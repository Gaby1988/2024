const models = require("../models");

const findAllTasteProfile = (req, res) => {
  models.taste_profile
    .findAll()
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const findTasteProfileById = (req, res) => {
  models.taste_profile
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

const createNewTasteProfile = (req, res) => {
  const tasteProfile = req.body;
  models.taste_profile
    .insert(tasteProfile)
    .then(([result]) => {
      res.location(`/tasteprofile/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const editTasteProfile = (req, res) => {
  const tasteProfile = req.body;
  tasteProfile.taste_profile_id = parseInt(req.params.id, 10);
  models.taste_profile
    .update(tasteProfile)
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

const deleteTasteProfile = (req, res) => {
  models.taste_profile
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
  findAllTasteProfile,
  findTasteProfileById,
  createNewTasteProfile,
  editTasteProfile,
  deleteTasteProfile,
};
