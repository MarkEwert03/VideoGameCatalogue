function main() {
    // event listeners
    document.getElementById('selectSubmit').addEventListener('click', getUsers);
}

function getUsers() {
    // Use fetch to send a POST request to the server
    fetch('/select', {
        method: 'POST',
        headers: { 'Content-Type': 'applications/json' }
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

document.addEventListener('DOMContentLoaded', function () { main(); })