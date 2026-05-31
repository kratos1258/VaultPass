const express = require("express");
const { publicMessage } = require("../controllers/public.controllers");
const router = express.Router();


router.post("/post", publicMessage)


module.exports = router;