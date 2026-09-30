/* =========================
   TYPING EFFECT
========================= */

const typingText =
    document.getElementById("typing-text");

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
            currentRole.substring(
                0,
                characterIndex + 1
            );

        characterIndex++;

        if (
            characterIndex ===
            currentRole.length
        ) {

            deleting = true;

            setTimeout(typeEffect, 1300);

            return;
        }

    } else {

        typingText.textContent =
            currentRole.substring(
                0,
                characterIndex - 1
            );

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

                    entry.target.classList.add(
                        "visible"
                    );

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
   SCROLL TO TOP
========================= */

const scrollTopButton =
    document.getElementById("scrollTop");


window.addEventListener(
    "scroll",
    function () {

        if (window.scrollY > 500) {

            scrollTopButton.classList.add(
                "show"
            );

        } else {

            scrollTopButton.classList.remove(
                "show"
            );
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
   CONTACT FORM
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


/* =========================
   LIVE AI NETWORK BACKGROUND
========================= */

const canvas =
    document.getElementById("ai-background");

const ctx =
    canvas.getContext("2d");

let particles = [];


function resizeCanvas() {

    const hero =
        document.querySelector(".hero");

    canvas.width =
        window.innerWidth;

    canvas.height =
        hero.offsetHeight;

    createParticles();
}


function createParticles() {

    particles = [];

    const particleCount =
        Math.min(
            75,
            Math.floor(window.innerWidth / 18)
        );


    for (
        let i = 0;
        i < particleCount;
        i++
    ) {

        particles.push({

            x:
                Math.random() *
                canvas.width,

            y:
                Math.random() *
                canvas.height,

            size:
                Math.random() * 2 + 1,

            speedX:
                (Math.random() - 0.5) *
                0.35,

            speedY:
                (Math.random() - 0.5) *
                0.35

        });

    }
}


function drawParticles() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    for (
        let i = 0;
        i < particles.length;
        i++
    ) {

        for (
            let j = i + 1;
            j < particles.length;
            j++
        ) {

            const dx =
                particles[i].x -
                particles[j].x;

            const dy =
                particles[i].y -
                particles[j].y;

            const distance =
                Math.sqrt(
                    dx * dx +
                    dy * dy
                );


            if (distance < 130) {

                const opacity =
                    1 - distance / 130;

                ctx.strokeStyle =
                    `rgba(96, 165, 250, ${opacity * 0.22})`;

                ctx.lineWidth = 1;

                ctx.beginPath();

                ctx.moveTo(
                    particles[i].x,
                    particles[i].y
                );

                ctx.lineTo(
                    particles[j].x,
                    particles[j].y
                );

                ctx.stroke();
            }

        }

    }


    particles.forEach(function (particle) {

        ctx.beginPath();

        ctx.arc(
            particle.x,
            particle.y,
            particle.size,
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
            "rgba(96, 165, 250, 0.75)";

        ctx.fill();


        particle.x +=
            particle.speedX;

        particle.y +=
            particle.speedY;


        if (
            particle.x < 0 ||
            particle.x > canvas.width
        ) {

            particle.speedX *= -1;
        }


        if (
            particle.y < 0 ||
            particle.y > canvas.height
        ) {

            particle.speedY *= -1;
        }

    });


    requestAnimationFrame(
        drawParticles
    );
}


window.addEventListener(
    "resize",
    resizeCanvas
);


resizeCanvas();

drawParticles();