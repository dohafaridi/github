const express = require("express");
const axios = require("axios");

const router = express.Router();

router.get("/", (_, res) => res.render("home"));

router.post("/users", (req, res) =>
  axios
    .get(`https://api.github.com/users/${req.body.user}/repos`)
    .then(({ data }) => res.render("home", { repos: data }))
    .catch(err => res.json(err))
);

module.exports = router;
