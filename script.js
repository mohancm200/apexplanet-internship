/* =========================
   LIVE TYPING EFFECT
========================= */

const typingText = document.getElementById("typing-text");

const roles = [
    "Artificial Intelligence",
    "Machine Learning",
    "Cybersecurity",
    "Web Development"
];

let roleIndex = 0;
let characterIndex = 0;
let deleting = false;

function typeEffect() {

    const currentRole = roles[roleIndex];

    if (!deleting) {

        typingText.textContent =
            currentRole.substring(0, characterIndex + 1);

        characterIndex++;

        if (characterIndex === currentRole.length) {

            deleting = true;

            setTimeout(typeEffect, 1300);

            return;
        }

    } else {

        typingText.textContent =
            currentRole.substring(0, characterIndex - 1);

        characterIndex--;

        if (characterIndex === 0) {

            deleting = false;

            roleIndex++;

            if (roleIndex >= roles.length) {
                roleIndex = 0;
            }
        }
    }

    setTimeout(
        typeEffect,
        deleting ? 45 : 90
    );
}

typeEffect();


/* =========================
   ACTIVE NAVIGATION
========================= */

const sections =
    document.querySelectorAll("section[id]");

const navLinks =
    document.querySelectorAll(".nav-link");

function updateActiveNavigation() {

    let currentSection = "";

    sections.forEach(function (section) {

        const sectionTop =
            section.offsetTop - 180;

        if (window.scrollY >= sectionTop) {

            currentSection =
                section.getAttribute("id");
        }

    });


    navLinks.forEach(function (link) {

        link.classList.remove("active");

        if (
            link.getAttribute("href") ===
            "#" + currentSection
        ) {

            link.classList.add("active");
        }

    });
}

window.addEventListener(
    "scroll",
    updateActiveNavigation
);


/* =========================
   SCROLL REVEAL
========================= */

const revealElements =
    document.querySelectorAll(".reveal");

const revealObserver =
    new IntersectionObserver(

        function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    revealObserver.unobserve(
                        entry.target
                    );
                }

            });

        },

        {
            threshold: 0.15
        }
    );


revealElements.forEach(function (element) {

    revealObserver.observe(element);

});


/* =========================
   SKILL BAR ANIMATION
========================= */

const skillProgress =
    document.querySelectorAll(".skill-progress");

const skillObserver =
    new IntersectionObserver(

        function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    const width =
                        entry.target.getAttribute(
                            "data-width"
                        );

                    entry.target.style.width =
                        width;

                    skillObserver.unobserve(
                        entry.target
                    );
                }

            });

        },

        {
            threshold: 0.5
        }
    );


skillProgress.forEach(function (skill) {

    skillObserver.observe(skill);

});


/* =========================
   SCROLL TO TOP
========================= */

const scrollTopButton =
    document.getElementById("scrollTop");

window.addEventListener(
    "scroll",
    function () {

        if (window.scrollY > 500) {

            scrollTopButton.classList.add("show");

        } else {

            scrollTopButton.classList.remove("show");
        }

    }
);


scrollTopButton.addEventListener(
    "click",
    function () {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    }
);


/* =========================
   LIVE CONTACT FORM
========================= */

const contactForm =
    document.getElementById("contactForm");

const formStatus =
    document.getElementById("formStatus");


const nameInput =
    document.getElementById("name");

const emailInput =
    document.getElementById("email");

const messageInput =
    document.getElementById("message");


function clearStatus() {

    formStatus.textContent = "";

}


nameInput.addEventListener(
    "input",
    clearStatus
);

emailInput.addEventListener(
    "input",
    clearStatus
);

messageInput.addEventListener(
    "input",
    clearStatus
);


contactForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();

        const name =
            nameInput.value.trim();

        const email =
            emailInput.value.trim();

        const message =
            messageInput.value.trim();


        if (
            name === "" ||
            email === "" ||
            message === ""
        ) {

            formStatus.textContent =
                "Please complete all fields.";

            formStatus.style.color =
                "#dc2626";

            return;
        }


        if (!email.includes("@")) {

            formStatus.textContent =
                "Please enter a valid email address.";

            formStatus.style.color =
                "#dc2626";

            return;
        }


        formStatus.textContent =
            "Thank you, " +
            name +
            ". Your message has been submitted successfully.";

        formStatus.style.color =
            "#16a34a";


        contactForm.reset();

    }
);