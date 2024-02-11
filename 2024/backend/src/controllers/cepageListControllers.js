const models = require("../models");

const chooseCeapgesForAtelier = (req, res) => {
  console.error(req.body);
  const cepagesForAtelier = req.body;
  models.cepageList
    .updateCepageList(cepagesForAtelier)
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
  chooseCeapgesForAtelier,
};
