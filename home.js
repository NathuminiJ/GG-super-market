// Item prices (adjust these values as needed)
const prices = {
    'Apple': 1.00,
    'Banana': 0.50,
    'Orange': 0.75,
    'Grapes': 2.00,
    'Mango': 1.50,
    'Pineapple': 3.00,
    'Carrot': 0.60,
    'Broccoli': 1.20,
    'Lettuce': 1.00,
    'Potato': 0.80,
    'Tomato': 1.00,
    'Onion': 0.70,
    'Milk': 1.20,
    'Cheese': 2.50,
    'Yogurt': 1.00,
    'Butter': 2.00,
    'Cream': 2.50,
    'Eggs': 1.50,
    'Chicken': 5.00,
    'Salmon': 6.00,
    'Beef': 7.00,
    'Shrimp': 8.00,
    'Pork': 4.50,
    'Lamb': 6.50,
    'Flour': 1.00,
    'Sugar': 0.80,
    'Baking Powder': 0.50,
    'Salt': 0.20,
    'Olive Oil': 3.00,
    'Vanilla Extract': 4.00
};

// Add item to table
function addItem(name, category) {
    const quantityInput = document.getElementById(`${name.toLowerCase().replace(/ /g, '-')}-quantity`);
    const quantity = parseFloat(quantityInput.value);
    if (quantity <= 0) return;

    const price = prices[name] || 0;
    const totalPrice = price * quantity;

    const tableBody = document.querySelector('#order-table tbody');
    let row = document.querySelector(`#order-table tbody tr[data-item="${name}"]`);

    if (row) {
        // Update existing row
        const quantityCell = row.querySelector('.quantity');
        const priceCell = row.querySelector('.price');
        const existingQuantity = parseInt(quantityCell.textContent);
        quantityCell.textContent = existingQuantity + quantity;
        priceCell.textContent = (price * (existingQuantity + quantity)).toFixed(2);
    } else {
        // Add new row
        row = document.createElement('tr');
        row.dataset.item = name;
        row.innerHTML = `
            <td>${name}</td>
            <td>${category}</td>
            <td class="quantity">${quantity}</td>
            <td class="price">${totalPrice.toFixed(2)}</td>
            <td><button class="remove-item" onclick="removeItem('${name}')">Remove</button></td>
        `;
        tableBody.appendChild(row);
    }

    updateTotalPrice();
}

// Update total price in the table
function updateTotalPrice() {
    const rows = document.querySelectorAll('#order-table tbody tr');
    let total = 0;
    rows.forEach(row => {
        const priceCell = row.querySelector('.price');
        total += parseFloat(priceCell.textContent);
    });
    document.getElementById('total-price').textContent = `$${total.toFixed(2)}`;
}

// Add to favourites
function addToFavourites() {
    const rows = document.querySelectorAll('#order-table tbody tr');
    const favourites = {};
    rows.forEach(row => {
        const name = row.children[0].textContent;
        const quantity = row.querySelector('.quantity').textContent;
        const price = row.querySelector('.price').textContent;
        favourites[name] = { quantity, price };
    });
    localStorage.setItem('favourites', JSON.stringify(favourites));

    // Alert user that items have been added to favourites
    alert('Successfully added to favourites.');
}

// Apply favourites
function applyFavourites() {
    const favourites = JSON.parse(localStorage.getItem('favourites') || '{}');
    const tableBody = document.querySelector('#order-table tbody');
    tableBody.innerHTML = ''; // Clear existing table rows

    for (const [name, details] of Object.entries(favourites)) {
        const category = getCategory(name); // Function to get the category of an item
        const row = document.createElement('tr');
        const price = parseFloat(details.price).toFixed(2);

        row.innerHTML = `
            <td>${name}</td>
            <td>${category}</td>
            <td class="quantity">${details.quantity}</td>
            <td class="price">${price}</td>
            <td><button class="remove-item" onclick="removeItem('${name}')">Remove</button></td>
        `;
        tableBody.appendChild(row);
    }
    updateTotalPrice();
}

// Function to get category of an item
function getCategory(name) {
    const categories = {
        'Apple': 'Fruits',
        'Banana': 'Fruits',
        'Orange': 'Fruits',
        'Grapes': 'Fruits',
        'Mango': 'Fruits',
        'Pineapple': 'Fruits',
        'Carrot': 'Vegetables',
        'Broccoli': 'Vegetables',
        'Lettuce': 'Vegetables',
        'Potato': 'Vegetables',
        'Tomato': 'Vegetables',
        'Onion': 'Vegetables',
        'Milk': 'Dairy Produce',
        'Cheese': 'Dairy Produce',
        'Yogurt': 'Dairy Produce',
        'Butter': 'Dairy Produce',
        'Cream': 'Dairy Produce',
        'Eggs': 'Dairy Produce',
        'Chicken': 'Meat and Seafood',
        'Salmon': 'Meat and Seafood',
        'Beef': 'Meat and Seafood',
        'Shrimp': 'Meat and Seafood',
        'Pork': 'Meat and Seafood',
        'Lamb': 'Meat and Seafood',
        'Flour': 'Baking and Cooking Ingredients',
        'Sugar': 'Baking and Cooking Ingredients',
        'Baking Powder': 'Baking and Cooking Ingredients',
        'Salt': 'Baking and Cooking Ingredients',
        'Olive Oil': 'Baking and Cooking Ingredients',
        'Vanilla Extract': 'Baking and Cooking Ingredients'
    };
    return categories[name] || 'Unknown';
}

// Function to remove item from the table
function removeItem(name) {
    const row = document.querySelector(`#order-table tbody tr[data-item="${name}"]`);
    if (row) {
        row.remove();
        updateTotalPrice();
    }
}

// Function to clear local storage
function clearLocalStorage() {
    localStorage.clear();
    alert('Local storage has been cleared.');
}

// Existing functions...

function buyNow() {
    const rows = document.querySelectorAll('#order-table tbody tr');
    const order = [];
    let totalPrice = 0;

    rows.forEach(row => {
        const name = row.children[0].textContent;
        const category = row.children[1].textContent;
        const quantity = row.querySelector('.quantity').textContent;
        const price = row.querySelector('.price').textContent;
        order.push({ name, category, quantity, price });
        totalPrice += parseFloat(price);
    });

    // Save to local storage
    localStorage.setItem('order', JSON.stringify(order));
    localStorage.setItem('totalPrice', totalPrice.toFixed(2));

    // Redirect to payment page
    window.location.href = 'checkout.html'; 
}
