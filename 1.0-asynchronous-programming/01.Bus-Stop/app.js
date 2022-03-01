async function getInfo() {
    const stopId = document.getElementById('stopId');
    const stopName = document.getElementById('stopName');
    const busesList = document.getElementById('buses');

    try {
        const response = await fetch(
            'http://localhost:3030/jsonstore/bus/businfo/' + stopId.value
        );

        if (response.ok == false) {
            const error = await response.json();
            throw new Error(error.message);
        }

        const data = await response.json();
        stopName.textContent = data.name;

        busesList.innerHTML = '';
        for (let key in data.buses) {
            const li = document.createElement('li');
            li.textContent = `Bus ${key} arrives in ${data.buses[key]} minutes`;
            buses.appendChild(li);
        }

        stopId.value = '';
    } catch (error) {
        stopName.textContent = 'Error';
        busesList.innerHTML = '';
    }
}
