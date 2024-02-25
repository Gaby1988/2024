const validateSignUpUser = (req, res, next) => {
  //   const regexEmail = /@(gmail\.com|hotmail\.com|.+\.com|.+\.fr)$/i;
  const regexPassword = /^(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{20,55}$/;
  //   , email
  const { password } = req.body;
  //   if (email.match(regexEmail)) {
  if (password.match(regexPassword)) {
    res.locals.password = password;
    next();
  } else {
    res.status(400).json({ messagePassword: "mot de passe incorrect" });
    console.error("password refusé");
  }
};
//   else {
//     res.status(400).json({ message: "email incorrect" });
//     console.error("email refusé");
//   }
// };

module.exports = {
  validateSignUpUser,
};
