document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    const studentNameInput = document.getElementById("studentName");
    const studentIdInput = document.getElementById("studentId");
    const emailInput = document.getElementById("email");
    const contactInput = document.getElementById("contact");
    const studentsTable = document.getElementById("studentsTable").getElementsByTagName('tbody')[0];
    
    // Load existing students from localStorage
    loadStudents();


    // Function to add a new student
    form.addEventListener("submit", function(e) {
        e.preventDefault();

        // Get the values from the form
        let name = studentNameInput.value.trim();
        let id = studentIdInput.value.trim();
        let email = emailInput.value.trim();
        let contact = contactInput.value.trim();

        // Validate the inputs
        if (name === "" || id === "" || email === "" || contact === "") {
            alert("All fields are required!");
            return;
        }

        if (!/^[A-Za-z\s]+$/.test(name)) {
            alert("Student name can only contain letters.");
            return;
        }

        if (!/^\d+$/.test(id)) {
            alert("Student ID must be a number.");
            return;
        }

        if (!/^\d{10}$/.test(contact)) {
            alert("Contact number must be a valid 10-digit number.");
            return;
        }

        if (!/\S+@\S+\.\S+/.test(email)) {
            alert("Please enter a valid email address.");
            return;
        }

        // Add a new row in the table
        const newRow = studentsTable.insertRow();
        newRow.innerHTML = `
            <td>${name}</td>
            <td>${id}</td>
            <td>${email}</td>
            <td>${contact}</td>
            <td>
                <button onclick="editRecord(this)">Edit</button>
                <button onclick="deleteRecord(this)">Delete</button>
            </td>
        `;
        form.reset();
        updateLocalStorage();
    });


    // Function to load students from localStorage
    function loadStudents() {
        const storedStudents = localStorage.getItem("students");
        if (storedStudents) {
            const students = JSON.parse(storedStudents);
            students.forEach(student => {
                const newRow = studentsTable.insertRow();
                newRow.innerHTML = `
                    <td>${student.name}</td>
                    <td>${student.id}</td>
                    <td>${student.email}</td>
                    <td>${student.contact}</td>
                    <td>
                        <button onclick="editRecord(this)">Edit</button>
                        <button onclick="deleteRecord(this)">Delete</button>
                    </td>
                `;
            });
        }
    }

    // Function to edit a student's record
    window.editRecord = function(button) {
        const row = button.closest("tr");
        const cells = row.cells;

        studentNameInput.value = cells[0].innerText;
        studentIdInput.value = cells[1].innerText;
        emailInput.value = cells[2].innerText;
        contactInput.value = cells[3].innerText;

        row.remove();
        updateLocalStorage();
    };

    // Function to delete a student's record
    window.deleteRecord = function(button) {
        const row = button.closest("tr");
        row.remove();
        updateLocalStorage();
    };

    // Function to update localStorage
    function updateLocalStorage() {
        const rows = studentsTable.rows;
        const students = [];
        for (let i = 0; i < rows.length; i++) {
            const cells = rows[i].cells;
            students.push({
                name: cells[0].innerText,
                id: cells[1].innerText,
                email: cells[2].innerText,
                contact: cells[3].innerText
            });
        }
        localStorage.setItem("students", JSON.stringify(students));
    }
});
