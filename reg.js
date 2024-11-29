// script.js
document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();  // Prevent the form from submitting the traditional way

    // Get the form data
    let username = document.getElementById('username').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    // Store the user data in localStorage (for simplicity, in the browser)
    let userData = {
        username: username,
        email: email,
        password: password
    };

    // Store the data in localStorage
    localStorage.setItem('userData', JSON.stringify(userData));

    // Display a success message
    document.getElementById('message').textContent = 'Registration successful!';

    // Optionally, clear the form fields
    document.getElementById('registerForm').reset();
});
