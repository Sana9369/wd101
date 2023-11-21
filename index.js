const registrationForm = document.getElementById('reg-form');
const datatable = document.getElementById('table-data');
const tablebody = datatable.querySelector('tbody');
const dobin = document.getElementById('dob');
const dobError = document.getElementById('dobError');
window.addEventListener('load', () => {
updatedatatable();
});
registrationForm.addEventListener('submit', (event) => {
event.preventDefault();
const userData = {
name: document.getElementById('name').value,
email: document.getElementById('email').value,
password: document.getElementById('password').value,
dob: document.getElementById('dob').value,
terms: document.getElementById('terms').checked
};
if (!userdatavalidation(userData)) {
const errorMessage = document.createElement('p');
const dateField = document.getElementById('dob');
errorMessage.classList.add('error-message');
errorMessage.textContent = 'Invalid Age';
dateField.parentNode.appendChild(errorMessage);
} else {
userdatasaving(userData);
updatedatatable();
formClear();
}
});
function userdatavalidation(userData) {
const minAge = 18;
const maxAge = 55;
const today = new Date();
const birthDate = new Date(userData.dob);
const age = today.getFullYear() - birthDate.getFullYear();
if (age < minAge || age > maxAge) {
return false;
}
return true;
}
function userdatasaving(userData) {
const existingUserData = JSON.parse(localStorage.getItem('userList')) || [];
existingUserData.push(userData);
localStorage.setItem('userList', JSON.stringify(existingUserData));
}
function updatedatatable() {
tablebody.innerHTML = '';
const userList = JSON.parse(localStorage.getItem('userList')) || [];
userList.forEach((userData) => {
const userDataRow = createarow(userData);
tablebody.appendChild(userDataRow);
});
if (userList.length > 0) {
datatable.classList.remove('hidden');
} else {
datatable.classList.add('hidden');
}
}
function createarow(userData) {
const row = document.createElement('tr');
row.innerHTML = `
<td>${userData.name}</td>
<td>${userData.email}</td>
<td>${userData.password}</td>
<td>${userData.dob}</td>
<td>${userData.terms ? 'true' : 'false'}</td>
`;
return row;
}
function formClear() {
registrationForm.reset();
}
