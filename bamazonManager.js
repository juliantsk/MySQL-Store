var mysql = require("mysql"),
    inquire = require("inquirer"),
    menuOptions = ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"];
connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "bamazon_db"
});

inquire.prompt([{
    message: "Here are the menu options:",
    type: "list",
    name: "option",
    choices: [menuOptions]
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

}

function addQuantity() {
    // Dynamic list of products.
    var productList = [];
    // Prompt the user with which item they would like to update, and how many they would like to add...
    inquire.prompt([{
            message: "Which product would you like to add more of?",
            type: "list",
            choices: productList,
            name: "product",
        },
        {
            message: "How many would you like to add?",
            type: "input",
            validate: validation(),
            name: "quantity"
        }
    ])

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
            validate: validation()
        },
        {
            message: "What is the quantity?",
            type: "input",
            name: "quantity"
        },

    ]).then(user => {

    });
}