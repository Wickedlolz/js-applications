import { html, render } from './node_modules/lit-html/lit-html.js';

const studentRow = (student) => html`
    <tr>
        <td>${student.firstName} ${student.lastName}</td>
        <td>${student.email}</td>
        <td>${student.course}</td>
    </tr>
`;

const studentRows = (students) => html` ${students.map(studentRow)} `;

async function solve() {
    const searchField = document.getElementById('searchField');
    document.querySelector('#searchBtn').addEventListener('click', onClick);
    const students = await getAllStudents();

    render(studentRows(students), document.querySelector('.container tbody'));

    function onClick(event) {
        const trElements = document.querySelectorAll('.container tbody tr');
        trElements.forEach((row) => row.classList.remove('select'));

        if (searchField.value == '') {
            return;
        }

        trElements.forEach((row) => {
            const [firstRow, secondRow, thirdRow] = row.children;

            if (
                firstRow.textContent
                    .toLocaleLowerCase()
                    .includes(searchField.value.toLocaleLowerCase()) ||
                secondRow.textContent
                    .toLocaleLowerCase()
                    .includes(searchField.value.toLocaleLowerCase()) ||
                thirdRow.textContent
                    .toLocaleLowerCase()
                    .includes(searchField.value.toLocaleLowerCase())
            ) {
                row.classList.add('select');
            } else {
                row.classList.remove('select');
            }
        });
    }
}

solve();

async function getAllStudents() {
    const url = 'http://localhost:3030/jsonstore/advanced/table';

    try {
        const response = await fetch(url);

        if (response.ok == false) {
            const err = await response.json();
            throw new Error(err.message);
        }

        const students = await response.json();

        return Object.values(students);
    } catch (error) {
        alert(error.message);
    }
}
