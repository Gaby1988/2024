const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const hashingOptions = {
  type: argon2.argon2id,
  memoryCost: 2 ** 16,
  timeCost: 5,
  parallelism: 1,
};

const hashPassword = (req, res, next) => {
  console.info("local password = ", res.locals.password);
  argon2
    .hash(res.locals.password, hashingOptions)
    .then((hashedPassword) => {
      req.body.hashedPassword = hashedPassword;
      delete req.body.password;

      next();
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const verifyPassword = (req, res) => {
  argon2

    .verify(req.user.hashedPassword, req.body.password)

    .then((isVerified) => {
      if (isVerified) {
        const payload = {
          user_id: req.user.user_id,
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, {
          expiresIn: "2h",
        });
        delete req.user.hashedPassword;

        res.json({ token });
      } else {
        res.sendStatus(401);
      }
    })

    .catch((err) => {
      console.error(err);

      res.sendStatus(500);
    });
};

const verifyToken = (req, res, next) => {
  try {
    const authorizationHeader = req.get("Authorization");

    if (authorizationHeader == null) {
      throw new Error("Authorization header is missing");
    }

    const [type, token] = authorizationHeader.split(" ");

    if (type !== "Bearer") {
      throw new Error("Authorization header has not the 'Bearer' type");
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.user_id = decodedToken.user_id;

    next();
  } catch (err) {
    console.error(err);
    res.sendStatus(401);
  }
};

module.exports = {
  hashPassword,
  verifyPassword,
  verifyToken,
};
