let transactionType = document.getElementById("transactionType");
let amount = document.getElementById("amount");
let category = document.getElementById("category");
let date = document.getElementById("date");
let description = document.getElementById("description");
let button = document.querySelector("button");
console.log("transaction.js connected");

let form = document.querySelector("form");

form.addEventListener("submit", function(event){

    event.preventDefault();
    button.disabled = true;

    if(
        amount.value == ""||
        date.value == ""||
        description.value == ""
    ){
        alert("please fill all details");
        button.disabled =false;
        return;
    }

    console.log(transactionType.value);
    console.log(amount.value);
    console.log(category.value);
    console.log(date.value);
    console.log(description.value);

    let transaction = {
    type:transactionType.value,
    amount: amount.value,
    category: category.value,
    date: date.value,
    description: description.value,
    userId: localStorage.getItem("userId")

   
};
 console.log(transaction);

 fetch("http://localhost:8080/transaction", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(transaction)
})
.then(response => response.json())
.then(data => {

    console.log("Transaction saved:", data);

    window.location.href = "dashboard.html";

})
.catch(error => {

    console.log("Error:", error);
    button.disabled = false;

});
 



});

