const express = require("express");
const router = express();
const { checkZipCode } = require("./controllers/check-zipcode");

router.get("/enderecos/:zipCode", checkZipCode);

module.exports = router;