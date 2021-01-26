const fs = require('fs');

const v = `^1`;
const unpkgHost = `https://unpkg.com/wicked-coolkit${v ? `@${v}` : ''}/dist`;
const stickersHost = `${unpkgHost}/stickers`;
const png = (name) => `${stickersHost}/png/${name}.png`;
const svg = (name) => `${stickersHost}/svg/${name}.svg`;
const script = (name) =>
    `<script async type="module" src="{{unpkg}}/${name}.js"></script>`;

const stickers = fs
    .readFileSync('./stickers.csv')
    .split('\n')
    .map((line) => {
        const [alt, name] = line.split(',').map(JSON.parse);
        return { alt, name };
    })
    .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()))
    .reduce((acc, s) => {
        acc[s.name] = {
            alt: s.alt,
            svg: svg(s.name),
            png: png(s.name)
        };
        return acc;
    }, {});

const scripts = ['tradingCard', 'hitCounter', 'webring'].reduce((acc, c) => {
    const tag = c.replace(/[A-Z]/g, (l) => `-${l.toLowerCase()}`);
    acc[c] = {
        script: script(c),
        tag: `<wck-${tag} host="${apiHost}"></wck-${tag}>`
    };
    return acc;
}, {});

const locals = {
    deployUrl:
        'https://heroku.com/deploy?template=https://github.com/andyet/wicked-coolkit-user',
    apiHost: 'wickedcoolkitapi.herokuapp.com',
    prodHost: 'https://wickedcoolkit.herokuapp.com',
    scripts,
    stickers,
    stickersZip: `${stickersHost}/stickers.zip`
};
