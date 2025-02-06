class ShoppingCart {

    // Constructor for initializing the ShoppingCart object
    constructor() {
        this.cart = {};
        this.apiBaseUrl = 'http://localhost:3001/products/';
    }

    // Method for adding a product to the cart
    async addProductToCart(product, quantity) {
        try {
            const response = await fetch(this.apiBaseUrl + product);

            if(!response.ok) {
                throw new Error();
            }

            const data = await response.json();
            
            if(this.cart[product]) {
                this.cart[product] += quantity;
            } else {    
                this.cart[product] = quantity;
            }
            
            console.log(`${quantity} x ${product} added at $${data.price} each.`);
        }
        catch (error) {
            console.log("Please provide a valid product and quantity.");
        }
    }
}

module.exports = ShoppingCart;