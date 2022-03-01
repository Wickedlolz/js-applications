function attachEvents() {
    const refreshBtn = document.getElementById('refresh');
    const submitBtn = document.getElementById('submit');

    refreshBtn.addEventListener('click', onRefresh);
    submitBtn.addEventListener('click', onCreateMessage);
}

attachEvents();

async function onRefresh(event) {
    const url = 'http://localhost:3030/jsonstore/messenger';
    const messages = document.getElementById('messages');

    try {
        const response = await fetch(url);

        if (response.ok == false) {
            const error = await response.json();
            throw new Error(error.message);
        }

        const messagesList = await response.json();

        let result = [];

        for (let key in messagesList) {
            let message = messagesList[key];

            result.push(`${message.author}: ${message.content}`);
        }

        messages.value = result.join('\n');
    } catch (error) {
        alert(error.message);
    }
}

async function onCreateMessage(event) {
    const url = 'http://localhost:3030/jsonstore/messenger';
    const author = document.querySelector('[name="author"]');
    const content = document.querySelector('[name="content"]');

    try {
        const response = await fetch(url, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                author: author.value,
                content: content.value,
            }),
        });

        if (response.ok == false) {
            const error = await response.json();
            throw new Error(error.message);
        }

        content.value = '';
    } catch (error) {
        alert(error.message);
    }
}
