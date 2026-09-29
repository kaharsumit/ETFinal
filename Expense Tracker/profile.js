let profileName = document.getElementById("profileName");
let profileEmail = document.getElementById("profileEmail");

let savedName = localStorage.getItem("userName");
let savedEmail = localStorage.getItem("userEmail");


profileName.textContent = savedName;
profileEmail.textContent  = savedEmail;
