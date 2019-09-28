const express = require("express");
const exphbs = require("express-handlebars");

const app = express();
const port = process.env.PORT || 8080;

app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

app.use(express.urlencoded());

app.use("/", require("./routes/github"));

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
