document.addEventListener('DOMContentLoaded', () => main());

function main() {
    // event listeners
    document.getElementById('select_submit').addEventListener('click', handleSelectUsers);
    document.getElementById('select_clear').addEventListener('click', clearUsers);
    document.getElementById('update_submit').addEventListener('click', handleUpdateUser);
}

// Fetch and display users (uses GET with query param)
const handleSelectUsers = () => {
    const selectBtn = document.getElementById('select_submit');
    selectBtn.disabled = true;

    const param_age = document.querySelector('select[name=ageRange]').value;
    const url = (
        param_age === "all" ? '/select' : `/select?param_age=${encodeURIComponent(param_age)}`
    );

    fetch(url, { method: 'GET' })
        .then(response => {
            if (!response.ok) throw new Error(`HTTP error ${response.status}`);
            return response.json();
        })
        .then(data => populateTable(document.getElementById('user_table'), data))
        .catch(err => alert('Failed to fetch users: ' + err))
        .finally(() => {
            selectBtn.disabled = false;
        });
};

// Render user table
const populateTable = (tableElem, data) => {
    const theadIds = Array.from(tableElem.querySelectorAll('th')).map(th => th.id);
    const tbody = tableElem.querySelector('tbody');
    tbody.innerHTML = '';
    data.forEach(rowData => {
        const newRow = document.createElement("tr");
        theadIds.forEach(thID => {
            const newCell = document.createElement("td");
            newCell.textContent = rowData[thID] ?? '';
            newRow.appendChild(newCell);
        });
        tbody.appendChild(newRow);
    });
    tableElem.style.display = "block";
};

// Clear the user table
const clearUsers = () => {
    const tableElem = document.getElementById('user_table');
    const tbody = tableElem.querySelector('tbody');
    tbody.innerHTML = '';
    tableElem.style.display = 'none';
};

// Handle user update (uses POST)
const handleUpdateUser = () => {
    const updateBtn = document.getElementById('update_submit');
    updateBtn.disabled = true;

    const param_user_id = document.querySelector('input[id=update_user_id]').value.trim();
    const param_user_name = document.querySelector('input[name=userName]').value.trim();
    const param_user_age = document.querySelector('input[name=userAge]').value.trim();
    const param_dict = {
        "user_id": parseInt(param_user_id),
        "user_name": param_user_name,
        "age": param_user_age
    };

    fetch('/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(param_dict)
    })
        .then(response => {
            if (!response.ok) throw new Error(`HTTP error ${response.status}`);
            return response.json();
        })
        .then(data => {
            showUpdateStatus(data["update_status"], param_user_id);
            if (data["update_status"] === "success") {
                clearUpdateFields();
            }
        })
        .catch(err => {
            showUpdateStatus("error", param_user_id);
            alert('Failed to update user: ' + err);
        })
        .finally(() => {
            updateBtn.disabled = false;
        });
};

// Show update status to user
const showUpdateStatus = (status, userId) => {
    const responseTextBox = document.getElementById("update_status");
    switch (status) {
        case "success":
            responseTextBox.textContent = `User ${userId} has been modified!`;
            responseTextBox.style.color = "green";
            break;
        case "error":
            responseTextBox.textContent = `User ${userId} does not exist.`;
            responseTextBox.style.color = "red";
            break;
        case "empty":
            responseTextBox.textContent = `Please input a non-empty field for the age.`;
            responseTextBox.style.color = "red";
            break;
        case "non-integer":
            responseTextBox.textContent = `Please input an integer for the age.`;
            responseTextBox.style.color = "red";
            break;
        case "negative":
            responseTextBox.textContent = `Please input a positive age.`;
            responseTextBox.style.color = "red";
            break;
        case "large":
            responseTextBox.textContent = `Please input a realistic human age (below 130 years)`;
            responseTextBox.style.color = "red";
            break;
        default:
            responseTextBox.textContent = `! UNHANDLED ERROR !`;
            responseTextBox.style.color = "red";
            break;
    }
};

// Clear the update form inputs
const clearUpdateFields = () => {
    document.getElementById('update_user_id').value = '';
    document.querySelector('input[name=userName]').value = '';
    document.querySelector('input[name=userAge]').value = '';
};