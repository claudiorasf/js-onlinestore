/* 
    Functions related to display products in the Store and in the Cart
    
    displayProducts();
    displayCart();
*/

// ---------------------------------------------------------------

/* 
    Function to display the products according to the category chosen.
    "All" means that all products will be shown
*/
function displayProducts() {
    
    // Get elements
    var output = document.getElementById("inventoryOutput");
    var productFilter = document.getElementById("displayFilter").value;

    output.innerHTML = "";

    for (let i = 0; i < products.length; i++) {
        if(productFilter === "All" || productFilter === products[i].category) {
            output.innerHTML += products[i].outputString() + "<br>";
        }					
    }
}

/*
    Function to display the products added to the Cart.
    If the is no product in the Cart, a default text will be shown.
    If there is more than one item in the Cart, it will show the product, quantity and the calculated values.
*/
function displayCart() {
    
    // Get elements
    var output = document.getElementById("cartOutput");
    var checkout = document.getElementById("cartCheckout");

    output.innerHTML = "";
    checkout.innerHTML = "";
    
    if(cart.length > 0) {
        for (let i = 0; i < cart.length; i++) {
            output.innerHTML += cart[i].outputString() + "<br>";												
        }
        output.innerHTML += "<br>";
        output.innerHTML += "<hr>";
        checkout.innerHTML += "Items Subtotal: $" + productSubtotal.toFixed(2) + "<br>";
        checkout.innerHTML += "Estimated Shipping: $" + shipping.toFixed(2) + "<br><br>";
        checkout.innerHTML += "<strong>Subtotal:</strong> $" + subtotal.toFixed(2) + "<br>";
        checkout.innerHTML += "<strong>Estimated Tax (15%):</strong> $" + tax.toFixed(2) + "<br>"; 
        checkout.innerHTML += "<strong>Order Total:</strong> $" + total.toFixed(2) + "<br>"; 					
    } else {
        output.innerHTML += "No Items In Cart, Add Items to Cart";
        output.innerHTML += "<br><br>";
        output.innerHTML += "<hr>";
        checkout.innerHTML += "Items Subtotal: $" + 0.00.toFixed(2) + "<br>";
        checkout.innerHTML += "Estimated Shipping: $" + 0.00.toFixed(2) + "<br><br>";
        checkout.innerHTML += "<strong>Subtotal:</strong> $" + 0.00.toFixed(2) + "<br>";
        checkout.innerHTML += "<strong>Estimated Tax (15%)</strong>: $" + 0.00.toFixed(2) + "<br>"; 
        checkout.innerHTML += "<strong>Order Total:</strong> $" + 0.00.toFixed(2) + "<br>"; 
    }
}