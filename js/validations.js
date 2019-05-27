/* 
    Functions related to validations (ID and Qty)
    
    validateProductIdField(field, msg);
    validateQtyField();
*/

// ---------------------------------------------------------------

/* 
    Validation function
    Function to validate the Product ID on the fields on the system
    - Check if there is a value in the ID field
    - Check if there are spaces
    - Check if a product ID exists
    return true if it is valid and false if it is invalid. 
*/
function validateProductIdField(field, msg) {

    // Get elements
    var productId = document.getElementById(field);
    var productIdMessage = document.getElementById(msg);

    var isValid = true;
    var idFound = false;
    var inputStr = "";

    inputStr = productId.value.toString();
    
    // Verify if the product id exists.
    for (let i = 0; i < products.length; i++) {					
        if (productId.value === products[i].id) {
            idFound = true;
            break;			
        }	
    }
    
    // Validations
    if (inputStr.length === 0) {
        // Style it according to the validation
        productIdMessage.innerHTML = "Invalid - Must Enter something!";
        productIdMessage.style.color = "red";
        productId.style.border = "2px solid red";
        productId.style.background = "lightpink";
        productId.focus();
        isValid = false;						
    } else if (inputStr.indexOf(' ') !== -1) {
        // Style it according to the validation
        productIdMessage.innerHTML = "Invalid - no spaces allowed";
        productIdMessage.style.color = "#a536c4";
        productId.style.border = "2px solid #a536c4";
        productId.style.background = "#de90f4";
        productId.focus();
        isValid = false;				
    } else if (idFound === false) {
        // Style it according to the validation
        productIdMessage.innerHTML = "Invalid - Product not found!";
        productIdMessage.style.color = "#3210a3";
        productId.style.border = "2px solid #3210a3";
        productId.style.background = "#9d85ea";
        productId.focus();
        isValid = false;	
    } else {
        // Style it according to the validation
        productId.style.border = "";
        productId.style.background = "";
        productIdMessage.innerHTML = "";
        isValid = true;
    }

    return isValid;
}

/* 
    Validation function
    Function to validate the Quantity (Qty) field on the system
    - Check if there is at least 1 in the quantity field
    - Check if the max number of products allowed per customer was reached.                
    return true if it is valid and false if it is invalid. 
*/
function validateQtyField() {
    
    // Get elements
    var productId = document.getElementById("addItemId");
    var productQtyMessage = document.getElementById("addQtyValidationMessage");
    var productQty = document.getElementById("addItemQty");
    
    var isValid = true;
    var idFound = false;
    var id = 0;
    var isMaxQtyExceed = false
    var max = 0;
    
    /*
        Verify if the product id exists. If it is, save the maximum value per customer.
    */
    for (let i = 0; i < products.length; i++) {					
        if (productId.value === products[i].id) {
            idFound = true;						
            max	= products[i].maxPerCustomer;
            console.log("max = " + max);
            break;				
        }	
    }

    /*
        Verify if the product exists and if it is in the cart.
        If it is in the cart, check if the quantity typed does not 
        exceed the limit of product per client.
    */
    if (idFound === true){
        if(parseInt(productQty.value) > max) {
            for (let i = 0; i < cart.length; i++) {
                if(cart[i].id === productId.value) {
                    cart[i].qty = max;
                    break;
                }
            }

            isMaxQtyExceed = true;						
        
        } else {

            for (let i = 0; i < cart.length; i++) {
                if(cart[i].id === productId.value) {
                    if((cart[i].qty + parseInt(productQty.value)) > max) {
                        cart[i].qty = max;
                        isMaxQtyExceed = true;
                        break;
                    } 
                }
            }
        }	
    }

    // Validations				
    if (productQty.value < 1) {
        // Style it according to the validation
        productQtyMessage.innerHTML = "Invalid - Must be enter at least 1!";
        productQtyMessage.style.color = "red";
        productQty.style.border = "2px solid red";
        productQty.style.background = "lightpink";
        productQty.focus();
        isValid = false;						
    } else if (idFound === true && isMaxQtyExceed === true) {
        // Style it according to the validation
        productQtyMessage.innerHTML = "Invalid - Exceed max items allowed per customer! (" + max + ")";
        productQtyMessage.style.color = "#41486d";
        productQty.style.border = "2px solid #41486d";
        productQty.style.background = "#9da7e0";
        productQty.focus();
        isValid = false;
    } else {
        // Style it according to the validation
        productQty.style.border = "";
        productQty.style.background = "";
        productQtyMessage.innerHTML = "";
        isValid = true;
    }

    return isValid;
}