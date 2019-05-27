// Constructor for Cart
function Cart(id, price, qty, shipping) {
    this.id = id;
    this.price = price;
    this.qty = qty;
    this.shipping = shipping;
}

// Cart function to output values
Cart.prototype.outputString = function() {
    return "| " + this.id + " | $" + this.price.toFixed(2) + " | " + this.qty 
        + " | $" + (this.price * this.qty).toFixed(2);
}