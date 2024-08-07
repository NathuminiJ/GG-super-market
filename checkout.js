// Load order data from local storage
function loadOrder() {
    const order = JSON.parse(localStorage.getItem('order')) || [];
    const totalPrice = localStorage.getItem('totalPrice') || '0.00';

    const tableBody = document.querySelector('#order-table tbody');
    tableBody.innerHTML = '';

    order.forEach(item => { 
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.category}</td>
            <td>${item.quantity}</td>
            <td>${item.price}</td>
        `;
        tableBody.appendChild(row);
    });

    document.getElementById('total-price').textContent = `$${totalPrice}`;
}

// Handle form submission
function handleFormSubmit(event) {
    event.preventDefault();

    // Basic validation
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;
    const city = document.getElementById('city').value;
    const postalCode = document.getElementById('postal-code').value;
    const cardNumber = document.getElementById('card-number').value;
    const expiryDate = document.getElementById('expiry-date').value;
    const cvv = document.getElementById('cvv').value;

    if (!name || !email || !phone || !address || !city || !postalCode || !cardNumber || !expiryDate || !cvv) {
        alert('Please fill in all fields.');
        return;
    }

    // Calculate delivery date
    const today = new Date();
    const deliveryDate = new Date(today.setDate(today.getDate() + 7)).toLocaleDateString();

    // Display confirmation message
    document.getElementById('confirmation-message').textContent = `Thank you for your purchase! Your order will be delivered on ${deliveryDate}.`;

    // Show alert with delivery details
    alert(`Thank you for your order! Your order will be delivered on ${deliveryDate} at the following address:\n\n${address},\n${city},\n${postalCode}`);

    // Clear local storage
    localStorage.removeItem('order');
    localStorage.removeItem('totalPrice');
}

document.addEventListener('DOMContentLoaded', loadOrder);
document.getElementById('payment-form').addEventListener('submit', handleFormSubmit);
