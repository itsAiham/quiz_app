const express = require("express");
const fetch = require("node-fetch").default;

const app = express();
const PORT = process.env.PORT || 3000;
const morgan = require("morgan");

app.use(morgan("dev"));

const api = require("./routes/api"); // external route to our own API
app.use(express.json());
app.use("/api", api);

app.use(express.static("public")); // the client side of out webapp

app.get("/", async (req, res) => {
  const response = fetch("/index", {
    method: "GET",
  });
  res.json(await response.json());
});

app.get("/login", async (req, res) => {
  const response = fetch("/quiz", {
    method: "GET",
  });
  res.json(await response.json());
});

app.get("/result", async (req, res) => {
  fetch("result", {
    method: "Get",
  });
  res.render("result");
});

app.get("/home", async (req, res) => {
  fetch("home", {
    method: "Get",
  });
  res.render("home");
});

app.get("/quiz", async (req, res) => {
  fetch("quiz", {
    method: "Get",
  })
    .then((resp) => resp.json())
    .then((response) => {
      location.href = response.href;
    });
});

app.listen(PORT, () => {
  console.log("Liestening on port =>  " + PORT);
});
