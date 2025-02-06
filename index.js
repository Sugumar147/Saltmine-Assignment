const ShoppingCart = require('./ShoppingCart');


async function main() {
    const cart = new ShoppingCart();
    // To add product to the cart use like this :
    // await cart.addProductToCart('cheerios', 2);

    // To calculate the total use like this :
    // await cart.calculateTotal();  
  }
  
  main();