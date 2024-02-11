const models = require("../models");

const findAllCepages = (req, res) => {
  models.cepage
    .findAll()
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const findCepageById = (req, res) => {
  models.cepage
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

const createNewCepage = (req, res) => {
  const cepage = req.body;
  models.cepage
    .insert(cepage)
    .then(([result]) => {
      res.location(`/cepages/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const editCepage = (req, res) => {
  const cepage = req.body;
  cepage.cepage_id = parseInt(req.params.id, 10);
  models.cepage
    .update(cepage)
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

const deleteCepage = (req, res) => {
  models.cepageList
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
  findAllCepages,
  findCepageById,
  createNewCepage,
  editCepage,
  deleteCepage,
};
