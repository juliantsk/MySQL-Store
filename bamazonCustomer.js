const mysql = require("mysql"),
    inquire = require("inquirer"),
    update = "UPDATE products SET ?=? WHERE item_id=?",
    connection = mysql.createConnection({
        host: "localhost",
        port: 3306,
        user: "root",
        password: "password",
        database: "bamazon_db"
    });

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected");
    displayProducts();
});

function displayProducts() {
    // Display ids, names, and prices of products...
    connection.query("SELECT * FROM products", (err, data) => {
        if (err) console.log(err);
        for (i = 0; data[i]; i++) {
            console.log(
                `${data[i].product_name}, ${data[i].price} || item id: ${data[i].item_id}`
            );
        }

        productPrompt();
    });
}

function productPrompt() {
    // Ask what the ID of the product they'd like to purchase is...
    inquire.prompt([{
            message: "What is the ID of the product that you would like to buy?",
            type: "input",
            name: "productId",
        },
        // ...then ask how many they'd like to purchase.
        {
            message: "How many would you like to purchase?",
            type: "input",
            name: "quantity",
        }
    ]).then(user => {
        fulfillment(user.productId, user.quantity);
    });
}

function fulfillment(id, quantity) {
    connection.query("SELECT * FROM products WHERE item_id=" + id, (err, data) => {
        const cost = data[0].price * quantity;
        if (err) console.log(err);
        // If quantity is 0 or less, log...
        if (data[0].stock_quantity < quantity) {
            console.log("Insufficient quantity!");
            productPrompt();
        } else {
            // ...else, update the SQL database...
            data[0].stock_quantity -= quantity;
            connection.query("UPDATE products SET stock_quantity=? WHERE item_id=?", [(data[0].stock_quantity), id], (err, data) => {
                if (err) throw err;
            });

            // ...update the product sales total...
            connection.query("UPDATE products SET product_sales=? WHERE item_id=?", [(data[0].product_sales + cost), id], (err, data) => {
                if (err) throw err;
            });
            // ...log the total cost of the purchase to the customer
            console.log(`Total cost: ${cost}`);
        }
        connection.end();
    });
};