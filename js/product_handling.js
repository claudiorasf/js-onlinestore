/* 
    Functions related to products Add / Remove / Details
    
    productDetails();
    addReview();
    removeProductFromCart();
    addProductToCart()

*/

// ---------------------------------------------------------------

/* 
    Function responsible to show the Product Details (Information)
*/
function productDetails() {
    
    // Get element
    var productId = document.getElementById("addItemId");
    var productQty = document.getElementById("addItemQty");
    var qtyMsg = document.getElementById("addQtyValidationMessage");
    var output = "";

    // Check if the product exist. If so, show a message on screen.
    if (validateProductIdField("addItemId", "addIDValidationMessage") === true) {
        
        var productDetail = getProductById(productId.value);

        output +=	"Item Details: \n";
        output +=	"ID: " + productDetail.id + "\n";
        output +=	"Product: " + productDetail.name + "\n";
        output +=	"Price: $" + productDetail.price.toFixed(2) + "\n";
        output +=	"Qty Available: " + productDetail.qtyOnHand + "\n";
        output +=	"Max per Customer: " + productDetail.maxPerCustomer + "\n";
        output +=	"Cost of Shipping: $" + productDetail.costOfShipping.toFixed(2) + "\n\n";
        output +=	"Description: \n";
        output +=	productDetail.description + "\n\n";
        output +=	"Reviews: \n";
            
            if (productDetail.reviews.length > 0) {
                for (let i = 0; i < productDetail.reviews.length; i++) {
                    output +=	"- " + productDetail.reviews[i] + "\n";
                }
            } else {
                output +=	"- No reviews yet.";
            }
        
        // Output the product detail as a alert popup
        alert(output);
        
        // Clean fields content and style	
        cleanField(productId);
        cleanField(productQty);
        qtyMsg.innerHTML = "";
    }
}

/* 
    Function responsible to remove a product from the Cart.
*/
function removeProductFromCart() {
    
    // Get elements
    var productId = document.getElementById("addItemId");
    var productQty = document.getElementById("addItemQty");
    var cartCheck = false;
    
    /*  
        Do validations and check if the product exists. If so match it to the product from the Cart.
        If the product exists and it is on the Cart, remove it. If it is not, show a message. 
    */
    if (validateProductIdField("addItemId", "addIDValidationMessage") === true) {

        for (let i = 0; i < cart.length; i++) {
            if(cart[i].id === productId.value) {
                cartCheck = true;
                cart.splice(i, 1);
                break;
            }						
        }

        if(cartCheck === true) {
            productId.value = "";
            productQty.value = "";
            productQty.style.border = "";
            productQty.style.background = "";
            document.getElementById("addQtyValidationMessage").innerHTML = "";
        } else {
            alert("The product [" + productId.value + "] is not in the Cart!");
            // Clean fields content and style
            cleanField(productId);
            productId.focus();
        }
        // Do calculations
        calcCart();
        // Display Cart content
        displayCart();	
    }
}

/* 
    Function responsible to add a product to the Cart.
*/
function addProductToCart() {
    
    // Get elements
    var productId = document.getElementById("addItemId");
    var productQty = document.getElementById("addItemQty");
    var cartCheck = false;				
    
    /*  
        Do validations and check if the product exists.
        If the product exists and it is in the Cart, update the cart[].qty field.
        If the product exists and it is not in the Cart, add it.
    */	
    if (validateProductIdField("addItemId", "addIDValidationMessage") === true && validateQtyField() === true) {

        for (let i = 0; i < cart.length; i++) {
            if(cart[i].id === productId.value) {
                cartCheck = true;
                cart[i].qty += parseInt(productQty.value);
                break;
            }						
        }

        if (cartCheck === false) {
            for (let i = 0; i < products.length; i++) {
                if(productId.value === products[i].id) {
                    cart.push(new Cart(products[i].id, products[i].price, parseInt(productQty.value), products[i].costOfShipping));
                    break;
                }								
            }
        }
        // Clean fields content and style
        cleanField(productId);
        cleanField(productQty);

    }
    // Do calculations
    calcCart();
    // Display Cart content
    displayCart();	
}

/*
    Function to add a review to a product
    - Validate if the ID of the product is correct 
    - Validate if there is value in the review text field
    If it is valid, show a message with the review				 
*/
function addReview() {
    
    // Get elements
    var productId = document.getElementById("reviewId");
    var review = document.getElementById("reviewDesc");

    if (validateProductIdField("reviewId", "addIDValidationMessageReview") === true){
        
        if (review.value.length > 0) {
            for (let i = 0; i < products.length; i++) {
                if (products[i].id === productId.value) {
                    products[i].reviews.push(review.value);
                    alert("The following review: \n\n'" + review.value + "'\n\nwas successfully added to the Product ID [" + products[i].id + "]!");
                }																				
            }
            // Clean fields content and style
            cleanField(productId);
            cleanField(review);
        } else {						
            alert("Please, enter a text in the Review field!");
            review.focus();
            review.style.backgroundColor = "#96f7cf";
            review.style.border = "#41ba88";
        }

    } else {
        productId.focus();					
    }
}