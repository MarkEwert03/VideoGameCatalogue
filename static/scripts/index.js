function main() {
    // event listeners
    document.getElementById('selectSubmit').addEventListener('click', getUsers);
    document.getElementById('selectClear').addEventListener('click', clearUsers);
}

function getUsers() {
    var param_age = document.querySelector('select[name="ageRange"]').value;
    var param_dict = { param_age: param_age };

    // Use fetch to send a POST request to the server
    fetch('/select', {
        method: 'POST',
        headers: { 'Content-Type': 'applications/json' },
        body: JSON.stringify(param_dict)
    })
        .then(response => response.json())
        .then(data => populateTable(document.getElementById('userTable'), data))
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
    var tableElem = document.getElementById('userTable');
    var tbody = tableElem.querySelector('tbody');
    tbody.innerHTML = ''; // clear any existing rows
    tableElem.style.display = 'none'; // hide the table
}

document.addEventListener('DOMContentLoaded', function () { main(); })