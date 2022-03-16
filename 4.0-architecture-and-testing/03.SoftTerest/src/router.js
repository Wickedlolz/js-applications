export function init(links) {
    const main = document.querySelector('main');

    const nav = document.querySelector('nav');
    nav.addEventListener('click', onNavigate);

    const context = {
        showSection,
        redirect,
        updateNav,
    };

    return context;

    function showSection(section) {
        main.replaceChildren(section);
    }

    function onNavigate(event) {
        event.preventDefault();

        if (event.target.tagName == 'A') {
            const path = new URL(event.target.href);
            redirect(path.pathname);
        } else if (event.target.id == 'logo-btn') {
            const path = new URL(event.target.parentElement.href);
            redirect(path.pathname);
        }
    }

    function redirect(path, ...params) {
        const handler = links[path];

        if (typeof handler == 'function') {
            handler(context, ...params);
        }
    }

    function updateNav() {
        const user = localStorage.getItem('user');

        if (user) {
            nav.querySelectorAll('.guest').forEach(
                (x) => (x.style.display = 'none')
            );
            nav.querySelectorAll('.user').forEach(
                (x) => (x.style.display = 'block')
            );
        } else {
            nav.querySelectorAll('.user').forEach(
                (x) => (x.style.display = 'none')
            );

            nav.querySelectorAll('.guest').forEach(
                (x) => (x.style.display = 'block')
            );
        }
    }
}
