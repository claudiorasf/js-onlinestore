/* 
    Functions related to helpers functions
    
    generateId();
    calcCart();
    cleanField(element);
    getProductById(id);
    populateStoreCategoryDD();
*/

// ---------------------------------------------------------------

/*
    Function to generate an ID to the products
    Pattern: PIDNNNNLLN 
    PID = Product Identification
    N = Number (0123456789)
    L = Letter (ABCDEFGHIJKLMNOPQRSTUVWXYZ)
    return an string 
*/
function generateId() {

    // Values to combine 
    var NB = '0123456789';
    var LT = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    // Constants
    const PRODUCT_ID = "PID";
    const LENGHT_NB = 4;
    const LENGHT_LT = 2;
    
    // Add "PID"
    var productId = new String(PRODUCT_ID);

    // Add 4 numbers 0-9 randomly
    for (var i = 0; i < LENGHT_NB; i++) {
        productId += NB.charAt(Math.floor(Math.random() * NB.length));
    }

    // Add 2 letters A-Z randomly
    for (var i = 0; i < LENGHT_LT; i++) {
        productId += LT.charAt(Math.floor(Math.random() * LT.length));
    }
    // Add 1 more numbers 0-9 randomly
    productId += Math.floor(Math.random() * NB.length);

    return productId;
}

/* 
    Function to calc the items in the Cart
*/
function calcCart() {

    // Set global variables to 0 to refresh the values
    productSubtotal = 0.0;
    shipping = 0.0;
    subtotal = 0.0;
    tax = 0.0;
    total = 0.0;

    /* 
        Check if there is any product in the Cart.
        If there is a product in the Cart, loop the Cart verifying if the product in the Cart match 
        to a existend product. If it matches, do the calcs.		
    */
    if(cart.length > 0) {
        for (let i = 0; i < cart.length; i++) {
            if (getProductById(cart[i].id).id === cart[i].id) {
                productSubtotal += (cart[i].qty * cart[i].price);
                shipping += cart[i].shipping;
                subtotal = (productSubtotal + shipping);
                tax = (subtotal * GST_HST);
                total = (subtotal + tax);
            }
        }	
    }	
}

/* 
    Helper function to clean the field content and style
*/
function cleanField(element) {

    element.value = "";
    element.style.border = "";
    element.style.background = "";
}

/* 
    Function to get a product Object by passing an ID as a parameter
    parameter: Product.id
    return: Product Object
*/
function getProductById(id){

    for (let i = 0; i < products.length; i++) {					
        if (id === products[i].id) {
            var newProduct = new Product(products[i].id, products[i].name, products[i].price,
                    products[i].qtyOnHand, products[i].maxPerCustomer, products[i].category,
                    products[i].costOfShipping, products[i].reviews, products[i].description);
            break;			
        }	
    }

    return newProduct;
}

/*
    Function to randomly show the category of the products by using the products itself added to the array. 
*/	
function populateStoreCategoryDD() {

    // Get element
    var productCategory = document.getElementById("displayFilter");

    // Check if the category of the product matches with the category dropdown filter
    for (let i = 0; i < products.length; i++) {
        var product = products[i];
        var isMatch = false;					
        for (let j = 0; j < productCategory.childNodes.length; j++) {
            var category = productCategory.childNodes[j].value;
            if (category === product.category) {
                isMatch = true;
                break;
            } 
        }

        // If the category does not match, add the product's category to the dropdown element 
        if (isMatch === false) {
            var newCategory = document.createElement("option");
            newCategory.innerHTML = product.category;
            console.log("Category [" + product.category + "] add to dropdown element.");
            productCategory.appendChild(newCategory);	
        }
    } 
}