function attachEvents() {
    const locationInput = document.getElementById('location');
    const forecastElement = document.getElementById('forecast');
    const currentWeatherElement = document.getElementById('current');
    const upcomingWeaherElement = document.getElementById('upcoming');
    const getWeatherBtn = document.getElementById('submit');

    const weatherSymbols = {
        Sunny: '&#x2600;',
        'Partly sunny': '&#x26C5;',
        Overcast: '&#x2601;',
        Rain: '&#x2614;',
        Degrees: '&#176;',
    };

    getWeatherBtn.addEventListener('click', onGetWeatherClick);

    async function onGetWeatherClick(event) {
        try {
            document.querySelector('#current .label').textContent =
                'Current conditions';
            const locations = await getLocations();

            let lookedLocation = locations.find(
                (l) => l.code == locationInput.value
            );

            if (lookedLocation != undefined) {
                const currentWeather = await getCurrentWeather(
                    locationInput.value
                );
                const upcommingWeather = await getUpcommingWeaher(
                    locationInput.value
                );

                forecastElement.style.display = 'block';
                console.log(currentWeather);
                console.log(upcommingWeather);

                currentWeatherElement.appendChild(
                    createCurrentWeatherElement(currentWeather, weatherSymbols)
                );

                upcomingWeaherElement.appendChild(
                    createUpcommingWeatherElement(
                        upcommingWeather,
                        weatherSymbols
                    )
                );
            } else {
                throw new Error('Error');
            }
        } catch (error) {
            forecastElement.style.display = 'block';
            let currentWeatherchildrenList = Array.from(
                currentWeatherElement.children
            );

            let upcomingWeraherChildrenList = Array.from(
                upcomingWeaherElement.children
            );

            if (currentWeatherchildrenList.length > 0) {
                for (let i = 1; i < currentWeatherchildrenList.length; i++) {
                    currentWeatherchildrenList[i].remove();
                }

                for (let i = 1; i < upcomingWeraherChildrenList.length; i++) {
                    upcomingWeraherChildrenList[i].remove();
                }

                document.querySelector('#current .label').textContent = 'Error';
            } else {
                document.querySelector('#current .label').textContent = 'Error';
            }
        }
    }
}

function createCurrentWeatherElement(currentWeather, weatherSymbols) {
    let element = document.createElement('div');
    element.classList.add('forecasts');

    let conditionSymbolElement = document.createElement('span');
    conditionSymbolElement.classList.add('condition', 'symbol');
    conditionSymbolElement.innerHTML = `${
        weatherSymbols[currentWeather.forecast.condition]
    }`;

    let conditionContainer = document.createElement('span');
    conditionContainer.classList.add('condition');

    let nameData = document.createElement('span');
    nameData.classList.add('forecast-data');
    nameData.innerHTML = `${currentWeather.name}`;

    let degreesData = document.createElement('span');
    degreesData.classList.add('forecast-data');
    degreesData.innerHTML = `${currentWeather.forecast.low}&#176;/${currentWeather.forecast.high}&#176;`;

    let conditionData = document.createElement('span');
    conditionData.classList.add('forecast-data');
    conditionData.innerHTML = `${currentWeather.forecast.condition}`;

    conditionContainer.appendChild(nameData);
    conditionContainer.appendChild(degreesData);
    conditionContainer.appendChild(conditionData);

    element.appendChild(conditionSymbolElement);
    element.appendChild(conditionContainer);

    return element;
}

function createUpcommingWeatherElement(upcommingWeather, weatherSymbols) {
    let element = document.createElement('div');
    element.classList.add('forecast-info');

    upcommingWeather.forecast.forEach((w) => {
        let upcommingContainer = document.createElement('span');
        upcommingContainer.classList.add('upcoming');

        let symbolElement = document.createElement('span');
        symbolElement.classList.add('symbol');
        symbolElement.innerHTML = `${weatherSymbols[w.condition]}`;

        let degreesData = document.createElement('span');
        degreesData.classList.add('forecast-data');
        degreesData.innerHTML = `${w.low}&#176;/${w.high}&#176;`;

        let conditionData = document.createElement('span');
        conditionData.classList.add('forecast-data');
        conditionData.innerHTML = w.condition;

        upcommingContainer.appendChild(symbolElement);
        upcommingContainer.appendChild(degreesData);
        upcommingContainer.appendChild(conditionData);

        element.appendChild(upcommingContainer);
    });

    return element;
}

async function getLocations() {
    const response = await fetch(
        'http://localhost:3030/jsonstore/forecaster/locations'
    );
    const data = await response.json();

    return data;
}

async function getCurrentWeather(location) {
    const response = await fetch(
        'http://localhost:3030/jsonstore/forecaster/today/' + location
    );

    const currentWeather = await response.json();

    return currentWeather;
}

async function getUpcommingWeaher(location) {
    const response = await fetch(
        'http://localhost:3030/jsonstore/forecaster/upcoming/' + location
    );
    const upcommingWeatherData = await response.json();

    return upcommingWeatherData;
}

attachEvents();
