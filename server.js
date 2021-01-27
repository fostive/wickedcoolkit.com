const fs = require("fs");
const path = require("path");
const express = require("express");
const hbs = require("hbs");

const PROD = process.env.NODE_ENV === "production";
const PORT = process.env.PORT || 5000;
const COOLKIT_VERSION = require("./package.json").dependencies[
  "wicked-coolkit"
];
const USER_REPO = "https://github.com/andyet/wicked-coolkit-user";
const API_HOST = "wickedcoolkitapi.herokuapp.com";
const PROD_URL = "https://wickedcoolkit.com";
const CDN_HOST = "https://unpkg.com/wicked-coolkit";
const CDN = `${CDN_HOST}@${COOLKIT_VERSION}/dist`;
const SF_INSTALL_URL = `https://login.salesforce.com/packaging/installPackage.apexp?p0=04t4x000000Qr7pAAC`;

const sticker = (p) => `${CDN}/stickers/${p}`;
const script = (name) =>
  `<script async type="module" src="${CDN}/${name}.js"></script>`;

const stickers = fs
  .readFileSync(
    path.join(
      "node_modules",
      "wicked-coolkit",
      "dist",
      "stickers",
      "stickers.csv"
    )
  )
  .toString()
  .split("\n")
  .slice(1)
  .filter(Boolean)
  .map((line) => {
    const [alt, name] = line.split(",").map(JSON.parse);
    return { alt, name };
  })
  .sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()))
  .reduce((acc, s) => {
    const tag = s.name
      .replace(/&/g, "-")
      .replace(/-./g, (l) => l[1].toUpperCase());
    acc[tag] = {
      alt: s.alt,
      svg: sticker(`svg/${s.name}.svg`),
      png: sticker(`png/${s.name}.png`),
    };
    return acc;
  }, {});

const components = ["tradingCard", "hitCounter", "webring"].reduce((acc, c) => {
  const tag = c.replace(/[A-Z]/g, (l) => `-${l.toLowerCase()}`);
  acc[c] = {
    script: script(c),
    tag: `<wck-${tag} host="${API_HOST}"></wck-${tag}>`,
  };
  return acc;
}, {});

const locals = {
  deployUrl: `https://heroku.com/deploy?template=${USER_REPO}`,
  prodHost: PROD_URL,
  components,
  stickers,
  stickersZip: sticker("stickers.zip"),
  dotMin: PROD ? ".min" : "",
};

const app = express();

app.use(express.static("./public"));
app.set("view engine", "html");
app.engine("html", hbs.__express);

app.get("/", (req, res) => res.render("index", locals));
app.get("/steps", (req, res) => res.render("steps", locals));
app.get("/getting-started", (req, res) =>
  res.render("getting-started", locals)
);
app.get("/install", (req, res) => res.redirect(SF_INSTALL_URL));

app.listen(PORT, () => {
  console.log(
    `Server started on ${PROD ? "port " : "http://localhost:"}${PORT}`
  );
});
