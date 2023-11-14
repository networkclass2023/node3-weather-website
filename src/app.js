import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import hbs from "hbs";
import geocode from "./utils/geocode.js";
import forecast from "./utils/forecast.js";
const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

// console.log(_dirname)
// console.log(_filename)
const publicDirectoryPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");
hbs.registerPartials(partialsPath);
const app = express();
const port=process.env.PORT || 3000

app.use(express.static(publicDirectoryPath));
app.set("view engine", "hbs");
app.set("views", viewPath);
app.get("", (req, res) => {
  res.render("index.hbs", {
    title: "Weather",
    name: "CISCO",
  });
});
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "CISCO",
  });
});
app.get("/help", (req, res) => {
  res.render("help", {
    helptext: "help page",
    title: "Help",
    name: "CISCO",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide a search term.",
    });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }

      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }
        res.send({
          forecast: forecastData,
          location,
          address: req.query.address,
        });
      });
    }
  );

  // console.log(req.query.address);
  // res.send({
  // forecat: "It is raining.",
  // location: "Philadelphia",
  // address: req.query.address,
  // });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term.",
    });
  }

  console.log(req.query.search);
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "CISCO",
    errorMessage: "Help Page not Found",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "CISCO",
    errorMessage: "Page not Found",
  });
});

app.listen(port, () => {
  console.log("Page listen on port "+port);
});

