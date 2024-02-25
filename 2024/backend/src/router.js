const express = require("express");

const router = express.Router();

const {
  hashPassword,
  verifyPassword,
  verifyToken,
} = require("./middlewares/auth");
const { validateSignUpUser } = require("./validators/signUpUser");

const { sendEmail } = require("./middlewares/sendEmail");

const itemControllers = require("./controllers/itemControllers");
const userControllers = require("./controllers/userControllers");
const cepageControllers = require("./controllers/cepageControllers");
const reviewControllers = require("./controllers/reviewControllers");
const tasteControllers = require("./controllers/tasteControllers");
const wineControllers = require("./controllers/wineControllers");
const profileTasteController = require("./controllers/profileTasteControllers");
const recipeControllers = require("./controllers/recipeControllers");

console.error(userControllers.patchUser);

router.post(
  "/users",
  validateSignUpUser,
  hashPassword,
  userControllers.createUser
);

router.post(
  "/login",
  userControllers.getUserByEmailWithPasswordAndPassToNext,
  verifyPassword
);

router.get("/items", itemControllers.browse);
router.get("/items/:id", itemControllers.read);
router.put("/items/:id", itemControllers.edit);
router.post("/items", itemControllers.add);
router.delete("/items/:id", itemControllers.destroy);

router.get("/users", userControllers.getAllUsers);
router.get("/users/:id", userControllers.getUserById);
router.put("/users/:id", userControllers.updateUser);
router.delete("/userinformation/:id", userControllers.destroy);
// router.post("/userinformation/:id", userControllers.modifyUser);
// changement en put c'est un update
router.put("/userinformation/:id", userControllers.modifyUser);
router.put("/isadmin/:id", userControllers.updateIsAdmin);
router.delete("/users/:id", userControllers.destroy);
router.post(
  "/userinformation",
  verifyToken,
  userControllers.getUserInformation
);
// changement en get et middleware verifytoken retiré
router.get("/userinformation/:user_id", userControllers.getUserInformation);
// -----------------

router.get("/cepages", cepageControllers.findAllCepages);
router.get("/cepages/:id", cepageControllers.findCepageById);
router.post("/cepages", cepageControllers.createNewCepage);
router.put("/cepages/:id", cepageControllers.editCepage);
router.delete("/cepages/:id", cepageControllers.deleteCepage);

router.get("/recipes", recipeControllers.findAllRecipes);
router.get("/recipes-by-user/:id", recipeControllers.findAllRecipesByUser);
router.get(
  "/recipes-by-user-and-session-date",
  recipeControllers.findAllRecipesByUserAndBySessionDate
);
router.post("/recipes", recipeControllers.createRecipe);

router.get("/tastes", tasteControllers.tasteBrowse);
router.get("/tastes/:id", tasteControllers.read);
router.put("/tastes/:id", tasteControllers.edit);
router.post("/tastes", tasteControllers.add);
router.delete("/tastes/:id", tasteControllers.destroy);

router.get("/profil-taste", profileTasteController.findAllTasteProfile);
router.get("/profil-taste/:id", profileTasteController.findTasteProfileById);
router.put("/profil-taste/:id", profileTasteController.editTasteProfile);
router.post("/profil-taste", profileTasteController.createNewTasteProfile);
router.delete("/profil-taste/:id", profileTasteController.deleteTasteProfile);

router.post("/reviews", sendEmail, reviewControllers.createNewReview);

router.get("/wines", wineControllers.findAllWines);
router.get("/wines/:id", wineControllers.findWineById);
router.put("/wines/:id", wineControllers.editWine);
router.post("/wines", wineControllers.createNewWine);
router.delete("/wines/:id", wineControllers.deleteWine);

module.exports = router;
