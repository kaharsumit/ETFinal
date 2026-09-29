let userName = document.getElementById("userName");
let totalBalnce = document.getElementById("totalBalance");

let savedName = localStorage.getItem("userName");
userName.textContent = "Hii, " + savedName + " 👋 " 

let totalIncome = document.getElementById("totalIncome");

let savedTransactions = [];


fetch("http://localhost:8080/transactions/" + localStorage.getItem("userId"))
    .then(response => response.json())
    .then(data => {

    console.log("Transactions from backend:", data);

     savedTransactions = data;

    // income logic 

    let income = 0;

for(let transaction of savedTransactions){
    if(transaction.type == "Income"){
        income = income + Number(transaction.amount);
    }
}

totalIncome.textContent = income;

// expense logic 

let totalExpense = document.getElementById("totalExpense");
let expense =0;

for(let transaction of savedTransactions){
    if(transaction.type == "Expense"){
        expense = expense + Number(transaction.amount);
    }
}

totalExpense.textContent = expense;

// total Balance

let totalBalance = document.getElementById("totalBalance");

let balance = income-expense;
totalBalance.textContent = balance;

// recent transactions lists

let recentTransactions = document.getElementById("recentTransactions");


for(let transaction of savedTransactions.slice(-10)){

    let row = `
    <tr>
    <td>${transaction.date}</td>
    <td>${transaction.description}</td>
    <td>${transaction.category}</td>
    <td class="${transaction.type === 'Income' ? 'income': ''}"> 
             ${transaction.type}
         </td>

         <td class="${transaction.type === 'Income' ? 'income': ''}"> 
             ${transaction.amount}
         </td>
    
    
    </tr>
    `;

    recentTransactions.innerHTML +=row;
    
}



})
    .catch(error => {
        console.log("Error:", error);
    });







