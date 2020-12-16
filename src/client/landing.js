import { createElement } from 'lwc';
import MyApp from 'my/app';

window.PRODUCTION = window.location.host.indexOf('localhost') === -1;

const app = createElement('my-app', { is: MyApp });
// eslint-disable-next-line @lwc/lwc/no-document-query
document.querySelector('#main').appendChild(app);
