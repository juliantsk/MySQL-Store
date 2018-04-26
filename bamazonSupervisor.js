var mysql = require("mysql"),
    inquire = require("inquirer"),
    menuOptions = ["View Product Sales by Department", "Create New Department"];
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
            case "View Product Sales by Department":
                listSales();
                break;
            case "Create New Department":
                addDepartment();
                break;
        }
    });
});

function listSales() {
    // Total profit is the product sales minus the over head costs.
    // Use an alias in MySQL, GROUP BY, JOINS
    connection.query("SELECT * FROM products INNER JOIN departments ON products.department_name = departments.department_name", (err, data) => {
        // List a table with department ID, name, over head costs, sales, and total profit...
        for (i = 0; data[i]; i++) {
            const profit = data[i].product_sales - data[i].over_head_costs;
            console.log(`Department ID: ${data[i].department_id} || ${data[i].product_name} || Overhead Costs: ${data[i].over_head_costs} || Sales: ${data[i].product_sales} || Total Profit: ${profit}`);
        }
        connection.end();
    });
}

function addDepartment() {
    inquire.prompt([{
            message: "What is the name of the department you would like to add?",
            type: "input",
            name: "department"
        },
        {
            message: "What is 'ver head (in dollars) for the department you would like to add?",
            type: "input",
            name: "overhead"
        },
    ]).then(user => {
        connection.query("INSERT INTO departments (department_name, over_head_costs) VALUES (?, ?)", [user.department, user.overhead], (err, data) => {
            if (err) throw err;
            connection.end();
        });

    });
}