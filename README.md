# Shopping Cart Project

## Overview

This project implements a simple shopping cart that integrates with a price API to retrieve product prices. The cart allows adding products, updating quantities, and calculating the total price including tax.

## Running the Project

### Prerequisites

Ensure you have **Node.js** installed.

### Installation

1. Clone the repository:
   ```sh
   git clone <repository_url>
   cd Saltmine-Assignment
   ```
2. Install dependencies:
   ```sh
   npm install
   ```

### Running the Application

Start the price API service:

```sh
npm run serve-products
```

This will start the API at `http://localhost:3001/`.

Then, run the shopping cart script:

```sh
npm start
```

Alternatively, you can manually execute the script by running:

```sh
node index.js
```

## Running Tests

This project includes unit tests to ensure the correctness of the shopping cart logic.

To run the tests, use:

```sh
npm test
```

## Price API Integration

The shopping cart fetches product prices from an external API.

### API Details

- **Base URL:** `http://localhost:3001/`
- **Endpoint:** `GET /products/{product}`
- **Available Products:**
  - cheerios
  - cornflakes
  - frosties
  - shreddies
  - weetabix

## Assumptions & Tradeoffs

- The cart assumes that all products exist in the API and does not validate product names before fetching.
- If the API request fails or a product does not exist, an error is logged instead of stopping execution.
- Each API call is made separately for every product in the cart, which may impact performance with a large number of products.
- The project prioritizes **simplicity and readability** over optimization.
- Code changes follow **atomic commits** with meaningful messages.

## How to Use the Shopping Cart

The main script includes example usage:

```js
async function main() {
    const cart = new ShoppingCart();

    // To add a product to the cart:
    // await cart.addProductToCart('cheerios', 2);

    // To calculate the total:
    // await cart.calculateTotal();  
}

main();
```

## How to Test the Solution

- **Verify adding products:** Ensure products are correctly added with the expected quantity.
- **Validate price calculations:** Check if the total price and tax calculations match expectations.
- **Check API interaction:** Confirm the correct number of API calls is made for different cart scenarios.
- **Test edge cases:** Try adding invalid products, zero or negative quantities, and simulate API failures.
- **Run unit tests:** Execute `npm test` to verify that all core functionalities work as expected.

## Additional Notes

- The project follows best practices: descriptive names, well-tested logic, and clear documentation.
- Any API errors are handled gracefully.

