class ShoppingCart {

    // Constructor for initializing the ShoppingCart object
    constructor() {
        this.cart = {};
        this.apiBaseUrl = 'http://localhost:3001/products/';
    }

    // Method for adding a product to the cart
    async addProductToCart(product, quantity) {
        
        try {
            if(quantity < 1) {
                throw new Error("Quantity must be at least 1");
            }

            const response = await fetch(this.apiBaseUrl + product);

            if(!response.ok) {
                throw new Error("Product not found.");
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
            if(error.message === "Quantity must be at least 1") {
                console.error(error.message);
            } else {
                console.error(error.message);
            }
        }
    }

    // Method for getting the total price of the cart
    async calculateTotal() {
        
        try {
            let total = 0;
            
            for(let product in this.cart) {
                console.log(`Cart contains ${this.cart[product]} x ${product}`);
            }

            for(let product in this.cart) {
                const response = await fetch(this.apiBaseUrl + product);

                if(!response.ok) {
                    throw new Error();
                }

                const data = await response.json();
                total += data.price * this.cart[product];
            }

            const tax = Math.ceil(total * 0.125 * 100) / 100;

            console.log(`Subtotal: ${total.toFixed(2)}`);
            console.log(`Tax: ${tax.toFixed(2)}`);
            console.log(`Total: ${(total + tax).toFixed(2)}`);
        }
        catch (error) {
            console.error("An error occurred while calling the products price API.");
        }
    }
}

module.exports = ShoppingCart;