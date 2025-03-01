document.addEventListener("DOMContentLoaded", () => {
    const expenseForm = document.getElementById("expense-form");
    const expenseList = document.getElementById("expense-list");
    const totalAmount = document.getElementById("total-amount");

    // Load expenses from localStorage or initialize an empty array
    let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

    // Function to save expenses to localStorage
    function saveExpenses() {
        localStorage.setItem("expenses", JSON.stringify(expenses));
    }

    // Function to display expenses
    function displayExpenses() {
        expenseList.innerHTML = ""; // Clear the list
        let total = 0;

        expenses.forEach((expense, index) => {
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${expense.name}</td>
                <td>$${expense.amount.toFixed(2)}</td>
                <td>${expense.category}</td>
                <td>${expense.date}</td>
                <td>
                    <button class="delete-btn" data-index="${index}">Delete</button>
                </td>
            `;

            expenseList.appendChild(row);
            total += expense.amount;
        });

        totalAmount.textContent = total.toFixed(2);
    }

    // Add expense
    expenseForm.addEventListener("submit", (e) => {
        e.preventDefault(); // Prevent the form from submitting and refreshing the page

        const name = document.getElementById("expense-name").value;
        const amount = parseFloat(document.getElementById("expense-amount").value);
        const category = document.getElementById("expense-category").value;
        const date = document.getElementById("expense-date").value;

        if (name && !isNaN(amount) && category && date) {
            const expense = {
                name,
                amount,
                category,
                date
            };

            expenses.push(expense); // Add the new expense to the array
            saveExpenses(); // Save to localStorage
            displayExpenses(); // Update the displayed expenses
            expenseForm.reset(); // Clear the form
        } else {
            alert("Please fill in all fields correctly.");
        }
    });

    // Delete expense
    expenseList.addEventListener("click", (e) => {
        if (e.target.classList.contains("delete-btn")) {
            const index = e.target.dataset.index;
            expenses.splice(index, 1); // Remove the expense from the array
            saveExpenses(); // Save to localStorage
            displayExpenses(); // Update the displayed expenses
        }
    });

    // Initial display of expenses
    displayExpenses();
});