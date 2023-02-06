let xArr = [];
const validEmail = /^[a-zA-Z0-9\.!#$%&'*+/=?^_`{|}~-]{1,64}@[a-zA-Z0-9-]+\.[a-zA-Z]{2,8}(\.[a-zA-Z]{2,8})?$/;
const infoMsg = document.getElementById("user-message");
const form = document.getElementById("form");
const pic = document.getElementById("image-save");
const imageoutput = document.getElementById("imageoutput");
const save_btn = document.querySelector('.btn-save');
const hide = document.getElementById("nothing-saved")
let url = "";
let first = "";

// Grabs a Random Image and Loads on Site load.
function randomImage() {
    let randomNum = Math.floor(Math.random()*1000);
    let url = `https://picsum.photos/id/${randomNum}/250`;
    pic.src = url;
    infoMsg.innerHTML = "";
}
window.onload = randomImage();


// //creates image list in DOM
function imagelist() {
    list();
    imageoutput.innerHTML = `<ul>${list()}</ul>`;
    randomImage();
}

function list() {
    emails = "";
    for ( let i = 0; i < xArr.length; i++ ){
        emails += `
        <li id="${xArr[i][0]}"><h4>${xArr[i][0]}</h4>
            <ul>${Ulist(i)}</ul>
        </li>`
    }
    return emails;
}
function Ulist(i) {
    picList = "";
    for ( let j = 0; j < xArr[i][1].length; j++ ) {
        picList += `<li><img src="${xArr[i][1][j]}" alt=""></li>`
    }
    return picList;
}

// adds a class that pushes the last submitted email to top
function setOnGoing(email) {
    if (first !== "") {
        first.classList.remove("newest");
    }
    first = document.getElementById(`${email}`);
    first.classList.add("newest");
}

// Email validation function
function checkMail(email) {
    return validEmail.test(email);
}

// Storing information in the array
form.addEventListener("submit", function(event) {
    event.preventDefault();

    let emailAdd = [];
    let thisImage = pic.src;
    console.log(thisImage);

    // Email Validation
    infoMsg.innerHTML = "";
    let email = document.getElementById("email").value;
    if (!checkMail(email)) {
        infoMsg.innerHTML = "Please enter a valid email address";
        return;
    } 

    // Create an array of all stored email addresses
    for ( let i = 0; i < xArr.length; i++ ) {
        emailAdd.push(xArr[i][0]);
        console.log(emailAdd);
    }
    // Check if the submitted email is already in the array
    if (emailAdd.includes(email)) {
        let position = emailAdd.indexOf(email);
        console.log(`Email address already stored at index ${position}`);
        // Check if the subitted picture has already been associated with this email address
        if (xArr[position][1].includes(thisImage)) {
            randomImage();
            // Maybe make a screen output for this to avoid confusion
            // If someone tries to add an image twice they may think the page is broken
            console.log("This picture has already been associated with this email address");
            infoMsg.innerHTML = "Picture already added";
            return;
        }
        // Associate the submitted picture with the stored email
        xArr[position][1].push(thisImage);
        console.log(`This picture has been associated with ${email}`);
        imagelist();
        setOnGoing(email);
        infoMsg.innerHTML = "New picture added";
        return;
    } else {
        // Add the email and picture to the array
        xArr.push([email, [thisImage]]);
        console.log(`${email} and ${thisImage} have been added to the array`);
        imagelist();
        infoMsg.innerHTML = "New picture added";
    }
});

save_btn.addEventListener('click', function() {
    hide.classList.add('hidden');
});
