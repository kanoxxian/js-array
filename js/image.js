const validEmail = /^[a-zA-Z0-9\.!#$%&'*+/=?^_`{|}~-]{1,64}@[a-zA-Z0-9-]+\.[a-zA-Z]{2,8}(\.[a-zA-Z]{2,8})?$/;
const infoMsg = document.getElementById("user-message");
const form = document.getElementById("form");
const pic = document.getElementById("image-save");
let url = "";

// Grabs a Random Image and Loads on Site load.
function RandomImage() {
    let randomNum = Math.floor(Math.random()*1000);
    let url = `https://picsum.photos/id/${randomNum}/250`;
    pic.src = url;
    infoMsg.innerHTML = "";
}
window.onload = RandomImage();



// Email validation function
function checkMail(email) {
    return validEmail.test(email);
}

// Email Validation
form.addEventListener("submit", function(event) {
    event.preventDefault();

    userMsg.innerHTML = "";
    let email = document.getElementById("email").value;
    if (!checkMail(email)) {
        infoMsg.innerHTML = "Please enter a valid email address";
        return;
}})