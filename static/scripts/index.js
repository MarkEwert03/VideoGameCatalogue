function main() {
    // event listeners
    document.getElementById('select_submit').addEventListener('click', selectUsers);
    document.getElementById('select_clear').addEventListener('click', clearUsers);
    document.getElementById('update_submit').addEventListener('click', updateUsers);

}

function selectUsers() {
    var param_age = document.querySelector('select[name=ageRange]').value;
    var param_dict = { param_age: param_age };

    // Use fetch to send a POST request to the server
    fetch('/select', {
        method: 'POST',
        headers: { 'Content-Type': 'applications/json' },
        body: JSON.stringify(param_dict)
    })
        .then(response => response.json())
        .then(data => populateTable(document.getElementById('user_table'), data))
}

// populate it with data, then show the table
function populateTable(tableElem, data) {
    // Create ordered list of thead Ids
    var theadIds = Array.from(tableElem.querySelectorAll('th')).map(th => th.id);

    // Populate the table
    var tbody = tableElem.querySelector('tbody');
    tbody.innerHTML = ''; // clear any existing rows
    data.forEach(rowData => {
        // Create new row
        var newRow = document.createElement("tr");

        // Fill the row with values.
        theadIds.forEach(thID => {
            var newCell = document.createElement("td");
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
    var tableElem = document.getElementById('user_table');
    var tbody = tableElem.querySelector('tbody');
    tbody.innerHTML = ''; // clear any existing rows
    tableElem.style.display = 'none'; // hide the table
}

function updateUsers() {
    param_user_id = document.querySelector('input[id=update_user_id]').value;
    param_user_name = document.querySelector('input[name=userName]').value;
    param_user_age = document.querySelector('input[name=userAge]').value;
    param_dict = { user_id: parseInt(param_user_id), user_name: param_user_name, age: parseInt(param_user_age) };

    // Use fetch to send a POST request to the server
    fetch('/update', {
        method: 'POST',
        headers: { 'Content-Type': 'applications/json' },
        body: JSON.stringify(param_dict)
    })
        .then(response => response.json())
        .then(data => {
            responseTextBox = document.getElementById("update_status");
            if (data["update_status"] == "success") {
                responseTextBox.innerHTML = `User ${param_user_id} now has been modified!`
                responseTextBox.style.color = "green";
            } else {
                responseTextBox.innerHTML = `User ${param_user_id} does not exist`
                responseTextBox.style.color = "red";
            }
        });
}

document.addEventListener('DOMContentLoaded', function () { main(); })