var mysql = require("mysql");
var inquirer = require("inquirer");
var prompt = inquirer.createPromptModule();


var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "",
    database: "bamazon_db"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    ask();

});

function displayInfo() {
    connection.query("SELECT * FROM products", function (err, res) {
        console.log("");
        for (var i = 0; i < res.length; i++) {
            var prod = res[i];
            console.log(prod.item_id + " | " + prod.product_name + " | " + prod.department_name + " | $" + prod.price + " | qty: " + prod.stock_quantity);
        }
        ask();
    })

}


function buy(){
    prompt([
        {
            name: "id",
            message: "What is the id of the product you want to buy?"
        },
        {
            name: "amount",
            message: "How many of it do you want to buy?"
        }
    ]).then(function(ans2){
        connection.query("SELECT * FROM products", function (err, res) {
            res.item_id = parseInt(ans2.id) - 1 ;
            // res.stock_quantity = ans2.amount;
            var item = res[res.item_id];
            var enough = item.stock_quantity - ans2.amount;
            var total = item.price * ans2.amount;
            if (enough < 0){
                console.log("Insufficient Stock Quantity!");
                ask();
            }
            if (enough >= 0){
                console.log("Purchase success! You have purchased " + item.product_name + "(qty: " + ans2.amount + ")");
                console.log("Your total was: $" + total)
                connection.query("UPDATE products SET ? WHERE ?", [{stock_quantity: enough}, {item_id: ans2.id}],
            function(error, response){
                ask();
            })
            }
        })
    })
}

function ask() {
    prompt(
        {
            type: "list",
            name: "action",
            message: "Would you like to purchase or take a look at our products?",
            choices: ["Purchase", "See products", "Leave store"]
        }
    ).then(function(ans1){
        if (ans1.action === "Purchase"){
            buy();
        }
        if (ans1.action === "Leave store"){
            connection.end();
        }
        if (ans1.action === "See products"){
            connection.query("SELECT * FROM products", function(err, res){
                displayInfo();
                connection.end
            })
        }
    })
}

