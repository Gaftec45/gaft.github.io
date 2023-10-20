const patientForm = document.getElementById("patientForm");
const patientTableBody = document.getElementById("patientTableBody");
const submitButton = document.getElementById("submitButton");
const updateButton = document.getElementById("updateButton");
let currentlyEditing = null;

patientForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const email = document.getElementById("email").value;
  const gender = document.getElementById("gender").value;
  const recentlyInNigeria = document.getElementById("recentlyInNigeria").checked;

  if (currentlyEditing === null) {
    // Add a new record
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
      <td>${firstName}</td>
      <td>${lastName}</td>
      <td>${email}</td>
      <td>${gender}</td>
      <td>${recentlyInNigeria ? "Yes" : "No"}</td>
      <td>
        <button class="edit-btn">Edit</button>
      </td>
      <td>
        <button class="delete-btn">Delete</button>
      </td>
    `;
    patientTableBody.appendChild(newRow);
  } else {
    // Update an existing record
    currentlyEditing.cells[0].textContent = firstName;
    currentlyEditing.cells[1].textContent = lastName;
    currentlyEditing.cells[2].textContent = email;
    currentlyEditing.cells[3].textContent = gender;
    currentlyEditing.cells[4].textContent = recentlyInNigeria ? "Yes" : "No";
    updateButton.style.display = "none";
    submitButton.style.display = "block";
    currentlyEditing = null;
  }

  patientForm.reset();
});

patientTableBody.addEventListener("click", function (e) {
  if (e.target.classList.contains("edit-btn")) {
    const row = e.target.parentNode.parentNode;
    currentlyEditing = row;
    document.getElementById("firstName").value = row.cells[0].textContent;
    document.getElementById("lastName").value = row.cells[1].textContent;
    document.getElementById("email").value = row.cells[2].textContent;
    document.getElementById("gender").value = row.cells[3].textContent;
    document.getElementById("recentlyInNigeria").checked =
      row.cells[4].textContent === "Yes";
    updateButton.style.display = "block";
    submitButton.style.display = "none";
  } else if (e.target.classList.contains("delete-btn")) {
    const row = e.target.parentNode.parentNode;
    patientTableBody.removeChild(row);
    currentlyEditing = null;
    updateButton.style.display = "none";
    submitButton.style.display = "block";
  }
});

// Add a click event listener for the updateButton
updateButton.addEventListener("click", function (e) {
  e.preventDefault();
  // Update code here (same as in the submit handler)
  currentlyEditing.cells[0].textContent = document.getElementById("firstName").value;
  currentlyEditing.cells[1].textContent = document.getElementById("lastName").value;
  currentlyEditing.cells[2].textContent = document.getElementById("email").value;
  currentlyEditing.cells[3].textContent = document.getElementById("gender").value;
  currentlyEditing.cells[4].textContent = document.getElementById("recentlyInNigeria").checked ? "Yes" : "No";
  updateButton.style.display = "none";
  submitButton.style.display = "block";
  currentlyEditing = null;
  patientForm.reset();
});
