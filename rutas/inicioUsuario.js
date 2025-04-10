const express = require("express");
const router = express.Router();
const link = require("../config/link");

router.get("/inicioUsuario", function (req, res) {
  if (!req.session.usuario) {
    res.redirect("regUsuario", { link });
  } else {
    res.render("inicioUsuario", { datos: req.session, link });
  }
});

module.exports = router;
