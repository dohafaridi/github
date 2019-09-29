const express = require("express");
const axios = require("axios");

const router = express.Router();

router.get("/", (_, res) => res.render("pages/home"));

router.post("/users", ({ body: { user } }, res) =>
  axios
    .get(`https://api.github.com/users/${user}/repos`)
    .then(({ data }) => res.render("pages/home", { user, repos: data }))
    .catch(err => res.render("pages/home", { user }))
);

module.exports = router;
