let heading = document.getElementById("welcome");

heading.textContent = "Welcome to My Portfolio Website";

let aboutSection = document.querySelector("#about");

console.log(aboutSection);

let homeLink = document.getElementById("homeLink");

homeLink.addEventListener("click", function (event) {
    event.preventDefault();
    console.log("Home link clicked!");
});

let contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let message = document.getElementById("message").value;

    if (name === "" || email === "" || message === "") {
        alert("Please fill in all the fields.");
        return;
    }

    if (!email.includes("@")) {
        alert("Please enter a valid email address.");
        return;
    }

    alert("Form submitted successfully!");
});