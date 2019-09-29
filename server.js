const express = require("express");
const exphbs = require("express-handlebars");

const app = express();
const port = process.env.PORT || 8080;

app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

app.use(express.urlencoded({ extended: true }));

app.use("/", require("./routes/github"));
app.use((_, res) => res.status(404).render("pages/404"));

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
