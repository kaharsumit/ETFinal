let name = document.getElementById("name");
let email = document.getElementById("email");
let password = document.getElementById("password");
let confpassword = document.getElementById("confirmpassword");

let form = document.getElementById("registerForm");
let emailError = document.getElementById("emailError");
let SuccesMessage = document.getElementById("SuccessMessage");




form.addEventListener("submit",function(event){

    event.preventDefault();
    let isValid = true;
   

    let username = name.value;
    let useremail = email.value;
    let userpassword = password.value;
    let userconfirmpassword = confpassword.value;

     let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
     let nameError = document.getElementById("nameError");
     let passwordError = document.getElementById("passwordError");
     let confirmError = document.getElementById("confirmError");


    console.log(username);
    console.log(useremail);
    console.log(userpassword);
    console.log(userconfirmpassword);

    if(username == ""){
        console.log("Name is required");
        nameError.textContent = "Name is required";
        isValid = false;
    }else{
        nameError.textContent ="";
    }

   

    if(useremail == ""){
        console.log("email is required");
        emailError.textContent = "Email is required";
        isValid = false;
    }else{
        if(!emailPattern.test(useremail)){
        console.log("Invalid email");
        emailError.textContent = "Invalid Email";
        isValid = false;
    }else{
        emailError.textContent = "";
    }

    }

    
    if(userpassword == ""){
        console.log("password is required");
        passwordError.textContent="password is required";
        isValid = false;
    }else{
        if(userpassword.length<6){
        console.log("password must be at least 6 characters");
        isValid = false;
    }else{
        passwordError.textContent = " ";
    }
        
    }

    if(userconfirmpassword == ""){
        console.log("confirm password  is required");
        confirmError.textContent ="confirm password is required";
        isValid = false;
    }else{

    if(userpassword != userconfirmpassword){
        console.log("password does not match");
        confirmError.textContent =" password does not match";
        isValid = false;
    }else{
        confirmError.textContent = " ";
    }
}

    

    if(isValid){
        console.log("Registration succesful");
        SuccesMessage.textContent = " Registration Successful";

        fetch("http://localhost:8080/register", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        name: username,
        email: useremail,
        password: userpassword
    })
})

.then(response => response.json())
.then(data => {
    console.log("User registered:", data);
})
.catch(error => {
    console.log("Error:", error);
});
        localStorage.setItem("userEmail", useremail);
        localStorage.setItem("userPassword", userpassword);
        localStorage.setItem("userName",username);
    }else{
        SuccesMessage.textContent = " ";
    }

    







});
