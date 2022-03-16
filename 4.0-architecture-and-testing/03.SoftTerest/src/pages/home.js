const homeSection = document.getElementById('home-view');

export function showHome(context) {
    context.updateNav();
    context.showSection(homeSection);
}
