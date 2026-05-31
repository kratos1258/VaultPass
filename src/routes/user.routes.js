const express = require("express");
const { registration, login, makeAdmin, getUsers,  } = require("../controllers/user.contollers");
const isAuthentication = require("../utils/isAuthenticaton");
const router = express.Router();


router.post("/register", registration)
router.post("/login", login)
router.patch("/new-admin/:userId", makeAdmin)
router.get("/users", isAuthentication, getUsers)

module.exports = router;
