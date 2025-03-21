/**
 * Pizza Order Form - JavaScript
 * This file handles the form submission, validation, and pizza object creation
 */

// Student information - to be displayed on the page
const STUDENT_ID = "12345678"; // Replace with your actual student ID
const STUDENT_NAME = "John Smith"; // Replace with your actual name

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add student information to the page
    document.getElementById('student-info').textContent = `Student: ${STUDENT_NAME} (ID: ${STUDENT_ID})`;
    
    // Get form elements
    const pizzaForm = document.getElementById('pizza-form');
    const orderConfirmation = document.getElementById('order-confirmation');
    const pizzaDetails = document.getElementById('pizza-details');
    const newOrderBtn = document.getElementById('new-order-btn');
    
    // Track number of selected toppings
    const toppingCheckboxes = document.querySelectorAll('input[name="toppings"]');
    const MAX_TOPPINGS = 5;
    
    // Add event listener to each topping checkbox to limit selections
    toppingCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const selectedToppings = document.querySelectorAll('input[name="toppings"]:checked');
            
            if (selectedToppings.length > MAX_TOPPINGS) {
                this.checked = false;
                alert(`You can select a maximum of ${MAX_TOPPINGS} toppings.`);
            }
        });
    });
    
    // Pizza class definition
    class Pizza {
        constructor(customerName, size, crust, sauce, cheese, toppings, specialInstructions) {
            this.customerName = customerName;
            this.size = size;
            this.crust = crust;
            this.sauce = sauce;
            this.cheese = cheese;
            this.toppings = toppings;
            this.specialInstructions = specialInstructions;
            this.orderTime = new Date();
        }
        
        // Calculate the estimated price
        calculatePrice() {
            // Base prices by size
            const basePrices = {
                'small': 8.99,
                'medium': 10.99,
                'large': 12.99,
                'x-large': 14.99
            };
            
            let price = basePrices[this.size];
            
            // Add crust price
            if (this.crust === 'stuffed') price += 1.5;
            if (this.crust === 'gluten-free') price += 2;
            
            // Add cheese price
            if (this.cheese === 'extra') price += 1;
            if (this.cheese === 'blend') price += 1.5;
            if (this.cheese === 'vegan') price += 2;
            
            // Add toppings price (first 2 free, then $0.75 each)
            if (this.toppings.length > 2) {
                price += (this.toppings.length - 2) * 0.75;
            }
            
            return price.toFixed(2);
        }
        
        // Format the pizza description for display
        getDescription() {
            // Format size display
            const sizeDisplay = {
                'small': 'Small (10")',
                'medium': 'Medium (12")',
                'large': 'Large (14")',
                'x-large': 'Extra Large (16")'
            };
            
            // Format crust display
            const crustDisplay = {
                'thin': 'Thin & Crispy',
                'regular': 'Regular',
                'thick': 'Thick',
                'stuffed': 'Cheese Stuffed',
                'gluten-free': 'Gluten Free'
            };
            
            // Format sauce display
            const sauceDisplay = {
                'tomato': 'Classic Tomato',
                'bbq': 'BBQ',
                'white': 'White (Garlic Parmesan)',
                'buffalo': 'Buffalo',
                'pesto': 'Pesto'
            };
            
            // Format cheese display
            const cheeseDisplay = {
                'regular': 'Regular Mozzarella',
                'extra': 'Extra Cheese',
                'blend': 'Three Cheese Blend',
                'vegan': 'Vegan Cheese',
                'none': 'No Cheese'
            };
            
            // Create the HTML description
            let html = `
                <p><strong>Order for:</strong> ${this.customerName}</p>
                <p><strong>Pizza Size:</strong> ${sizeDisplay[this.size]}</p>
                <p><strong>Crust:</strong> ${crustDisplay[this.crust]}</p>
                <p><strong>Sauce:</strong> ${sauceDisplay[this.sauce]}</p>
                <p><strong>Cheese:</strong> ${cheeseDisplay[this.cheese]}</p>
            `;
            
            // Add toppings
            if (this.toppings.length > 0) {
                html += `<p><strong>Toppings:</strong> ${this.toppings.join(', ')}</p>`;
            } else {
                html += `<p><strong>Toppings:</strong> None</p>`;
            }
            
            // Add special instructions if any
            if (this.specialInstructions) {
                html += `<p><strong>Special Instructions:</strong> ${this.specialInstructions}</p>`;
            }
            
            // Add price and order time
            html += `
                <p><strong>Estimated Price:</strong> $${this.calculatePrice()}</p>
                <p><strong>Order Time:</strong> ${this.orderTime.toLocaleString()}</p>
            `;
            
            return html;
        }
    }
    
    // Form submission handler
    pizzaForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const customerName = document.getElementById('name').value;
        const size = document.getElementById('size').value;
        const crust = document.getElementById('crust').value;
        const sauce = document.getElementById('sauce').value;
        const cheese = document.getElementById('cheese').value;
        
        // Get selected toppings
        const toppingsNodeList = document.querySelectorAll('input[name="toppings"]:checked');
        const toppings = Array.from(toppingsNodeList).map(node => node.value);
        
        const specialInstructions = document.getElementById('instructions').value;
        
        // Create pizza object
        const pizza = new Pizza(customerName, size, crust, sauce, cheese, toppings, specialInstructions);
        
        // Display pizza details
        pizzaDetails.innerHTML = pizza.getDescription();
        
        // Show confirmation, hide form
        pizzaForm.classList.add('hidden');
        orderConfirmation.classList.remove('hidden');
        
        // Scroll to confirmation
        orderConfirmation.scrollIntoView({ behavior: 'smooth' });
    });
    
    // New order button handler
    newOrderBtn.addEventListener('click', function() {
        // Show form, hide confirmation
        pizzaForm.classList.remove('hidden');
        orderConfirmation.classList.add('hidden');
        
        // Reset form
        pizzaForm.reset();
        
        // Scroll to top of form
        pizzaForm.scrollIntoView({ behavior: 'smooth' });
    });
});