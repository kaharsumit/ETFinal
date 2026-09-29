let allTransactions = document.getElementById("allTransactions");
let pagination = document.getElementById("pagination");

let savedTransactions = [];
let totalpages = 0;
let currentPage = 1;
let transactionPerPage = 10;

fetch("http://localhost:8080/transactions/" + localStorage.getItem("userId"))
    .then(response => response.json())
    .then(data => {

        console.log("Transactions from backend:", data);

        savedTransactions = data;

        totalpages = Math.ceil(savedTransactions.length / transactionPerPage);
        console.log(totalpages);
        showPage();

        
for(let i = 1; i<=totalpages; i++){
    let pageButton = document.createElement("button");
    pageButton.textContent = i;
    pagination.appendChild(pageButton);

    pageButton.addEventListener("click", function(){
        currentPage = i;
        showPage();

        console.log(currentPage);

    });
}

    })
    .catch(error => {
        console.log("Error:", error);
    });

console.log(savedTransactions);


// function 

function showPage(){

    if(totalpages === 0){
    allTransactions.innerHTML = "<tr><td colspan='5'>No transactions found</td></tr>";
    return;
}

let start = (currentPage -1) * transactionPerPage;
let end = start + transactionPerPage;

let pageTransactions = savedTransactions.slice(start,end);

console.log(pageTransactions);
allTransactions.innerHTML = "";

for(let transaction of pageTransactions){

    let row = `

    <tr>
    <td> ${transaction.date}</td>
     <td> ${transaction.description}</td>
      <td> ${transaction.category}</td>
       <td class="${transaction.type === 'Income' ? 'income': 'expense'}"> 
             ${transaction.type}
         </td>

         <td class="${transaction.type === 'Income' ? 'income': 'expense'}"> 
             ${transaction.amount}
         </td>

         <td>
    <button onclick="deleteTransaction(${transaction.id}, ${transaction.userId})">
      Delete
      </button>
    </td>


    </tr>
    `;
    allTransactions.innerHTML += row;

}
if(currentPage === 1){
        previousbutton.style.display = "none";
    }else{
        previousbutton.style.display = "block";
    }

    if(currentPage == totalpages){
        nextButton.style.display = "none";
    }else{
        nextButton.style.display = "block";
    }
}


// previious button logic ...

let previousbutton = document.createElement("button");

previousbutton.textContent = "Previous";
pagination.appendChild(previousbutton);

previousbutton.addEventListener("click", function(){

    if(currentPage>1){
        currentPage--;
        showPage();
        
    }
    console.log(currentPage);

});






// dynamic 1 2 3.. button ka logic 


// next button logic 

let nextButton = document.createElement("button");

nextButton.textContent = "Next";
pagination.appendChild(nextButton);

nextButton.addEventListener("click",function(){

    if(currentPage<totalpages){
        currentPage++;
        showPage();

    }
    console.log(currentPage);

});

// delete button logic in all transaction list 

function deleteTransaction(id, userId){

    fetch(`http://localhost:8080/transaction/${id}/${userId}`, {
        method: "DELETE"
    })
    .then(response => response.text())
    .then(data => {

        console.log(data);
        location.reload();

    })
    .catch(error => {

        console.log("Error:", error);

    });
}





