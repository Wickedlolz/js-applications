import { render } from '../lib.js';
import { navigation } from '../pages/navigation.js';

const nav = document.getElementById('nav-header');
const main = document.getElementById('main-content');

function ctxRender(content) {
    render(content, main);
}

export function decorateContext(context, next) {
    render(navigation(context), nav);
    context.render = ctxRender;
    next();
}
