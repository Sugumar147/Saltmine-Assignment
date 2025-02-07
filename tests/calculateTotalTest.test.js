const ShoppingCart = require("../ShoppingCart");
const testData = require("../test_data/cornflakes.json");

global.fetch = jest.fn();

let cart;

beforeEach(() => {
    cart = new ShoppingCart();
    fetch.mockClear();
});

test('should correctly calculate total price including tax', async () => {

    cart.cart = {
        'cornflakes': 3  
    };

    fetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(testData)
    });

    const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

    await cart.calculateTotal();

    const subTotal = (3 * testData.price);
    const expectedTax = Math.ceil(subTotal * 0.125 * 100) / 100;
    const expectedTotal = subTotal + expectedTax;

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(cart.apiBaseUrl + 'cornflakes');

    expect(consoleLogSpy).toHaveBeenCalledWith(`Cart contains ${cart.cart["cornflakes"]} x cornflakes`);
    expect(consoleLogSpy).toHaveBeenCalledWith(`Subtotal: ${subTotal.toFixed(2)}`);
    expect(consoleLogSpy).toHaveBeenCalledWith(`Tax: ${expectedTax.toFixed(2)}`);
    expect(consoleLogSpy).toHaveBeenCalledWith(`Total: ${expectedTotal.toFixed(2)}`);
});

test('should handle an error when fetching product data', async () => {

    cart.cart = {
        'cornflakes': 3  
    };

    fetch.mockResolvedValueOnce({
        ok: false
    });

    const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    await cart.calculateTotal();

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(cart.apiBaseUrl + "cornflakes");

    expect(consoleLogSpy).toHaveBeenCalledWith(`Cart contains ${cart.cart["cornflakes"]} x cornflakes`);
    expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
    expect(consoleErrorSpy).toHaveBeenCalledWith("An error occurred while calling the products price API.");
});