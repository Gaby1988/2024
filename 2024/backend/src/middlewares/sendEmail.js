const mailer = require("./mailer");

const sendEmail = (req, res, next) => {
  const review = req.body;
  const emailOptions = {
    from: "atelierinovin@gmail.com",
    to: "atelierinovin@gmail.com",
    subject: "Nouvel avis sur l'atelier Inovin",
    html: `
    <p>Bonjour Cedric,</p>
    <p>Vous avez reçu un nouvel avis de la part de ${review.firstName} ${review.lastName}.</p>
    <p>Message : ${review.message}</p>
    <p>Évaluation : ${review.rating} / 5</p>
    <p>Si vous souhaitez contacter ${review.firstName}, envoyez-lui un mail à l'adresse suivante: ${review.email} </p>
  `,
  };

  mailer.sendMail(emailOptions, (err, info) => {
    if (err) {
      console.error(err);
    } else {
      console.info(info);
    }
    next();
  });
};

module.exports = { sendEmail };
