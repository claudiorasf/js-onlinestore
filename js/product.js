// Constructor for Product
function Product(id, name, price, qtyOnHand, maxPerCustomer, category, costOfShipping, reviews, description) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.qtyOnHand = qtyOnHand;
    this.maxPerCustomer = maxPerCustomer;
    this.category = category;
    this.costOfShipping = costOfShipping;
    this.reviews = reviews;
    this.description = description;
}

// Product function to output values
Product.prototype.outputString = function() {
    return "| " + this.id + " | " + this.name + " | $" + this.price.toFixed(2) 
        + " | " + this.qtyOnHand + " | " + this.maxPerCustomer + " | " + this.category + " |";
}