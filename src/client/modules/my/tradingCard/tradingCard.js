import { LightningElement } from 'lwc';

export default class TradingCard extends LightningElement {
    imgSrc = './resources/images/trading-card-placeholder.jpg';
    displayName = 'Lynn Fisher';
    description = 'A designer and CSS developer making weird web projects';

    strengths = ['CSS', 'HTML', 'design', 'illustration', 'obscure trivia'];

    _stickers = [
        'design',
        'css',
        'dogs',
        'flags',
        'puzzles',
        'film&tv',
        'music',
        'baking',
        'visual-arts',
        'tabletop-games',
        'performing-arts',
        'html'
    ];
    get stickers() {
        return this._stickers.map((sticker) => ({
            id: sticker,
            href: '#',
            imgSrc: `./resources/images/stickers/${sticker}.svg`,
            imgAlt: sticker
        }));
    }

    link = 'https://lynnandtonic.com';

    _email = 'lynn@andyet.com';
    get email() {
        if (this._email) {
            return `mailto:${this._email}`;
        }
        return false;
    }

    _twitter = 'lynnandtonic';
    get twitter() {
        if (this._twitter) {
            return `https://twitter.com/${this._twitter}`;
        }
        return false;
    }

    _codepen = 'lynnandtonic';
    get codepen() {
        if (this._codepen) {
            return `https://codepen.io/${this._codepen}`;
        }
        return false;
    }

    _github = 'lynnandtonic';
    get github() {
        if (this._github) {
            return `https://github.com/${this._github}`;
        }
        return false;
    }

    _linkedin = 'lynnandtonic';
    get linkedin() {
        if (this._linkedin) {
            return `https://www.linkedin.com/in/${this._linkedin}`;
        }
        return false;
    }

    _instagram = 'lynnandtonic';
    get instagram() {
        if (this._instagram) {
            return `https://www.instagram.com/${this._instagram}`;
        }
        return false;
    }
}
