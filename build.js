const fs = require("fs");
const Handlebars = require("handlebars");
const path = require("path");

// TODO: change to ^1 to go live
const COOLKIT_VERSION = "";
const USER_REPO = "https://github.com/andyet/wicked-coolkit-user";
const API_HOST = "wickedcoolkitapi.herokuapp.com";
const PROD_URL = "https://wickedcoolkit.com";
const CDN_HOST = "https://unpkg.com/wicked-coolkit";
const CDN = CDN_HOST + (COOLKIT_VERSION ? `@${COOLKIT_VERSION}` : "") + "/dist";

const sticker = (p) => `${CDN}/stickers/${p}`;
const script = (name) =>
  `<script async type="module" src="${CDN}/${name}.js"></script>`;

const stickers = fs
  .readFileSync("./stickers.csv")
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
  dotMin: process.env.NODE_ENV === "production" ? ".min" : "",
};

const viewsDir = "views";
const publicDir = "public";
fs.readdirSync(viewsDir).forEach((v) => {
  const templateSrc = fs.readFileSync(path.join(viewsDir, v)).toString();
  const template = Handlebars.compile(templateSrc);
  fs.writeFileSync(path.join(publicDir, v), template(locals));
});
