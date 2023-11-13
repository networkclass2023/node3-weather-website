import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import hbs from "hbs";
const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

// console.log(_dirname)
// console.log(_filename)
const publicDirectoryPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");
hbs.registerPartials(partialsPath);
const app = express();
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
  res.send("Weather");
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

app.listen(3000, () => {
  console.log("Page listen on port 3000");
});
