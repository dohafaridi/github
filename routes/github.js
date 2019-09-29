const express = require("express");
const axios = require("axios");
const redis = require("redis");

const client = redis.createClient();
const router = express.Router();

const setResponse = (res, user, repos) =>
  res.render("pages/home", { user, repos });

const cacheMiddleware = (req, res, next) =>
  client.get(req.body.user, (_, data) => {
    if (data) {
      return setResponse(res, req.body.user, JSON.parse(data));
    }
    next();
  });

router.get("/", (_, res) => res.render("pages/home"));

router.post("/users", cacheMiddleware, ({ body: { user } }, res) =>
  axios
    .get(`https://api.github.com/users/${user}/repos`)
    .then(({ data }) => {
      client.setex(user, 3600, JSON.stringify(data));
      return setResponse(res, user, data);
    })
    .catch(err => res.render("pages/home", { user }))
);

module.exports = router;
