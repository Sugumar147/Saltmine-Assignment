const ShoppingCart = require("../ShoppingCart");  
const testData = require("../test_data/cornflakes.json");

global.fetch = jest.fn();  

let cart;

beforeEach(() => {
    cart = new ShoppingCart();
    fetch.mockClear(); 
});

test("should add a product to the cart successfully", async () => {

    fetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(testData)  
    });

    const product = "cornflakes";
    const quantity = 2;
    
    await cart.addProductToCart(product, quantity);
    
    expect(cart.cart[product]).toBe(quantity);
    expect(fetch).toHaveBeenCalledTimes(1); 
});

test("should not add a product if quantity is less than 1", async () => {
  
    const product = "cornflakes";
    const quantity = 0; 
    
    await cart.addProductToCart(product, quantity);
    
    expect(cart.cart[product]).toBeUndefined();  
    expect(fetch).toHaveBeenCalledTimes(0);  
});

test("should not add a product if invalid product or API returns an error", async () => {

    fetch.mockResolvedValueOnce({
        ok: false,
        json: () => Promise.resolve(testData) 
    });

    const product = "cornflakes";
    const quantity = 2;
    
    await cart.addProductToCart(product, quantity);
    
    expect(cart.cart[product]).toBeUndefined(); 
    expect(fetch).toHaveBeenCalledTimes(1);  
});

test("should add the correct amount of a product when already in cart", async () => {

    fetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(testData)
    });
    fetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(testData)
    });

    const product = "cornflakes";
    const quantity = 2;

    await cart.addProductToCart(product, quantity);
    await cart.addProductToCart(product, 3);

    expect(cart.cart[product]).toBe(quantity + 3);
});
