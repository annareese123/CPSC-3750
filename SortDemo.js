// Array to store all names across sessions
let allNames = [];

// Get DOM elements
const nameInput = document.getElementById('nameInput');
const sortButton = document.getElementById('sortButton');
const clearButton = document.getElementById('clearButton');
const sortedOutput = document.getElementById('sortedOutput');

// Function to sort and display names
function sortNames() {
    const inputValue = nameInput.value.trim();
    
    // If input is empty, just display current list
    if (inputValue === '') {
        displaySortedNames();
        return;
    }
    
    const newNames = inputValue.split(',')
        .map(name => name.trim())
        .filter(name => name !== '');
    
    // Add new names to the main array
    allNames = allNames.concat(newNames);
    
    // Remove duplicates by converting to Set and back to Array
    allNames = [...new Set(allNames.map(name => name.toUpperCase()))];
    
    // Sort names alphabetically
    allNames.sort();
    
    // Clear input field
    nameInput.value = '';
    
    // Display the sorted names
    displaySortedNames();
}

// Function to display sorted names in textarea
function displaySortedNames() {
    if (allNames.length === 0) {
        sortedOutput.value = 'No names to display.';
        return;
    }
    
    // Create numbered list for textarea
    let numberedList = '';
    allNames.forEach((name, index) => {
        numberedList += `${index + 1}. ${name}\n`;
    });
    
    // Display in textarea
    sortedOutput.value = numberedList;
}

// Function to clear all names
function clearNames() {
    allNames = [];
    sortedOutput.value = '';
    nameInput.value = '';
    nameInput.focus();
}

// Event listener for button click
sortButton.addEventListener('click', sortNames);

// Event listener for clear button
clearButton.addEventListener('click', clearNames);

// Event listener for Enter key press
nameInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault(); // Prevent form submission
        sortNames();
    }
});

// Function to load navbar
async function loadNavbar() {
    try {
        const response = await fetch('navbar.html');
        if (response.ok) {
            const navbarHTML = await response.text();
            document.getElementById('navbar-container').innerHTML = navbarHTML;
        } else {
            console.log('Navbar file not found - continuing without navbar');
        }
    } catch (error) {
        console.log('Could not load navbar:', error.message);
    }
}

window.addEventListener('load', function() {
    loadNavbar(); 
    nameInput.focus();
});
