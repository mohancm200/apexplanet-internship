/* =====================================================
   LIVE HERO NETWORK
===================================================== */

const canvas =
    document.getElementById("networkCanvas");

const ctx =
    canvas.getContext("2d");


let width = 0;
let height = 0;


/* =====================================================
   MOUSE
===================================================== */

const mouse = {

    x: 0,
    y: 0,

    active: false

};


window.addEventListener(
    "mousemove",
    function(event) {

        mouse.x =
            event.clientX;

        mouse.y =
            event.clientY;

        mouse.active =
            true;

    }
);


window.addEventListener(
    "mouseleave",
    function() {

        mouse.active =
            false;

    }
);


/* =====================================================
   RESIZE
===================================================== */

function resizeCanvas() {

    width =
        canvas.width =
        window.innerWidth;

    height =
        canvas.height =
        window.innerHeight;

}

resizeCanvas();


window.addEventListener(
    "resize",
    resizeCanvas
);


/* =====================================================
   CREATE NETWORK NODES
===================================================== */

const nodes = [];


function createNodes() {

    nodes.length = 0;


    const count =
        Math.min(
            100,
            Math.floor(
                width / 16
            )
        );


    for (
        let i = 0;
        i < count;
        i++
    ) {

        nodes.push({

            x:
                Math.random() *
                width,

            y:
                Math.random() *
                height,

            vx:
                (
                    Math.random() -
                    0.5
                ) * 0.28,

            vy:
                (
                    Math.random() -
                    0.5
                ) * 0.28,

            radius:
                1 +
                Math.random() * 1.7,

            phase:
                Math.random() *
                Math.PI * 2

        });

    }

}


createNodes();


window.addEventListener(
    "resize",
    createNodes
);


/* =====================================================
   CONNECTIONS
===================================================== */

function drawConnections() {

    const maxDistance =
        155;


    for (
        let i = 0;
        i < nodes.length;
        i++
    ) {

        for (
            let j = i + 1;
            j < nodes.length;
            j++
        ) {

            const a =
                nodes[i];

            const b =
                nodes[j];


            const dx =
                a.x - b.x;

            const dy =
                a.y - b.y;


            const distance =
                Math.sqrt(
                    dx * dx +
                    dy * dy
                );


            if (
                distance <
                maxDistance
            ) {

                const opacity =
                    (
                        1 -
                        distance /
                        maxDistance
                    ) * 0.20;


                ctx.beginPath();


                ctx.moveTo(
                    a.x,
                    a.y
                );


                ctx.lineTo(
                    b.x,
                    b.y
                );


                ctx.strokeStyle =
                    `rgba(
                        60,
                        135,
                        240,
                        ${opacity}
                    )`;


                ctx.lineWidth =
                    0.65;


                ctx.stroke();

            }

        }

    }

}


/* =====================================================
   NODES
===================================================== */

function drawNodes(time) {

    nodes.forEach(
        node => {


            node.x +=
                node.vx;

            node.y +=
                node.vy;


            node.x +=
                Math.sin(
                    time * 0.0005 +
                    node.phase
                ) * 0.04;


            node.y +=
                Math.cos(
                    time * 0.0004 +
                    node.phase
                ) * 0.04;


            /* Mouse interaction */

            if (
                mouse.active
            ) {

                const dx =
                    node.x -
                    mouse.x;

                const dy =
                    node.y -
                    mouse.y;

                const distance =
                    Math.sqrt(
                        dx * dx +
                        dy * dy
                    );


                if (
                    distance < 150 &&
                    distance > 0
                ) {

                    const force =
                        (
                            150 -
                            distance
                        ) / 150;


                    node.x +=
                        (
                            dx /
                            distance
                        ) *
                        force *
                        0.8;


                    node.y +=
                        (
                            dy /
                            distance
                        ) *
                        force *
                        0.8;

                }

            }


            /* Wrap */

            if (
                node.x < -20
            ) {
                node.x =
                    width + 20;
            }

            if (
                node.x >
                width + 20
            ) {
                node.x = -20;
            }

            if (
                node.y < -20
            ) {
                node.y =
                    height + 20;
            }

            if (
                node.y >
                height + 20
            ) {
                node.y = -20;
            }


            const pulse =
                0.4 +
                (
                    Math.sin(
                        time * 0.0015 +
                        node.phase
                    ) + 1
                ) * 0.22;


            /* Glow */

            ctx.beginPath();

            ctx.arc(
                node.x,
                node.y,
                node.radius * 4,
                0,
                Math.PI * 2
            );

            ctx.fillStyle =
                `rgba(
                    50,
                    135,
                    255,
                    ${pulse * 0.08}
                )`;

            ctx.fill();


            /* Node */

            ctx.beginPath();

            ctx.arc(
                node.x,
                node.y,
                node.radius,
                0,
                Math.PI * 2
            );

            ctx.fillStyle =
                `rgba(
                    95,
                    170,
                    255,
                    ${pulse}
                )`;

            ctx.fill();

        }
    );

}


/* =====================================================
   CENTRAL GLOW
===================================================== */

function drawCentralGlow(time) {

    const centerX =
        width / 2;

    const centerY =
        height * 0.46;


    const pulse =
        1 +
        Math.sin(
            time * 0.0008
        ) * 0.08;


    const radius =
        340 * pulse;


    const gradient =
        ctx.createRadialGradient(

            centerX,
            centerY,
            0,

            centerX,
            centerY,
            radius

        );


    gradient.addColorStop(
        0,
        "rgba(40,110,235,0.08)"
    );

    gradient.addColorStop(
        0.5,
        "rgba(25,80,180,0.035)"
    );

    gradient.addColorStop(
        1,
        "rgba(10,30,80,0)"
    );


    ctx.fillStyle =
        gradient;


    ctx.beginPath();

    ctx.arc(
        centerX,
        centerY,
        radius,
        0,
        Math.PI * 2
    );

    ctx.fill();

}


/* =====================================================
   MOUSE LIGHT
===================================================== */

function drawMouseLight() {

    if (
        !mouse.active
    ) {

        return;

    }


    const radius =
        210;


    const gradient =
        ctx.createRadialGradient(

            mouse.x,
            mouse.y,
            0,

            mouse.x,
            mouse.y,
            radius

        );


    gradient.addColorStop(
        0,
        "rgba(60,145,255,0.13)"
    );

    gradient.addColorStop(
        0.35,
        "rgba(50,120,255,0.05)"
    );

    gradient.addColorStop(
        1,
        "rgba(30,80,200,0)"
    );


    ctx.fillStyle =
        gradient;


    ctx.beginPath();

    ctx.arc(
        mouse.x,
        mouse.y,
        radius,
        0,
        Math.PI * 2
    );

    ctx.fill();

}


/* =====================================================
   ANIMATION
===================================================== */

function animate(time) {

    ctx.clearRect(
        0,
        0,
        width,
        height
    );


    drawCentralGlow(time);

    drawConnections();

    drawNodes(time);

    drawMouseLight();


    requestAnimationFrame(
        animate
    );

}


requestAnimationFrame(
    animate
);


/* =====================================================
   CONTACT FORM
===================================================== */

const contactForm =
    document.getElementById(
        "contactForm"
    );


if (
    contactForm
) {

    contactForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            alert(
                "Thank you for your message!"
            );


            contactForm.reset();

        }
    );

}