document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');

    const predefinedEmail = 'user@example.com';
    const predefinedPassword = 'password123';

    // Basic email and password validation
    if (email === '' || password === '') {
        errorMessage.textContent = 'Please fill in both fields.';
    } else if (!validateEmail(email)) {
        errorMessage.textContent = 'Please enter a valid email address.';
    } else if (password.length < 6) {
        errorMessage.textContent = 'Password must be at least 6 characters long.';
    } else if (email !== predefinedEmail || password !== predefinedPassword) {
        errorMessage.textContent = 'Incorrect email or password.';
    } else {
        console.log('Email:', email);
        console.log('Password:', password);
        errorMessage.textContent = 'Login successful!';
        errorMessage.style.color = 'green';

        // Simulate redirection after successful login
        setTimeout(() => {
            window.location.href = 'home.html'; // Redirect to  another page
        }, 2000);
    }
});

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}
