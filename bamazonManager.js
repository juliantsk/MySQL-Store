const mysql = require("mysql"),
    inquire = require("inquirer"),
    menuOptions = ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"],
    updateName = "UPDATE products SET ?=? WHERE product_name=?",
    connection = mysql.createConnection({
        host: "localhost",
        port: 3306,
        user: "root",
        password: "password",
        database: "bamazon_db"
    });

inquire.prompt([{
    message: "Here are the menu options:",
    type: "list",
    name: "option",
    choices: menuOptions
}]).then(user => {
    connection.connect(function(err) {
        if (err) throw err;
        console.log("connected");

        switch (user.option) {
            case "View Products for Sale":
                listProducts();
                break;
            case "View Low Inventory":
                listProducts(5);
                break;
            case "Add to Inventory":
                addQuantity();
                break;
            case "Add New Product":
                addProduct();
                break;
        }
    });
});

function listProducts(under = 10000000) {
    // List IDs, names, prices, with quantities less than "under"...
    connection.query("SELECT * FROM products WHERE stock_quantity < ?", [under], function(err, data) {
        if (err) throw err;
        for (i = 0; data[i]; i++) {
            console.log(
                `$item id: ${data[i].item_id} || ${data[i].product_name} : $${data[i].price} Stock: ${data[i].stock_quantity}`
            );
        }
        connection.end();
    });
}

function addQuantity() {
    // Dynamic list of products.
    const productList = [];
    connection.query("SELECT * FROM products", (err, data) => {
        for (i = 0; data[i]; i++) { productList.push(data[i].product_name); }
        // Prompt the user with which item they would like to update, and how many they would like to add...
        inquire.prompt([{
                message: "Which product would you like to add more of?",
                type: "list",
                choices: productList,
                name: "name",
            },
            {
                message: "How many would you like to add?",
                type: "input",
                name: "quantity"
            }
        ]).then(user => {
            connection.query("UPDATE products SET stock_quantity= stock_quantity + ? WHERE product_name=?", [user.quantity, user.name], (err, data) => {
                if (err) throw err;
                connection.end();
            });

        });

    });
}

function addProduct() {
    inquire.prompt([{
            message: "What is the product name?",
            type: "input",
            name: "name"
        },
        {
            message: "What is the department?",
            type: "input",
            name: "department"
        },
        {
            message: "What is the price?",
            type: "input",
            name: "price",
        },
        {
            message: "What is the quantity?",
            type: "input",
            name: "quantity"
        },

    ]).then(user => {
        connection.query("INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES (?, ?, ?, ?)", [user.name, user.department, user.price, user.quantity], (err, data) => {
            if (err) throw err;
            connection.end();
        });
    });
}