var mysql = require("mysql"),
    inquire = require("inquirer"),
    connection = mysql.createConnection({
        host: "localhost",
        port: 3306,
        user: "root",
        password: "",
        database: "bamazon_db"
    });

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected");
    displayProducts();
    productPrompt();
});

function displayProducts() {
    // Display ids, names, and prices of products...

}

function productPrompt() {
    // Ask what the ID of the product they'd like to purchase is...

    // ...then ask how many they'd like to purchase.

    fulfillment(productId);
}

function fulfillment(product) {
    // If quantity is 0 or less, log...
    if (product.stock_quantity <= 0) {
        console.log("Insufficient quantity!");
    } else {
        // ...else, update the SQL database...

        // ...log the total cost of the purchase to the customer

    }
}