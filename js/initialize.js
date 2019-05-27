/*
    Function to initialize the page
    - Show a Date / Time
    - Load Produts from the Store
    - Show Cart content
*/
function initialize() {

    var date = new Date();
    var dateArea = document.getElementById("dateArea");
    console.log("Initializing functions");
    
    // Show a Date / Time
    dateArea.innerHTML = "Date: " + date.toString();
    
    // Display products in the store
    displayProducts();
    // Populate dropdown
    populateStoreCategoryDD();
    // Display Cart content
    displayCart();
}