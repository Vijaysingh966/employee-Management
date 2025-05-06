const form = document.getElementById('employeeForm');
const list = document.getElementById('employeeList');
const searchInput = document.getElementById('search');
const api = 'http://localhost:5000/api/employee';

function fetchEmployee(search = '') {
    fetch(api + '?search=' + encodeURIComponent(search))
        .then(response => response.json())
        .then(data => {
            list.innerHTML = '';
            data.forEach(emp => {
                const li = document.createElement('li');
                li.innerHTML = `
                    <span>${emp.name} (${emp.department} - ${emp.status})</span>
                    <button onclick="deleteEmployee('${emp._id}')">Delete</button>
                `;
                list.appendChild(li);
            });
        })
        .catch(error => {
            console.error('Fetch Error:', error);
        });
}

form.onsubmit = function (e) {
    e.preventDefault();

    const body = {
        name: form.name.value,
        email: form.email.value,
        phone: form.phone.value,
        department: form.department.value,
        status: form.status.value
    };

    fetch(api, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    })
    .then(() => {
        form.reset();
        fetchEmployee();
    })
    .catch(error => {
        console.error('POST Error:', error);
    });
};

function deleteEmployee(id) {
    fetch(api + '/' + id, { method: 'DELETE' })
        .then(() => fetchEmployee())
        .catch(error => console.error('Delete Error:', error));
}

searchInput.addEventListener('input', function () {
    fetchEmployee(searchInput.value);
});

fetchEmployee();
