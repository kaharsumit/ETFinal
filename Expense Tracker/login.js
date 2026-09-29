let email = document.getElementById("email");
let password = document.getElementById("password");
let form = document.getElementById("loginform");
let emailError = document.getElementById("emailError");
let LoginMessage = document.getElementById("LoginMessage");



form.addEventListener("submit",function(event){

    event.preventDefault();
    let isValid = true;

    let useremail = email.value;
    let userpassword = password.value;
     let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
     let passwordError = document.getElementById("passwordError");

    console.log(useremail);
    console.log(userpassword);

    if(useremail == ""){
        console.log("Email is required");
        isValid = false;
    }else{
        if(!emailPattern.test(useremail)){
            console.log("Invalid email");
            emailError.textContent = "Invalid email"
            isValid = false;
        }else{
            emailError.textContent = "";
        }
    }

    if(userpassword == ""){
        console.log("password is required");
        passwordError.textContent = "password is required";
        isValid = false;
    }else{
        if(userpassword.length<6){
            console.log("password at least of 6 characters");
            passwordError.textContent = "password at least of 6 characters"
            isValid = false;
        }else{
            passwordError.textContent = "";

        }
    }

    

    if(isValid){

    fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: useremail,
            password: userpassword
        })
    })
    .then(response => response.json())
    .then(data => {

    console.log(data);

    if(data){
        localStorage.setItem("userId", data.id);
        localStorage.setItem("userName", data.name);
        localStorage.setItem("userEmail", useremail);

        LoginMessage.textContent = "Login Successful";
        window.location.href = "dashboard.html";
    }

})
    .catch(error => {
        console.log("Error:", error);
        LoginMessage.textContent = "Server error";
    });

}else{
    LoginMessage.textContent = " ";
}



});