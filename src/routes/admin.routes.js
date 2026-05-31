const express = require("express");
const { deleteUser } = require("../controllers/admin.contollers");
//const isAuthentication = require("../utils/isAuthenticaton");
const router = express.Router();


router.delete("/delete-user", deleteUser)
//router.get("/users", isAuthenticationthentication ,getUsers)



module.exports = router;