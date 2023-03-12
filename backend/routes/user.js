const router = require("express").Router();
const {
  loginUser,
  signupUser,
  // getall,
} = require("../controllers/userController");

router.post("/login", loginUser);

router.post("/signup", signupUser);

// router.get("/all", getall); testing backend

module.exports = router;
