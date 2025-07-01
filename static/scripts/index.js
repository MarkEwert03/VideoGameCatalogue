document.addEventListener('DOMContentLoaded', () => main());

function main() {
    // event listeners
    document.getElementById('select_submit').addEventListener('click', handleSelectUsers);
    document.getElementById('select_clear').addEventListener('click', clearUsers);
    document.getElementById('update_submit').addEventListener('click', handleUpdateUsers);
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

// populate it with data, then show the table
function populateTable(tableElem, data) {
    // Create ordered list of thead Ids
    let theadIds = Array.from(tableElem.querySelectorAll('th')).map(th => th.id);

    // Populate the table
    let tbody = tableElem.querySelector('tbody');
    tbody.innerHTML = ''; // clear any existing rows
    data.forEach(rowData => {
        // Create new row
        let newRow = document.createElement("tr");

        // Fill the row with values.
        theadIds.forEach(thID => {
            let newCell = document.createElement("td");
            newCell.textContent = rowData[thID];
            newRow.appendChild(newCell);
        });

        // Add row to table
        tbody.appendChild(newRow);
    });

    // Show table
    tableElem.style.display = "block";
}

function clearUsers() {
    let tableElem = document.getElementById('user_table');
    let tbody = tableElem.querySelector('tbody');
    tbody.innerHTML = ''; // clear any existing rows
    tableElem.style.display = 'none'; // hide the table
}

function handleUpdateUsers() {
    let param_user_id = document.querySelector('input[id=update_user_id]').value;
    let param_user_name = document.querySelector('input[name=userName]').value;
    let param_user_age = document.querySelector('input[name=userAge]').value;
    let param_dict = { user_id: parseInt(param_user_id), user_name: param_user_name, age: param_user_age };

    // Use fetch to send a POST request to the server
    fetch('/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(param_dict)
    })
        .then(response => response.json())
        .then(data => {
            let responseTextBox = document.getElementById("update_status");
            // messages opbtained from updateRequest.py
            let update_status_msg = data["update_status"];
            switch (update_status_msg) {
                case "success":
                    responseTextBox.innerHTML = `User ${param_user_id} now has been modified!`;
                    responseTextBox.style.color = "green";
                    // After a successful update, clear the input fields
                    document.getElementById('update_user_id').value = '';
                    document.querySelector('input[name=userName]').value = '';
                    document.querySelector('input[name=userAge]').value = '';
                    break;
                case "empty":
                    responseTextBox.innerHTML = `Please input a non-empty field for the age.`;
                    responseTextBox.style.color = "red";
                    break;
                case "non-integer":
                    responseTextBox.innerHTML = `Please input an integer for the age.`;
                    responseTextBox.style.color = "red";
                    break;
                case "negative":
                    responseTextBox.innerHTML = `Please input a positive age.`;
                    responseTextBox.style.color = "red";
                    break;
                case "large":
                    responseTextBox.innerHTML = `Please input a realistic human age (below 130 years)`;
                    responseTextBox.style.color = "red";
                    break;
                case "error":
                    responseTextBox.innerHTML = `User ${param_user_id} does not exist.`;
                    responseTextBox.style.color = "red";
                    break;
                default:
                    responseTextBox.innerHTML = `! UNHANDELED ERROR !`;
                    responseTextBox.style.color = "red";
                    break;
            }
        });
}
