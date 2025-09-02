document.addEventListener('DOMContentLoaded', () => main());

function main() {
    // event listeners
    document.getElementById('select_submit').addEventListener('click', handleSelectCustomers);
    document.getElementById('select_clear').addEventListener('click', clearCustomers);
    document.getElementById('update_submit').addEventListener('click', handleUpdateCustomer);
    document.getElementById('insert_submit').addEventListener('click', handleInsertCustomer);
    document.getElementById('delete_submit').addEventListener('click', handleDeleteCustomer);
}

// Fetch and display customers (uses GET with query param)
const handleSelectCustomers = () => {
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
        .then(data => populateTable(document.getElementById('customer_table'), data))
        .catch(err => alert('Failed to fetch customers: ' + err))
        .finally(() => {
            selectBtn.disabled = false;
        });
};

// Render customer table
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

// Clear the customer table
const clearCustomers = () => {
    const tableElem = document.getElementById('customer_table');
    const tbody = tableElem.querySelector('tbody');
    tbody.innerHTML = '';
    tableElem.style.display = 'none';
};

// Handle customer update (uses POST)
const handleUpdateCustomer = () => {
    const updateBtn = document.getElementById('update_submit');
    updateBtn.disabled = true;

    const param_customer_id = document.querySelector('input[id=update_customer_id]').value.trim();
    const param_customer_name = document.querySelector('input[name=customerName]').value.trim();
    const param_customer_age = document.querySelector('input[name=customerAge]').value.trim();
    const param_dict = {
        "customer_id": parseInt(param_customer_id),
        "customer_name": param_customer_name,
        "age": param_customer_age
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
            showUpdateStatus(data["update_status"], param_customer_id);
            if (data["update_status"] === "success") {
                clearUpdateFields();
            }
        })
        .catch(err => {
            showUpdateStatus("error", param_customer_id);
            alert('Failed to update customer: ' + err);
        })
        .finally(() => {
            updateBtn.disabled = false;
        });
};

// Show update status to customer
const showUpdateStatus = (status, customerId) => {
    const responseTextBox = document.getElementById("update_status");
    switch (status) {
        case "success":
            responseTextBox.textContent = `Customer ${customerId} has been modified!`;
            responseTextBox.style.color = "green";
            break;
        case "error":
            responseTextBox.textContent = `Customer ${customerId} does not exist.`;
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
    document.getElementById('update_customer_id').value = '';
    document.querySelector('input[name=customerName]').value = '';
    document.querySelector('input[name=customerAge]').value = '';
};

// Handle customer insert (uses POST)
const handleInsertCustomer = () => {
    const insertBtn = document.getElementById('insert_submit');
    insertBtn.disabled = true;

    const param_customer_name = document.querySelector('input[name=insertCustomerName]').value.trim();
    const param_customer_age = document.querySelector('input[name=insertCustomerAge]').value.trim();
    const param_dict = {
        "customer_name": param_customer_name,
        "age": param_customer_age
    };

    fetch('/insert', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(param_dict)
    })
        .then(response => {
            if (!response.ok) throw new Error(`HTTP error ${response.status}`);
            return response.json();
        })
        .then(data => {
            showInsertStatus(data["insert_status"], param_customer_name);
            if (data["insert_status"] === "success") {
                clearInsertFields();
            }
        })
        .catch(err => {
            showInsertStatus("error", param_customer_name);
            alert('Failed to insert customer: ' + err);
        })
        .finally(() => {
            insertBtn.disabled = false;
        });
};

// Show insert status to customer
const showInsertStatus = (status, customerName) => {
    const responseTextBox = document.getElementById("insert_status");
    switch (status) {
        case "success":
            responseTextBox.textContent = `Customer ${customerName} has been added successfully!`;
            responseTextBox.style.color = "green";
            break;
        case "error":
            responseTextBox.textContent = `Failed to add customer ${customerName}.`;
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

// Clear the insert form inputs
const clearInsertFields = () => {
    document.querySelector('input[name=insertCustomerName]').value = '';
    document.querySelector('input[name=insertCustomerAge]').value = '';
};

// Handle customer delete (uses POST)
const handleDeleteCustomer = () => {
    const deleteBtn = document.getElementById('delete_submit');
    deleteBtn.disabled = true;

    const param_customer_id = document.querySelector('input[name=deleteCustomerID]').value.trim();
    const param_dict = {
        "customer_id": parseInt(param_customer_id)
    };

    fetch('/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(param_dict)
    })
        .then(response => {
            if (!response.ok) throw new Error(`HTTP error ${response.status}`);
            return response.json();
        })
        .then(data => {
            showDeleteStatus(data["delete_status"], param_customer_id);
            if (data["delete_status"] === "success") {
                clearDeleteFields();
            }
        })
        .catch(err => {
            showDeleteStatus("error", param_customer_id);
            alert('Failed to delete customer: ' + err);
        })
        .finally(() => {
            deleteBtn.disabled = false;
        });
};

// Show delete status to customer
const showDeleteStatus = (status, customerId) => {
    const responseTextBox = document.getElementById("delete_status");
    switch (status) {
        case "success":
            responseTextBox.textContent = `Customer ${customerId} has been removed successfully!`;
            responseTextBox.style.color = "green";
            break;
        case "error":
            responseTextBox.textContent = `Customer ${customerId} does not exist or could not be deleted.`;
            responseTextBox.style.color = "red";
            break;
        default:
            responseTextBox.textContent = `! UNHANDLED ERROR !`;
            responseTextBox.style.color = "red";
            break;
    }
};

// Clear the delete form inputs
const clearDeleteFields = () => {
    document.querySelector('input[name=deleteCustomerID]').value = '';
};
