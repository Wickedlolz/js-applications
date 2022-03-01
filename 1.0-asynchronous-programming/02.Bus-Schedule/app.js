function solve() {
    const infoSpan = document.querySelector('.info');
    const departBtn = document.getElementById('depart');
    const arriveBtn = document.getElementById('arrive');
    const url = 'http://localhost:3030/jsonstore/bus/schedule/';
    let nextStop = 'depot';

    async function depart() {
        const response = await fetch(url + nextStop);
        const data = await response.json();

        departBtn.setAttribute('disabled', true);
        arriveBtn.removeAttribute('disabled');
        infoSpan.textContent = `Next stop ${data.name}`;
    }

    async function arrive() {
        const response = await fetch(url + nextStop);
        const data = await response.json();
        infoSpan.textContent = `Arriving at ${data.name}`;
        nextStop = data.next;

        arriveBtn.setAttribute('disabled', true);
        departBtn.removeAttribute('disabled');
    }

    return {
        depart,
        arrive,
    };
}

let result = solve();
